import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';
import db from './Database/db.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const secretKey = process.env.SECRET_KEY;
const otpSecret = process.env.OTP_SECRET;

let otpStore = {};

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Function to fetch plan details from the database
const getPlanDetails = (plan_id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM plans WHERE id = ?';
        db.query(query, [plan_id], (err, result) => {
            if (err) {
                console.error('Error fetching plan details:', err);
                return reject('Failed to fetch plan details');
            }
            resolve(result[0]);
        });
    });
};

// Function to save payment order details in the database
const savePaymentOrder = (orderDetails) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO transactions 
        (id, payment_order_id, amount, created_at, updated_at, plan_id, status, user_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            orderDetails.id,
            orderDetails.payment_order_id,
            orderDetails.amount,
            orderDetails.created_at,
            orderDetails.updated_at,
            orderDetails.plan_id,
            orderDetails.status,
            orderDetails.user_id,
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error saving payment order:', err);
                return reject('Failed to save payment order');
            }
            resolve(result);
        });
    });
};

app.post('/user', (req, res) => {
    let user = req.body;

    // Validate the required fields
    if (!user.fullname || !user.email || !user.countrycode || !user.mobile) {
        return res.status(400).send({ error: true, message: 'Please provide fullname, email, mobile and countrycode' });
    }
    if (user.fullname.trim() === '' || user.email.trim() === '' || user.countrycode.trim() === '' || user.mobile.trim() === '') {
        return res.status(400).send({ error: true, message: 'Fullname, email, mobile and countrycode cannot be empty' });
    }

    // Prepare the SQL query
    let sql = 'INSERT INTO users (name, email, mobile, country_code, address) VALUES (?, ?, ?, ?, ?)';
    let billingAddress = user.billing_address && user.billing_address.trim() !== '' ? user.billing_address : null;

    // Execute the query
    db.query(sql, [user.fullname, user.email, user.mobile, user.countrycode, billingAddress], (err, result) => {
        if (err) {
            return res.status(500).send({ error: true, message: 'Database error', details: err });
        }
        res.send({ success: true, data: result, message: 'New user has been created successfully.' });
    });
});

app.post('/userRegistration', (req, res) => {
    let user = req.body;

    // Validate the required fields
    if (!user.fullname || !user.email || !user.countrycode || !user.mobile) {
        return res.status(400).send({ error: true, message: 'Please provide fullname, email, mobile and countrycode' });
    }
    if (user.fullname.trim() === '' || user.email.trim() === '' || user.countrycode.trim() === '' || user.mobile.trim() === '') {
        return res.status(400).send({ error: true, message: 'Fullname, email, mobile and countrycode cannot be empty' });
    }

    // Prepare the SQL query to check if the mobile number exists
    let checkSql = 'SELECT * FROM users WHERE mobile = ?';

    db.query(checkSql, [user.mobile], (checkErr, checkResult) => {
        if (checkErr) {
            return res.status(500).send({ error: true, message: 'Database error', details: checkErr });
        }

        if (checkResult.length > 0) {
            // If the mobile number exists, update the row
            let updateSql = 'UPDATE users SET name = ?, email = ?, country_code = ?, address = ? WHERE mobile = ?';
            let billingAddress = user.billing_address && user.billing_address.trim() !== '' ? user.billing_address : null;

            db.query(updateSql, [user.fullname, user.email, user.countrycode, billingAddress, user.mobile], (updateErr, updateResult) => {
                if (updateErr) {
                    return res.status(500).send({ error: true, message: 'Database error', details: updateErr });
                }
                res.send({ success: true, data: updateResult, message: 'User details have been updated successfully.' });
            });
        } else {
            // If the mobile number does not exist, respond with an appropriate message
            res.status(404).send({ error: true, message: 'User with the provided mobile number does not exist.' });
        }
    });
});

app.post('/users', (req, res) => {
    let users = req.body;

    if (!Array.isArray(users)) {
        return res.status(400).send({ error: true, message: 'Input should be an array of users' });
    }

    let sql = 'INSERT INTO users (name, email, mobile, country_code, address) VALUES ?';
    let values = users.map(user => {
        if (!user.fullname || !user.email || !user.countrycode || !user.mobile || user.fullname.trim() === '' || user.email.trim() === '' || user.countrycode.trim() === '' || user.mobile.trim() === '') {
            return res.status(400).send({ error: true, message: 'Each user must have a valid fullname, email, mobile and countrycode' });
        }
        return [user.fullname, user.email, user.mobile, user.countrycode, user.billing_address || null];
    });

    db.query(sql, [values], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({ success: true, data: result, message: 'Users have been created successfully.' });
    });
});

app.get('/allusers', (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send({ succes: true, data: results, message: 'Users list.' });
    });
});

app.post('/user/:id', (req, res) => {
    let userId = req.params.id;
    let sql = 'SELECT name, email, mobile FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length > 0) {
            res.send({ success: true, data: results[0], message: 'User details retrieved successfully.' });
        } else {
            res.send({ success: false, message: 'User not found.' });
        }
    });
});

app.post('/verification', (req, res) => {
    let user = req.body;

    if (!user.mobile || user.mobile.trim() === '') {
        return res.status(400).send({ error: true, message: 'Please provide a mobile number' });
    }

    // Check if mobile number already exists
    let checkSql = 'SELECT * FROM users WHERE mobile = ?';

    db.query(checkSql, [user.mobile], (checkErr, checkResult) => {
        if (checkErr) {
            return res.status(500).send({ error: true, message: 'Database error', details: checkErr });
        }

        if (checkResult.length === 0) {
            // Mobile number does not exist, add it to the database
            let insertSql = 'INSERT INTO users (mobile) VALUES (?)';

            db.query(insertSql, [user.mobile], (insertErr, insertResult) => {
                if (insertErr) {
                    return res.status(500).send({ error: true, message: 'Database error', details: insertErr });
                }

                // Get the newly inserted user_id
                db.query(checkSql, [user.mobile], (reCheckErr, reCheckResult) => {
                    if (reCheckErr) {
                        return res.status(500).send({ error: true, message: 'Database error', details: reCheckErr });
                    }

                    let newUserId = reCheckResult[0].id;

                    // Generate JWT token including mobile number
                    let token = jwt.sign({ user_id: newUserId, mobile: user.mobile }, secretKey, { expiresIn: '1h' });

                    // Log the token
                    console.log(`Authorization Token for ${user.mobile}: ${token}`);

                    return res.send({ success: true, message: 'Mobile number added and token generated.', token: token, redirectUrl: '/registration' });
                });
            });
        } else {
            // Mobile number already exists
            let userData = checkResult[0];

            // Generate JWT token including mobile number
            let token = jwt.sign({ user_id: userData.id, mobile: user.mobile }, secretKey, { expiresIn: '1h' });

            // Log the token
            console.log(`Authorization Token for ${user.mobile}: ${token}`);

            if (userData.name && userData.email && userData.country_code && userData.address && userData.mobile) {
                return res.send({ success: true, message: 'All fields are filled and token generated.', token: token, redirectUrl: '/' });
            } else {
                return res.send({ success: true, message: 'Not all fields are filled and token generated.', token: token, redirectUrl: '/registration' });
            }
        }
    });
});


app.post('/check-mobile', (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ error: 'mobile is required' });
    }

    const query = 'SELECT * FROM users WHERE mobile = ?';
    db.query(query, [mobile], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            return res.status(200).json({ redirect: '/otpverify' });
        } else {
            return res.status(200).json({ redirect: '/otpverify' });
        }
    });
});

app.post('/get-user-id', (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).send({ error: 'Mobile number is required' });
    }

    const query = 'SELECT id FROM users WHERE mobile = ?';
    db.query(query, [mobile], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send({ error: 'Error executing query' });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ user_id: results[0].id });
    });
});

// app.get('/stocks', (req, res) => {
//     const sql = 'SELECT * FROM stocks LIMIT 60';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching items:', err);
//             res.status(500).send('Server error');
//             return;
//         }
//         res.json(results);
//     });
// });

app.get('/stocks', (req, res) => {
    const sql = `
        SELECT * FROM stocks 
        ORDER BY 
            CASE 
                WHEN stock_long_name REGEXP '^[A-Za-z]' THEN 1
                WHEN stock_long_name REGEXP '^[0-9]' THEN 2
                ELSE 3
            END, 
            stock_long_name ASC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});


app.get('/news', (req, res) => {
    const sql = 'SELECT * FROM bse_news';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

app.get('/news/:news_id', (req, res) => {
    const newsId = req.params.news_id;
    const sql = 'SELECT * FROM bse_news WHERE news_id = ?';
    
    db.query(sql, [newsId], (err, results) => {
        if (err) {
            console.error('Error fetching news:', err);
            res.status(500).send('Server error');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('News not found');
            return;
        }
        res.json(results[0]);
    });
});


app.post('/generate-otp', (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).send({ error: true, message: 'Please provide mobile number' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999);

    // Store OTP with userId
    otpStore[mobile] = { otp, expires: Date.now() + 300000 }; // OTP valid for 5 minutes

    // Send OTP to user (e.g., via SMS)
    console.log(`OTP for ${mobile}: ${otp}`);

    res.send({ success: true, message: 'OTP has been sent' });
});

// Verify OTP and Generate JWT
app.post('/verify-otp', (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
        return res.status(400).send({ error: true, message: 'Please provide mobile number and otp' });
    }

    const storedOtpDetails = otpStore[mobile];

    if (!storedOtpDetails) {
        return res.status(400).send({ error: true, message: 'Invalid mobile number or otp' });
    }

    const { otp: storedOtp, expires } = storedOtpDetails;

    if (Date.now() > expires) {
        delete otpStore[mobile];
        return res.status(400).send({ error: true, message: 'OTP has expired' });
    }

    if (parseInt(otp) !== storedOtp) {
        return res.status(400).send({ error: true, message: 'Invalid otp' });
    }

    // Clear the OTP after successful verification
    delete otpStore[mobile];

    res.send({ success: true, message: 'User authenticated successfully' });
});

// Middleware to Verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ error: true, message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send({ error: true, message: 'Failed to authenticate token' });
        }

        req.userId = decoded.userId;
        next();
    });
};

app.get('/search-stocks', (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).send({ error: true, message: 'Please provide a search query' });
    }

    const searchQuery = `%${query}%`;

    const sql = 'SELECT * FROM stocks WHERE sc_name LIKE ? OR stock_long_name LIKE ?';
    db.query(sql, [searchQuery, searchQuery], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send({ error: true, message: 'Internal server error' });
        }

        res.send({ success: true, data: results });
    });
});

app.post('/add-stock', (req, res) => {
    const { user_id, scrip_cd } = req.body;

    if (!user_id || !scrip_cd) {
        return res.status(400).send('Missing user_id or scrip_cd');
    }

    const query = 'INSERT INTO user_watchlist (user_id, scrip_cd) VALUES (?, ?)';
    db.query(query, [user_id, scrip_cd], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to add stock to watchlist');
        }
        res.status(200).send({ success: true, message: 'Stock added to watchlist' });
    });
});

app.post('/delete-stock', (req, res) => {
    const { user_id, scrip_cd } = req.body;

    if (!user_id || !scrip_cd) {
        return res.status(400).send('Missing user_id or scrip_cd');
    }

    const query = 'DELETE FROM user_watchlist WHERE user_id = ? AND scrip_cd = ?';
    db.query(query, [user_id, scrip_cd], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to delete stock from watchlist');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Stock not found in watchlist');
        }

        res.status(200).send({ success: true, message: 'Stock deleted from watchlist' });
    });
});

app.post('/user-watchlist', (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    const query = 'SELECT scrip_cd FROM user_watchlist WHERE user_id = ?';

    db.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        const watchlist = results.map(row => row.scrip_cd);
        res.json({ watchlist });
    });
});


app.get('/allPlans', (req, res) => {
    const sql = 'SELECT * FROM plans';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

app.post('/createPayment', async (req, res) => {
    const { plan_id, token } = req.body;

    if (!plan_id || !token) {
        return res.status(400).json({ error: 'plan_id and token are required' });
    }

    // Decode user_id from JWT token
    let decoded;
    try {
        decoded = jwt.verify(token, secretKey);
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user_id = decoded.user_id;

    // Fetch plan details from the database
    let planDetails;
    try {
        planDetails = await getPlanDetails(plan_id);
        if (!planDetails) {
            return res.status(404).json({ error: 'Plan not found' });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }

    try {
        // Create Razorpay order
        const options = {
            amount: planDetails.amount_in_rs * 100, // Amount should be in paisa
            currency: 'INR',
            receipt: `receipt#${Date.now()}`,
            payment_capture: 1, // Automatic capture of payment
        };
        const order = await razorpay.orders.create(options);

        // Generate a custom transaction ID
        const transactionId = `txn_${user_id}_${Date.now()}_${uuidv4().substring(0, 8)}`;

        // Prepare the order details to be saved
        const orderDetails = {
            id: transactionId,
            payment_order_id: order.id,
            amount: planDetails.amount_in_rs,
            created_at: new Date(),
            updated_at: new Date(),
            plan_id: plan_id,
            status: 'pending',
            user_id: user_id,
        };

        // Save the order details to the database
        await savePaymentOrder(orderDetails);

        // Return the order details in the response
        res.json({
            transaction_id: orderDetails.id,
            payment_order_id: orderDetails.payment_order_id,
            amount: orderDetails.amount,
            user_id: orderDetails.user_id,
            plan_id: orderDetails.plan_id,
            status: orderDetails.status,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});


// Protected Route
app.get('/protected', verifyToken, (req, res) => {
    res.send({ success: true, message: 'This is a protected route', userId: req.userId });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
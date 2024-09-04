// 'use client'
// import React, { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
// import Papa from 'papaparse';
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
// import Footer from '../components/Footer';

// function BulkUser() {
//     const [uploadStatus, setUploadStatus] = useState<string>('');
//     const [isUploading, setIsUploading] = useState<boolean>(false);

//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         const file = acceptedFiles[0];
//         if (file) {
//             setIsUploading(true);
//             setUploadStatus('Processing file...');
            
//             Papa.parse(file, {
//                 complete: async (results) => {
//                     try {
//                         setUploadStatus('Uploading data...');
//                         const response = await axios.post('/bulkUser', results.data, {
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                         });

//                         if (response.status === 200) {
//                             setUploadStatus('Upload successful!');
//                         } else {
//                             setUploadStatus('Upload failed. Please try again.');
//                         }
//                     } catch (error) {
//                         console.error('Error uploading data:', error);
//                         setUploadStatus('An error occurred. Please try again.');
//                     } finally {
//                         setIsUploading(false);
//                     }
//                 },
//                 header: true,
//                 skipEmptyLines: true,
//             });
//         }
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//     return (
//         <div>
//             <>
//                 <Sidebar />
//                 <main className="dashboard-main">
//                     <Header />
//                     <div className="dashboard-main-body">
//                         <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
//                             <h6 className="fw-semibold mb-0">Upload Bulk Users</h6>
//                         </div>
//                         <div className="row gy-4">
//                             <div className="col-md-8 m-auto">
//                                 <div className="card h-100 p-0">
//                                     <div className="card-header border-bottom bg-base py-16 px-24">
//                                         <h6 className="text-lg fw-semibold mb-0">
//                                             Upload CSV File
//                                         </h6>
//                                     </div>
//                                     <div className="card-body p-24">
//                                         <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`} style={{
//                                             border: '2px dashed #cccccc',
//                                             borderRadius: '4px',
//                                             padding: '20px',
//                                             textAlign: 'center',
//                                             cursor: 'pointer'
//                                         }}>
//                                             <input {...getInputProps()} />
//                                             {
//                                                 isDragActive ?
//                                                     <p>Drop the CSV file here ...</p> :
//                                                     <p>Drag 'n' drop a CSV file here, or click to select a file</p>
//                                             }
//                                         </div>
//                                         {isUploading && (
//                                             <div className="mt-3">
//                                                 <p>Processing... Please wait.</p>
//                                                 {/* You can add a progress bar or spinner here */}
//                                             </div>
//                                         )}
//                                         {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <Footer />
//                 </main>
//             </>
//         </div>
//     );
// }

// export default BulkUser;

'use client'
import React, { useState, useCallback } from 'react';
import { Importer, ImporterField } from 'react-csv-importer';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

// Don't forget to import the CSS
import 'react-csv-importer/dist/index.css';

function BulkUser() {
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleUpload = useCallback(async (rows: any[]) => {
        setIsUploading(true);
        setUploadStatus('Uploading data...');

        try {
            const response = await axios.post('/bulkUser', rows, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setUploadStatus(`Successfully uploaded ${rows.length} rows.`);
            } else {
                setUploadStatus('Upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading data:', error);
            setUploadStatus('An error occurred. Please try again.');
        } finally {
            setIsUploading(false);
        }
    }, []);

    return (
        <div>
            <>
                <Sidebar />
                <main className="dashboard-main">
                    <Header />
                    <div className="dashboard-main-body">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                            <h6 className="fw-semibold mb-0">Upload Bulk Users</h6>
                        </div>
                        <div className="row gy-4">
                            <div className="col-md-8 m-auto mt-5">
                                <div className="card h-100 p-0">
                                    <div className="card-header border-bottom bg-base py-16 px-24">
                                        <h6 className="text-lg fw-semibold mb-0">
                                            Upload CSV File
                                        </h6>
                                    </div>
                                    <div className="card-body p-24">
                                        <Importer
                                            chunkSize={10000} // Adjust this based on your needs
                                            assumeNoHeaders={false}
                                            restartable={true}
                                            onStart={() => {
                                                setUploadStatus('');
                                                setIsUploading(true);
                                            }}
                                            processChunk={handleUpload}
                                            onComplete={() => {
                                                setUploadStatus('Import completed successfully!');
                                                setIsUploading(false);
                                            }}
                                            onClose={() => {
                                                setIsUploading(false);
                                            }}
                                        >
                                            <ImporterField name="name" label="Name" />
                                            <ImporterField name="email" label="Email" />
                                            {/* Add more ImporterField components as needed */}
                                        </Importer>
                                        {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
                                        {isUploading && <p>Uploading in progress...</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </main>
            </>
        </div>
    );
}

export default BulkUser;
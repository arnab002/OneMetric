'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { Importer } from 'react-csv-importer';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

// Import the CSS for react-csv-importer
import 'react-csv-importer/dist/index.css';

interface UserData {
  customer_name: string;
  mobile_number: string;
  email: string;
  plan_id: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

function BulkUser(): JSX.Element {
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only after component mounts (client-side)
    const token = localStorage.getItem('adminToken');
    setAdminToken(token);
}, []);

  const handleUpload = useCallback(async (rows: Record<string, string>[]) => {
    setIsUploading(true);
    setUploadStatus('Processing data...');

    // Transform the data to match the required structure
    const usersData: UserData[] = rows.map(row => ({
      customer_name: row.customer_name?.trim(),
      mobile_number: row.mobile_number?.trim(),
      email: row.email?.trim(),
      plan_id: parseInt(row.plan_id, 10)
    }));

    try {
      const response = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/bulk-upload`, { usersData }, {
        headers: {
          Authorization: `${adminToken}`, // Passing the token in the Authorization header
        }
      });

      if (response.status === 200 && response.data.success) {
        setUploadStatus(`Successfully uploaded ${usersData.length} users. ${response.data.message}`);
      } else {
        setUploadStatus(`Upload failed: ${response.data.message || 'Unknown error'}.`);
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
                    chunkSize={10000}
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
                    {/* Columns will be auto-mapped based on CSV headers */}
                  </Importer>
                  {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
                  {isUploading && <p>Upload in progress...</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default BulkUser;

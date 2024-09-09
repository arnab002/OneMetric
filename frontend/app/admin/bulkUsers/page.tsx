'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { Importer, ImporterField, ImporterProps } from 'react-csv-importer';
import axios from 'axios';
import Swal from 'sweetalert2';
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
  const [importerKey, setImporterKey] = useState<number>(0); // Add this line

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
      customer_name: String(row.customer_name || '').trim(),
      mobile_number: String(row.mobile_number || '').trim(),
      email: String(row.email || '').trim(),
      plan_id: parseInt(String(row.plan_id || '0'), 10)
    }));

    try {
      const response = await axios.post<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/bulk-upload`, { usersData }, {
        headers: {
          Authorization: `${adminToken}`, // Passing the token in the Authorization header
        }
      });

      if (response.status === 200 && response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Upload Successful',
          text: response.data.message,
        });
        setUploadStatus(`Successfully uploaded ${usersData.length} users. ${response.data.message}`);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: response.data.message || 'Unknown error',
        });
        setUploadStatus(`Upload failed: ${response.data.message || 'Unknown error'}.`);
        // Reset the importer after an error
        setImporterKey(importerKey + 1); // Increment the key to force a re-render and reset the importer
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
      });
      setUploadStatus('An error occurred. Please try again.');
      // Reset the importer after an error
      setImporterKey(importerKey + 1); // Increment the key to force a re-render and reset the importer
    } finally {
      setIsUploading(false);
    }
  }, [adminToken, importerKey]); // Add importerKey to the dependency array

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
                    key={importerKey} // Add this line
                    chunkSize={10000}
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
                    <ImporterField name="customer_name" label="Customer_Name" />
                    <ImporterField name="mobile_number" label="Mobile_Number" />
                    <ImporterField name="email" label="Email" />
                    <ImporterField name="plan_id" label="Plan_ID" />
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
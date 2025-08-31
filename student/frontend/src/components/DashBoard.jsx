import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StudentList from './StudentList';
import { generateDummyData } from '../services/Api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [generatingData, setGeneratingData] = useState(false);

  const handleGenerateDummyData = async () => {
    if (window.confirm('This will replace all existing student data. Continue?')) {
      try {
        setGeneratingData(true);
        await generateDummyData();
        alert('1000 dummy students generated successfully!');
        window.location.reload(); 
      } catch (error) {
        alert('Failed to generate dummy data');
      } finally {
        setGeneratingData(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Student Management System
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGenerateDummyData}
                disabled={generatingData}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
              >
                {generatingData ? 'Generating...' : 'Generate 1000 Students'}
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>


      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StudentList />
      </main>
    </div>
  );
};

export default Dashboard;
import { useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  age: number;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: any;
  error?: string;
  users?: User[];
  user?: User;
}

interface TestStep {
  id: string;
  title: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  body?: any;
  expectedBehavior: string;
}

function App() {
  const [responses, setResponses] = useState<Record<string, { response: ApiResponse | null; error: string | null; loading: boolean }>>({});

  const testSteps: TestStep[] = [
    {
      id: 'root',
      title: 'Test Root Endpoint',
      description: 'Test the basic server connection',
      method: 'GET',
      endpoint: '/',
      expectedBehavior: 'Should return a welcome message'
    },
    {
      id: 'init-table',
      title: 'Initialize Users Table',
      description: 'Create the users table in the database',
      method: 'GET',
      endpoint: '/init-users-table',
      expectedBehavior: 'Should create the users table'
    },
    {
      id: 'post-user-valid',
      title: 'POST User - Valid Data',
      description: 'Create a new user with valid data',
      method: 'POST',
      endpoint: '/user',
      body: { name: 'John Doe', age: 25 },
      expectedBehavior: 'Should successfully create user'
    },
    {
      id: 'post-user-invalid',
      title: 'POST User - Missing Data',
      description: 'Try to create user with missing age field',
      method: 'POST',
      endpoint: '/user',
      body: { name: 'Jane' },
      expectedBehavior: 'Should return validation error'
    },
    {
      id: 'post-user-valid2',
      title: 'POST User - Different Data',
      description: 'Create another user with different data',
      method: 'POST',
      endpoint: '/user',
      body: { name: 'Alice Smith', age: 30 },
      expectedBehavior: 'Should successfully create second user'
    },
    {
      id: 'get-all-users',
      title: 'GET All Users',
      description: 'Retrieve all users from database',
      method: 'GET',
      endpoint: '/users',
      expectedBehavior: 'Should return array of users'
    },
    {
      id: 'get-user-valid',
      title: 'GET User by ID - Valid',
      description: 'Get user with ID 1',
      method: 'GET',
      endpoint: '/user/1',
      expectedBehavior: 'Should return user with ID 1'
    },
    {
      id: 'get-user-invalid',
      title: 'GET User by ID - Invalid',
      description: 'Try to get user with non-existent ID',
      method: 'GET',
      endpoint: '/user/999',
      expectedBehavior: 'Should return user not found error'
    },
    {
      id: 'get-user-non-numeric',
      title: 'GET User by ID - Non-numeric',
      description: 'Try to get user with non-numeric ID',
      method: 'GET',
      endpoint: '/user/abc',
      expectedBehavior: 'Should return invalid ID error'
    },
    {
      id: 'put-user-valid',
      title: 'PUT User - Valid Update',
      description: 'Update user with ID 1',
      method: 'PUT',
      endpoint: '/user/1',
      body: { name: 'John Doe Updated', age: 26 },
      expectedBehavior: 'Should successfully update user'
    },
    {
      id: 'put-user-missing-data',
      title: 'PUT User - Missing Data',
      description: 'Try to update user with missing age',
      method: 'PUT',
      endpoint: '/user/1',
      body: { name: 'John Doe' },
      expectedBehavior: 'Should return validation error'
    },
    {
      id: 'put-user-invalid-id',
      title: 'PUT User - Invalid ID',
      description: 'Try to update non-existent user',
      method: 'PUT',
      endpoint: '/user/999',
      body: { name: 'Non Existent User', age: 30 },
      expectedBehavior: 'Should return user not found error'
    },
    {
      id: 'put-user-non-numeric',
      title: 'PUT User - Non-numeric ID',
      description: 'Try to update user with non-numeric ID',
      method: 'PUT',
      endpoint: '/user/abc',
      body: { name: 'Invalid ID User', age: 25 },
      expectedBehavior: 'Should return invalid ID error'
    },
    {
      id: 'delete-user-valid',
      title: 'DELETE User - Valid ID',
      description: 'Delete user with ID 2',
      method: 'DELETE',
      endpoint: '/user/2',
      expectedBehavior: 'Should successfully delete user'
    },
    {
      id: 'delete-user-invalid',
      title: 'DELETE User - Invalid ID',
      description: 'Try to delete non-existent user',
      method: 'DELETE',
      endpoint: '/user/999',
      expectedBehavior: 'Should return user not found error'
    },
    {
      id: 'delete-user-non-numeric',
      title: 'DELETE User - Non-numeric ID',
      description: 'Try to delete user with non-numeric ID',
      method: 'DELETE',
      endpoint: '/user/xyz',
      expectedBehavior: 'Should return invalid ID error'
    },
    {
      id: 'get-users-after-ops',
      title: 'GET Users After Operations',
      description: 'Verify changes after all operations',
      method: 'GET',
      endpoint: '/users',
      expectedBehavior: 'Should show updated user list'
    },
    {
      id: 'delete-all-users',
      title: 'DELETE All Users',
      description: 'Empty the users table',
      method: 'DELETE',
      endpoint: '/users/all',
      expectedBehavior: 'Should delete all users'
    },
    {
      id: 'verify-empty',
      title: 'Verify Table Empty',
      description: 'Check that table is now empty',
      method: 'GET',
      endpoint: '/users',
      expectedBehavior: 'Should return empty array'
    },
    {
      id: 'drop-table',
      title: 'Drop Users Table',
      description: 'Completely remove the users table',
      method: 'DELETE',
      endpoint: '/drop-users-table',
      expectedBehavior: 'Should drop the table'
    },
    {
      id: 'verify-table-gone',
      title: 'Verify Table Gone',
      description: 'Confirm table no longer exists',
      method: 'GET',
      endpoint: '/users',
      expectedBehavior: 'Should return table not found error'
    }
  ];

  const executeStep = async (step: TestStep) => {
    const stepId = step.id;
    
    // Set loading state
    setResponses(prev => ({
      ...prev,
      [stepId]: { response: null, error: null, loading: true }
    }));

    try {
      let response;

      const API_URL = import.meta.env.VITE_API_URL;

      if (!API_URL) throw new Error("Missing API URL");

      const url = `${API_URL}${step.endpoint}`;
      
      switch (step.method) {
        case 'GET':
          response = await axios.get(url);
          break;
        case 'POST':
          response = await axios.post(url, step.body);
          break;
        case 'PUT':
          response = await axios.put(url, step.body);
          break;
        case 'DELETE':
          response = await axios.delete(url);
          break;
      }

      setResponses(prev => ({
        ...prev,
        [stepId]: { 
          response: {
            data: response.data,
            status: response.status,
            statusText: response.statusText
          }, 
          error: null, 
          loading: false 
        }
      }));
    } catch (error: any) {
      setResponses(prev => ({
        ...prev,
        [stepId]: { 
          response: null, 
          error: error.response?.data || error.message || 'Unknown error occurred', 
          loading: false 
        }
      }));
    }
  };

  const runAllSteps = async () => {
    for (let i = 0; i < testSteps.length; i++) {
      await executeStep(testSteps[i]);
      // Add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const resetResults = () => {
    setResponses({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="text-center custom-card p-12 hover-lift pulse-glow mb-8">
          <h1 className="text-5xl font-bold text-gradient mb-6">
            Full-Stack CRUD Tutorial
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Learn CRUD operations with React, TypeScript, Express, and PostgreSQL in an interactive demo
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {/* Frontend Stack */}
            <div className="custom-badge bg-orange-100 text-orange-700 border border-orange-200">
              ⚡ Vite
            </div>
            <div className="custom-badge bg-cyan-100 text-cyan-700 border border-cyan-200">
              ⚛️ React
            </div>
            <div className="custom-badge bg-blue-100 text-blue-700 border border-blue-200">
              📘 TypeScript
            </div>
            <div className="custom-badge bg-teal-100 text-teal-700 border border-teal-200">
              🎨 Tailwind CSS
            </div>
            
            {/* Backend Stack */}
            <div className="custom-badge bg-green-100 text-green-700 border border-green-200">
              🚀 Express Server
            </div>
            <div className="custom-badge bg-indigo-100 text-indigo-700 border border-indigo-200">
              🐘 PostgreSQL Database
            </div>
            <div className="custom-badge bg-purple-100 text-purple-700 border border-purple-200">
              🐳 Docker Container
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          <button 
            onClick={runAllSteps}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Run All Tests
          </button>
          <button 
            onClick={resetResults}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 font-semibold transition-all duration-200"
          >
            Reset Results
          </button>
        </div>

        {/* Test Steps */}
        <div className="space-y-6">
          {testSteps.map((step, index) => {
            const result = responses[step.id];
            
            return (
              <div key={step.id} className="custom-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{step.description}</p>
                    <div className="flex gap-4 text-sm text-gray-500 mb-2">
                      <span className={`px-2 py-1 rounded font-semibold ${
                        step.method === 'GET' ? 'bg-green-100 text-green-700' :
                        step.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                        step.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {step.method}
                      </span>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                        {step.endpoint}
                      </span>
                    </div>
                    {step.body && (
                      <div className="mb-2">
                        <span className="text-sm text-gray-500">Request Body:</span>
                        <pre className="text-xs bg-gray-100 p-2 rounded mt-1 font-mono">
                          {JSON.stringify(step.body, null, 2)}
                        </pre>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 italic">Expected: {step.expectedBehavior}</p>
                  </div>
                  
                  <button
                    onClick={() => executeStep(step)}
                    disabled={result?.loading}
                    className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {result?.loading ? 'Running...' : 'Test'}
                  </button>
                </div>

                {/* Results */}
                {result && (
                  <div className="mt-4 border-t pt-4">
                    {result.loading && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span>Executing request...</span>
                      </div>
                    )}
                    
                    {result.response && (
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">✅ Response:</h4>
                        <pre className="bg-green-50 border border-green-200 p-4 rounded text-sm font-mono overflow-x-auto">
                          {JSON.stringify(result.response, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    {result.error && (
                      <div>
                        <h4 className="font-semibold text-red-700 mb-2">❌ Error:</h4>
                        <pre className="bg-red-50 border border-red-200 p-4 rounded text-sm font-mono overflow-x-auto">
                          {JSON.stringify(result.error, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default App

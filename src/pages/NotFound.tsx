
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primaryColor text-white p-4">
      <h1 className="blackText mb-4">404 - Page Not Found</h1>
      <p className="regularText mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="button-color text-white px-6 py-3 rounded-lg">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;

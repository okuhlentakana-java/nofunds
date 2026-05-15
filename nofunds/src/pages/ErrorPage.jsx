import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(-1); // Navigate back to the previous page
    };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
      {/* Animated SVG Illustration */}
      <div className="relative w-full max-w-md mb-8">
        <motion.svg
          viewBox="0 0 500 500"
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-2xl"
        >
          {/* Background Blob */}
          <circle cx="250" cy="250" r="200" fill="#E2E8F0" />
          
          {/* Main Error Character/Icon */}
          <motion.path
            d="M150 350 L350 350 L250 150 Z"
            fill="#6366F1"
            stroke="#4338CA"
            strokeWidth="8"
          />
          
          {/* The "!" mark */}
          <rect x="240" y="220" width="20" height="70" rx="10" fill="white" />
          <circle cx="250" cy="315" r="12" fill="white" />

          {/* Floating Small Elements */}
          <motion.circle 
            cx="100" cy="150" r="10" fill="#94A3B8" 
            animate={{ opacity: [0.4, 1, 0.4] }} 
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle 
            cx="400" cy="280" r="15" fill="#CBD5E1" 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.svg>
      </div>

      {/* Error Text Content */}
      <h1 className="text-8xl font-black text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700 mb-6">
        Oops! You've drifted into deep space.
      </h2>
      <p className="text-slate-500 max-w-sm mb-10 leading-relaxed">
        The page you’re looking for doesn’t exist or has been moved to another quadrant.
      </p>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGoHome}
        className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
      >
        Take Me Back
      </motion.button>

      {/* Subtle Footer Decor */}
      <div className="absolute bottom-10 text-slate-400 text-sm">
        Error Code: <span className="font-mono">ERR_PAGE_NOT_FOUND</span>
      </div>
    </div>
  );
};

export default ErrorPage;
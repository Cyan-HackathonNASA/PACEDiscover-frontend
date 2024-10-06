import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black">
      <div className="w-12 h-12 border-8 border-t-8 border-t-cyan-500 border-gray-200 rounded-full animate-spin"></div>
      <p className="text-white text-lg mt-5 tracking-wide animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;

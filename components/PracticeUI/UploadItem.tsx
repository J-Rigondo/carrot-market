import React from 'react';

const UploadItem = () => {
  return (
    <div className="px-4 py-16">
      <div>
        <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
          <svg
            className="h-12 w-12"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input className="hidden" type="file" />
        </label>
      </div>
      <div className="mt-3">
        <label>Price</label>
        <div className="relative flex items-center">
          <div className="absolute pl-3 pointer-events-none">
            <span>$</span>
          </div>
          <input
            type="text"
            placeholder="0.00"
            className="pl-7 w-full focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md"
          />
          <div className="absolute pointer-events-none right-0 pr-3">
            <span>USD</span>
          </div>
        </div>
      </div>
      <div>
        <label>Description</label>
        <textarea
          className="mt-1 w-full shadow-sm rounded-md focus:border-orange-500 focus:ring-orange-500"
          rows={4}
        />
      </div>
      <button className="bg-orange-500 w-full hover:bg-orange-600 text-white p-3 rounded-md mt-3">
        Upload product
      </button>

      <div className="w-full bg-slate-300 aspect-video"></div>
    </div>
  );
};

export default UploadItem;

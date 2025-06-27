import React from 'react'

export default function SearchLoader() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 md:gap-4 gap-3">
        {
          [...Array(10)].map((_, index) => (
            <div key={index} className="shadow-lg rounded-lg bg-gray-200 p-4 animate-pulse">
              <div className="h-64 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-10 bg-gray-300 rounded w-full mt-3"></div>
            </div>
          ))
        }
    </div>
  )
}

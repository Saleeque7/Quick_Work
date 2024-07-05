import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';

const Rating = ({ reviews }) => {

  const averageRating = reviews.reduce((acc, rating) => acc + rating, 0) / reviews.length;


  const generateStars = (rating) => {
    const maxStars = 5;
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-6 h-6 ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21 16.54 14.83 22 9.24 15.81 8.63 12 2 8.19 8.63 2 9.24 7.46 14.83 5.82 21 12 17.27Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center">
        <div className="flex">
          {generateStars(Math.round(averageRating))}
        </div>
        <div className="flex">
          
        </div>
        {/* <span className="text-gray-600 text-sm ml-2">({averageRating.toFixed(1)})</span> */}
      </div>
      <div className="flex items-center">
        <HiLocationMarker className="text-teal-500 w-4 h-6" />
        <span className="ml-2  mr-6 text-gray-500 text-sm">Mumbai</span>
      </div>
    </div>
  );
};

export default Rating;

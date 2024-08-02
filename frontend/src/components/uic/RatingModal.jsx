import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaStar } from 'react-icons/fa';

Modal.setAppElement('#root'); 

const RatingModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [rating, setRating] = useState(1);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    onSubmit(rating);
    onRequestClose(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="font-semibold">Rate the Client</h2>
      <div className="flex items-center mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>
      <div className="mt-4">
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
          onClick={handleSubmit}
        >
          Submit Rating
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400"
          onClick={onRequestClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default RatingModal;

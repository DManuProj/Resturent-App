import React from "react";
import Button from "./ButtonUI";

const MessageBox = ({ isOpen, title, message, closeModal, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={closeModal}
            label="Cancel"
            styles="bg-gray-300 text-black px-6 py-2 rounded-full"
          />
          <Button
            onClick={onConfirm}
            label="Confirm"
            styles="bg-red-600 text-white px-6 py-2 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageBox;

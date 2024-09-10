import React from "react";
import imageImports from "../assets/index"; // Make sure to use the correct path

const MasonryGallery = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {imageImports.map((image, index) => (
        <div key={index} className="break-inside-avoid">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;

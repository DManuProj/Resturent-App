import React from "react";

import galleryImages from "../assets/index";

const Gallery = () => {
  return (
    <div className="bg-gray-800 w-full min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-white mb-8 text-3xl text-center">Gallery</h1>
      <div className="p-5 md:p-10">
        <div className="columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              className="w-full h-full object-cover rounded shadow-lg"
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;

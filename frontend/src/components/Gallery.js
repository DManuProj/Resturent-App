import React from "react";
import galleryImages from "../assets/index";

const Gallery = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        background: "linear-gradient(to right, #fcd34d, #fbbf24, #fef08a)",
      }}
    >
      <h1 className="text-yellow-900 mb-8 text-4xl font-bold text-center shadow-lg p-4 bg-white bg-opacity-70 rounded-lg">
        Gallery
      </h1>
      <div className="p-5 md:p-10">
        <div className="columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              className="w-full h-full object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
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

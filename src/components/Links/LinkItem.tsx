// ProgressBar.tsx
import React from "react";
import { LinkData } from "../../data/linkData";
import { Link } from "react-router-dom";

const ProgressBar = () => {
  const Links = LinkData;

  return (
    <div className="flex flex-row items-center justify-between w-full p-4 bg-gray-200 rounded">
      {Links.map(({ id, image, name, linkUrl }, index) => (
        <div
          className={`flex flex-col items-center w-full ${
            index !== Links.length - 1 ? "border-r-2 border-gray-400" : ""
          }`}
          key={id}
        >
          <div className="w-12 h-12 p-2 mb-2 bg-blue-500 rounded-full">
            <img src={image} alt="" />
          </div>
          <Link to={linkUrl} className="text-sm">
            {name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;

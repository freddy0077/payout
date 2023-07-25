import { useState } from "react";

const ProgressBar = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="h-6 w-full bg-gray-300 rounded-full">
      <div
        className={`h-6 bg-primary-500 rounded-full transition-all duration-500 ${
          page > 1 ? "w-1/2" : "w-1/4"
        } ${page > 2 ? "w-3/4" : ""}`}
      />
      <div className="flex justify-between text-xs mt-2">
        <button
          onClick={prevPage}
          className={`border border-gray-400 px-2 py-1 rounded-full ${
            page === 1
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          className={`border border-gray-400 px-2 py-1 rounded-full ${
            page === 3
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
          disabled={page === 3}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;

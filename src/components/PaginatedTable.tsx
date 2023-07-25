import React, { useState } from "react";

interface Column {
  header: string;
  accessor: string;
}

interface PaginatedTableProps {
  columns: Column[];
  data: any[];
  pageSize: number;
}

export const PaginatedTable: React.FC<PaginatedTableProps> = ({
  columns,
  data,
  pageSize,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const handleChangePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setCurrentPage(newPage);
  };

  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <table className="w-full text-left table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
          onClick={() => handleChangePage(currentPage - 1)}
        >
          Previous
        </button>
        <div>
          {currentPage} / {totalPages}
        </div>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
          onClick={() => handleChangePage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

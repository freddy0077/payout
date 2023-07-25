import React from "react";

interface Column {
  header: string;
  accessor: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
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
        {data.map((row, rowIndex) => (
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
  );
};

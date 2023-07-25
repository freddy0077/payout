import React, { useState } from "react";
import "./UserTable.module.css";
import Button from "../components/Buttons/Button"; // Import the CSS file

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserTableProps {
    data: User[];
    tableTitle: string;
}

const UserTable: React.FC<UserTableProps> = ({ data, tableTitle }) => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = data.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleActionButtonClick = (user: User) => {
        console.log("Action button clicked for user:", user);
        // Add your desired action logic here
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const findDuplicateEmails = (data: User[]): string[] => {
        const emailCount: { [email: string]: number } = {};
        data.forEach((user) => {
            emailCount[user.email] = (emailCount[user.email] || 0) + 1;
        });
        return Object.keys(emailCount).filter((email) => emailCount[email] > 1);
    };

    const duplicateEmails = findDuplicateEmails(filteredData);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="user-table bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">{tableTitle}</h3>
            <input
                type="text"
                className="w-full border-2 border-gray-300 mb-4 p-2 rounded focus:border-blue-500 focus:outline-none"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="table-container overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                    <tr className="border-b-2 border-gray-300">
                        <th className="px-4 py-2 text-gray-600 font-semibold">No.</th>
                        <th className="px-4 py-2 text-gray-600 font-semibold">Player</th>
                        <th className="px-4 py-2 text-gray-600 font-semibold">Serial No.</th>
                        <th className="px-4 py-2 text-gray-600 font-semibold">Amount</th>
                        <th className="px-4 py-2 text-gray-600 font-semibold">Paid</th>
                        <th className="px-4 py-2 text-gray-600 font-semibold">Promo</th>
                        <th className="px-4 py-2 text-gray-600 font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedData.map((user) => (
                        <tr key={user.id} className="border-b border-gray-200">
                            <td className="px-4 py-2">{user.id}</td>
                            <td className="px-4 py-2">{user.name}</td>
                            <td
                                className={`px-4 py-2 ${
                                    duplicateEmails.includes(user.email)
                                        ? "bg-red-200 text-red-800"
                                        : ""
                                }`}
                            >
                                {user.email}
                            </td>
                            <td className="px-4 py-2">

                            </td>
                            <td className="px-4 py-2">

                            </td>
                            <td className="px-4 py-2">

                            </td>
                            <td className="px-4 py-2">
                                <Button onClick={ () => handleActionButtonClick(user)}>Remove</Button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination mt-4 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (

                        <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded ${
                                currentPage === page
                                    ? "bg-blue-500 text-white"
                                    : "bg-white border border-gray-300 text-black"
                            }   focus:outline-none`}
                        >
                            {page}
                        </Button>

                    //     <button
                    //         key={page}
                    //         className={`px-4 py-2 rounded ${
                    //             currentPage === page
                    //                 ? "bg-blue-500 text-white"
                    //                 : "bg-white border border-gray-300 text-gray-600"
                    //         } hover:bg-blue-500 hover:text-white focus:outline-none`}
                    //         onClick={() => handlePageChange(page)}
                    //     >
                    //         {page}
                    //     </button>
                    )
                )}
            </div>
        </div>
    );
};

export default UserTable;


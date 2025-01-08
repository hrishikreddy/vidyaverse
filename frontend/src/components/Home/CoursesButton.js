import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const CoursesButton = () => {
    return (
        <Link to="/courselist">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full block w-full mt-6">
                Explore Courses
            </button>
        </Link>
    );
};

export default CoursesButton;

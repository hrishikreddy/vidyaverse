import React from 'react';
import {useNavigate,Link} from 'react-router-dom'
const Profile = ({userData}) => {
  const { name, email, profile_picture, enrolled_courses, completed_courses,role } = userData;
  console.log(profile_picture, "profile.jsx")
  console.log(userData,"userData")
    const navigate=useNavigate()
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-6">
          <div className="flex items-center">
            <img src={`${profile_picture}`} alt={name} className="h-16 w-16 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-gray-600">{email}</p>
              <p className="text-gray-600">{role}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-4">
            <h3 className="text-lg font-semibold mb-4">Enrolled Courses</h3>
            <ul>
              {Object.entries(enrolled_courses).map(([courseId, course]) => (
                <li key={courseId} className="mb-2">
                  <p className="font-semibold">Course ID: {courseId}</p>
                  <p>{course.title}</p>
                  <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                  <Link to={`/course?data=${encodeURIComponent(JSON.stringify(courseId))}`}>Link to Course</Link>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-4">
            <h3 className="text-lg font-semibold mb-4">Completed Courses</h3>
            {completed_courses.length === 0 ? (
              <p>No courses completed yet.</p>
            ) : (
              <ul>
                {Object.keys(completed_courses).map((courseId,index) => (
                  <li key={index}>
                    <p className="font-semibold">Course ID: {courseId}</p>
                    <p>{completed_courses[courseId]['title']}</p>
                    <button disabled onClick={() => navigate("")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Download Certificate
                  </button>
                    
                    </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

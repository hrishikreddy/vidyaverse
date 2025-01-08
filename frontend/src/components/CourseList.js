import React, { useEffect } from 'react';
import "../assets/CSS/CourseList.css"
import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'


const coursess = [
  {_id:"66191f2d6b57c85e24968dc4",
    title: "Introduction to Programming",
    image: "data:image/jpeg;base64,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",
    instructor: "John Doe",
    difficulty: "Beginner",
    price: 49.99
  },
  { _id:"course_id_1",
    title: "Machine Learning Basics",
    image: "course_image_url",
    instructor: "Jane Smith",
    difficulty: "Intermediate",
    price: 59.99
  },
  {_id:"course_id_1",
    title: "Web Development Fundamentals",
    image: "course_image_url",
    instructor: "Alex Johnson",
    difficulty: "Beginner",
    price: 39.99
  },
  {_id:"course_id_1",
    title: "Advanced Data Structures",
    image: "course_image_url",
    instructor: "Emily Brown",
    difficulty: "Advanced",
    price: 69.99
  },
  {_id:"course_id_1",
    title: "Digital Marketing Strategies",
    image: "course_image_url",
    instructor: "Michael Wilson",
    difficulty: "Intermediate",
    price: 49.99
  }
];

function CourseListing({ courses, loginDetails, setLoginDetails ,setEnrollDetails}) {
  
  const navigate =useNavigate()
  const paymentHandler = async (e,amount,currency,receiptId,courseid,coursetitle) => {
    const response = await fetch("http://localhost:3001/api/order", {
      method: "POST",
      body: JSON.stringify({
        amount:amount*100,
        currency:"INR",
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_r9nAigUoHNaYOV", // Enter the Key ID generated from the Dashboard
      amount:amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency:"INR",
      name: "VidyaVerse ", //your business name
      description: "paying for the enrollment of course",
      image: "https://th.bing.com/th/id/OIG2.3I5AIG7giQ6F8ZvA0Y_6?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      method: {
        netbanking: true,
        card: true,
        qr_code:true,
        upi: true, // enable UPI payment method
      },
      handler: async function (response) {
        const body = {
          ...response,courseid:courseid,coursetitle:coursetitle,email:loginDetails.email,
        };
        console.log(body)
        const validateRes = await fetch(
          "http://localhost:3001/api/order/validate",

          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        if(jsonRes.msg==="success"){
          setEnrollDetails(prev=>!prev)
          navigate("/courselist")
        }
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: loginDetails.name, //your customer's name
        email: loginDetails.email,
        // contact: "9908092442", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "vidya verse",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
    
  };
  const enrollHandler = async (courseid,title) => {
    try {
      const response = await axios.post("http://localhost:3001/api/freeenroll", { courseid: courseid, email: loginDetails.email,title:title })
      if (response.data.acknowledged === true) {
        console.log('enrollment success')
        console.log(response.data.enrolled_courses)
        setLoginDetails(prev => ({ ...prev, enrolled_courses: response.data.enrolled_courses }))
      } else {
        alert(response.data.description)
      }
    } catch (error) {
      console.log(error)
      alert("error occured while enrolling")
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courses.map((course, index) => (
        <div className="bg-white rounded-lg shadow-md p-4" key={index}>
          <img src={course.image} alt="Course Image" className="w-full h-40 object-cover rounded-md mb-4" />
          <div className="text-gray-800">
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="mb-2"><strong>Instructor:</strong> {course.instructor}</p>
            <p className="mb-2"><strong>Difficulty:</strong> {course.difficulty}</p>
            <p className="mb-4"><strong>Price:</strong> ${course.price}</p>
            {Object.keys(loginDetails.enrolled_courses).includes(course._id) ? (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to={`/course?data=${encodeURIComponent(JSON.stringify(course._id))}`}>Link to Course</Link>
              </button>
            ) : (
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={(e) =>{ 
                if(course.price!==0){
                  alert("it was a payment course")
                  console.log(typeof(course.price))
                  paymentHandler(e,course.price,"INR",uuidv4(),course._id,course.title)
                }else{
                enrollHandler(course._id,course.title)}}}>Enroll Now</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CourseList({ loginDetails, setLoginDetails }) {
  const [courses, setCourses] = useState([])
  const [enrollDetails,setEnrollDetails]=useState(false)
  useEffect(() => {
    if (courses.length === 0) {
      const run = async () => {
        try {
          const response = await axios.get("http://localhost:3001/api/getcourses")
          if (response.data.acknowledged) {
            console.log(response.data)
            setCourses(response.data.courses)
          }
          
        } catch (error) {
          alert("error occurred")
        }
      }
      run();
    }
  }, [courses])
  useEffect(()=>{
    const run= async()=>{
    const respo2=await axios.post("http://localhost:3001/api/getenrolledcourses",{email:loginDetails.email})
          if (respo2.data.acknowledged){
            setLoginDetails(respo2.data.loginDetails)
          }
        setEnrollDetails(prev=>!prev)
        }
        if (enrollDetails){
        run()}
        },[enrollDetails])
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Course Listings</h1>
      <CourseListing courses={courses} loginDetails={loginDetails} setLoginDetails={setLoginDetails} setEnrollDetails={setEnrollDetails} />
    </div>
  );
}

export default CourseList;

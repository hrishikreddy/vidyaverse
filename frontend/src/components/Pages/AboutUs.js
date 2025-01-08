// AboutUs.js

import React from 'react';
import '../../assets/CSS/AboutUs.css'; // Importing CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1 className="about-us-heading">About Vidyaverse</h1>
        <p className="about-us-description">
          Welcome to Vidyaverse, where knowledge knows no bounds. We are an educational platform committed to empowering learners worldwide with access to high-quality courses, both paid and free. Our mission is to foster a community of lifelong learners by providing a diverse range of educational resources tailored to meet the needs of every individual.
        </p>
        <p className="about-us-mission">
          Our mission is to break down barriers to learning and create a platform where anyone can expand their knowledge, enhance their skills, and pursue their passions. We strive to offer a comprehensive range of courses covering various subjects and skill levels, from beginner to advanced.
        </p>
        <p className="about-us-vision">
          At Vidyaverse, we envision a world where education is accessible to all, regardless of geographical location, socioeconomic background, or educational level. We strive to create a platform where anyone can access high-quality educational resources and achieve their full potential. Our vision is to revolutionize the way people learn by providing innovative, interactive, and engaging learning experiences.
        </p>
        <p className="about-us-values">
          Our core values drive everything we do at Vidyaverse. We are committed to excellence, integrity, and inclusivity. We believe in the power of education to transform lives and empower individuals to reach their goals. We are dedicated to fostering a supportive and collaborative learning community where everyone feels valued and inspired to learn and grow.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;

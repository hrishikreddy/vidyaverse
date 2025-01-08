import React, { useState, useEffect } from 'react';

const DisplayText = () => {
  const [displayText, setDisplayText] = useState('');
  const initialText = 'welcome to vidya verse an innovative education platform '.split('');
  const additionalText = 'Join us to explore a world of learning opportunities!'.split('');
  const allText = [...initialText, ...additionalText];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (currentIndex < allText.length) {
        setDisplayText(prevText => prevText + allText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setCurrentIndex(0);
          setDisplayText('');
        }, 1000);
      }
    }, 100); // Adjust the interval as needed for typing speed

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex, allText]); // Include currentIndex and allText as dependencies to avoid stale closures

  return (
    <>
      <div className='bg-blue-500 shadow-sm text-center text-white font-mono py-4'>
        <p className="mb-4">Learn and grow with us!</p>
        {displayText}
      </div>
    </>
  );
};

export default DisplayText;

import React, { useState, useEffect } from 'react';

const languages = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Ruby',
  'Swift',
  'Go',
  'TypeScript',
  'PHP',
  'Rust',
  'Kotlin',
  'C#',
  'Scala',
  'Perl',
  'HTML',
  'CSS'
];

const LanguageBlocks = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(prevIndex => (prevIndex + 1) % languages.length);
    }, 3000); // Adjust the speed of movement here

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex overflow-hidden p-2">
      {languages.map((language, index) => {
        const arrayIndex = (index + startIndex) % languages.length;
        return (
          <div 
            key={index}
            style={{
              backgroundColor: '#3490dc',
              color: 'white',
              fontWeight: '600',
              padding: '8px 12px',
              margin: '0 8px',
              borderRadius: '9999px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transform: `translateX(${(index - startIndex) * 150}px)`, // Adjust the distance between blocks here
              transition: 'transform 1.5s linear'
            }}
          >
            {languages[arrayIndex]}
          </div>
        );
      })}
    </div>
  );
};

export default LanguageBlocks;

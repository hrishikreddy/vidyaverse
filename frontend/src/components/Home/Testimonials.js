import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://th.bing.com/th?id=OIP.uik-BJuZz47LpXy1m19jpwHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', // Placeholder image URL
    },
    {
      id: 2,
      name: 'Jane Smith',
      quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://th.bing.com/th?id=OIP.53m4__PwV07-KCIrlL2zMAHaLF&w=204&h=305&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2', // Placeholder image URL
    },
    // Add more testimonials as needed
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Student Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="bg-gray-100 p-4 rounded-lg flex items-center">
            <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="text-gray-800 text-lg mb-2">{testimonial.quote}</p>
              <p className="text-gray-600 font-semibold">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

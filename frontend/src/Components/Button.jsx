import React from 'react';

const Button = ({ text, bgColor, textColor }) => (
  <a
    href="#"
    className={`relative px-8 py-3 ${bgColor} ${textColor} font-serif text-lg rounded-md overflow-hidden group transition-all duration-300`}
  >
    <span className="absolute inset-0 bg-green-300 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
    <span className="relative z-10">{text}</span>
  </a>
);

export default Button;
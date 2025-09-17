import React from "react";

export default function Card({ title, desc, icon }) {
  return (
    <div className="p-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl 
                    hover:scale-105 hover:bg-gray-800 transition-all duration-300 ease-in-out">
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

import React from "react";
import CardGrid from "../components/CardGrid";

export default function Overview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
        MernJS ⚡
      </h1>
      <p className="text-center mt-4 text-gray-300 text-lg">
        A modern MERN framework with unified dev experience
      </p>
      <CardGrid />
    </div>
  );
}

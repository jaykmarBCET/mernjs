import React,{useEffect,useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CardGrid from "../components/CardGrid";
import ReactMarkdown from 'react-markdown'
import Overview from "./Overview";
import "./index.css";


function Docs() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/jaykmarBCET/mernjs/main/readme.md')
      .then(res => res.text())
      .then(text => setMarkdown(text));
  }, []);

  return (
    <div className="p-10 bg-gray-900 min-h-screen">
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-pink-500 animate-text">
        📖 MERN Docs
      </h1>
      <p className="mt-4 text-lg text-yellow-300">
        Documentation loaded directly from README.md
      </p>

      <div className="mt-10 max-w-4xl mx-auto prose prose-invert prose-headings:text-pink-400 prose-code:bg-gray-800 prose-code:text-green-400 prose-blockquote:border-l-pink-500 prose-blockquote:text-pink-300">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}


// GitHub page placeholder
function Github() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold text-blue-400">🌍 GitHub</h1>
      <p className="mt-4 text-gray-300">
        Visit the repo at <a href="https://github.com/jaykmarBCET/mernjs/blob/main/readme.md" className="underline text-green-400">GitHub</a>
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-green-400">MernJS ⚡</h1>
          <div className="space-x-6">
            <Link to="/" className="hover:text-green-400 transition">Home</Link>
            <Link to="/features" className="hover:text-green-400 transition">Features</Link>
            <Link to="/docs" className="hover:text-green-400 transition">Docs</Link>
            <Link to="/github" className="hover:text-green-400 transition">GitHub</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <section id="home" className="flex flex-col items-center justify-center text-center py-20 px-6">
                  <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg">
                    Welcome to MernJS
                  </h1>
                  <p className="mt-6 text-lg text-gray-300 max-w-2xl">
                    A modern <span className="text-green-400">MERN</span> framework that runs{" "}
                    <span className="text-blue-400">React</span> +{" "}
                    <span className="text-yellow-400">Express</span> seamlessly in one setup.
                  </p>
                  <div className="mt-8 space-x-4">
                    <Link to="/docs">
                      <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition">
                        Get Started
                      </button>
                    </Link>
                    <Link to="/docs">
                      <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition">
                        View Docs
                      </button>
                    </Link>
                  </div>
                </section>
              </>
            }
          />
          <Route
            path="/features"
            element={
              <section id="features" className="py-20 px-6">
                <h2 className="text-3xl font-bold text-center mb-10">Why MernJS?</h2>
                <CardGrid />
              </section>
            }
          />
          <Route path="/docs" element={<Docs />} />
          <Route path="/github" element={<Github />} />
        </Routes>

        {/* Footer */}
        <footer className="text-center text-gray-500 py-6 border-t border-gray-700">
          ⚡ Built with ❤️ using MERN — This is <span className="text-green-400">MernJS</span>
        </footer>
      </div>
    </Router>
  );
}

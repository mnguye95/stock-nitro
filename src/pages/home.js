import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-purple-gray">
      <Navbar />
      <div className="flex flex-col p-5 h-full mx-auto mt-[5em] gap-8 max-w-[60em]">
        <h1 className="lg:text-5xl md:text-2xl text-4xl text-magic-mint font-bungee">
          Trade with High Conviction
        </h1>
        <h2 className="md:text-2xl text-lg text-magic-mint font-space-grotesk">
          The only stocks and options software trusted by top financial
          professionals to make calculated trades for clients.
        </h2>
        <div className="flex gap-x-4 lg:w-2/3 md:w-full">
          <Link to="/register" className="bg-purple-gray font-space-grotesk font-[1000] w-1/2 rounded-md text-2xl mx-auto my-4 p-3 text-magic-mint hover:-translate-y-1 duration-75 border border-magic-mint text-center">
              Free Trial
          </Link>
          <Link to="/register" className="bg-magic-mint font-space-grotesk font-[1000] w-1/2 rounded-md text-2xl mx-auto my-4 p-3 text-purple-gray hover:-translate-y-1 duration-75  text-center">
              Get Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react'
import Navbar from '../components/navbar'

const Features = () => {
    return (
      <div className="flex flex-col w-full h-screen bg-purple-gray">
        <Navbar />
        <div className="md:flex-row flex flex-col items-center mx-auto mt-[100px] gap-2 w-full max-w-[45rem]">
          <div className="flex flex-col w-1/3 p-5 bg-white rounded-md gap-2">
            <p className="text-xl text-center font-bungee text-space-gray underline">
              Starter
            </p>
            <ul className="flex flex-col font-space-grotesk text-center">
              <li>Candle Countdown</li>
            </ul>
            <a href='/register' className="p-2 bg-white border-2 border-purple-gray rounded-md text-purple-gray text-md text-center hover:scale-105 duration-75">Get Started</a>
          </div>
          <div className="flex flex-col w-2/3 p-5 bg-white rounded-md gap-2">
            <p className="text-3xl text-center font-bungee text-space-gray underline">
              Day Trader
            </p>
            <ul className="flex flex-col font-space-grotesk text-center gap-4 text-2xl my-5">
              <li>Calendar Visualization</li>
              <li>Trade Entry</li>
              <li>Performance Review</li>
            </ul>
            <a href='/register' className="px-[40px] p-2 bg-purple-gray rounded-md text-magic-mint text-xl text-center hover:scale-105 duration-75 mx-auto">Get Started</a>
          </div>
        </div>
      </div>
    );
}

export default Features
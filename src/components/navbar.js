import { React, useState, useEffect } from "react";
import Menu from "../config/menu";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { useScrollPosition } from "../util/useScrollPosition";
import { Link } from "react-router-dom";
import moment from "moment";
// import Logo from "../assets/Logo";
import Logo from "../assets/flame.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({
    threeMins: "",
    fiveMins: "",
    fifthteenMins: "",
    thirtyMins: "",
    hour: "",
  });
  const scrollPosition = useScrollPosition();
  const { user, logOut, navigate } = UserAuth();
  const menu = user ? Menu.in : Menu.out;

  function refreshCandles() {
    // get current amount of seconds for Now()
    const seconds = Math.round(Date.now() / 1000);

    // desired timers in seconds
    const everyThree = 3 * 60;
    const everyFive = 5 * 60;
    const everyFifthteen = 15 * 60;
    const everyThirty = 30 * 60;
    const everyHour = 60 * 60;

    // get the next occurance of this timers
    const nextThree = everyThree * Math.ceil(seconds / everyThree);
    const nextFive = everyFive * Math.ceil(seconds / everyFive);
    const nextFifthteen = everyFifthteen * Math.ceil(seconds / everyFifthteen);
    const nextThirty = everyThirty * Math.ceil(seconds / everyThirty);
    const nextHour = everyHour * Math.ceil(seconds / everyHour);

    // get the time different from next occurance and Now()
    const threeLeft = nextThree - seconds;
    const fiveLeft = nextFive - seconds;
    const fifthteenLeft = nextFifthteen - seconds;
    const thirtyLeft = nextThirty - seconds;
    const hourLeft = nextHour - seconds;

    const threeTime = {
      mins: Math.floor(threeLeft / 60),
      secs: threeLeft % 60,
    };
    const fiveTime = {
      mins: Math.floor(fiveLeft / 60),
      secs: fiveLeft % 60,
    };
    const fifthteenTime = {
      mins: Math.floor(fifthteenLeft / 60),
      secs: fifthteenLeft % 60,
    };
    const thirtyTime = {
      mins: Math.floor(thirtyLeft / 60),
      secs: thirtyLeft % 60,
    };
    const hourTime = {
      mins: Math.floor(hourLeft / 60),
      secs: hourLeft % 60,
    };

    setTime({
      threeMins:
        ("0" + threeTime.mins).slice(-2) +
        ":" +
        ("0" + threeTime.secs).slice(-2),
      fiveMins:
        ("0" + fiveTime.mins).slice(-2) + ":" + ("0" + fiveTime.secs).slice(-2),
      fifthteenMins:
        ("0" + fifthteenTime.mins).slice(-2) +
        ":" +
        ("0" + fifthteenTime.secs).slice(-2),
      thirtyMins:
        ("0" + thirtyTime.mins).slice(-2) +
        ":" +
        ("0" + thirtyTime.secs).slice(-2),
      hour:
        ("0" + hourTime.mins).slice(-2) + ":" + ("0" + hourTime.secs).slice(-2),
    });
  }

  useEffect(() => {
    const timerId = setInterval(refreshCandles, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const handleClick = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // Root Nav
    <div className="flex w-full bg-purple-gray z-[5]">
      {/* Top or Desktop Nav */}
      <div className="flex w-full">
        <div className="flex justify-between w-full p-[15px] md:px-[50px] mx-auto">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex lg:text-3xl text-2xl font-bungee text-magic-mint items-center mr-5"
            >
              Stock Nitro
              <img
                alt="StockNitro Logo"
                className="h-[25px w-[25px] pb-2"
                src={Logo}
              />
            </Link>
            {menu.map((item) => (
              <Link
                key={item.anchor}
                to={item.url}
                className="md:flex hidden my-[5px] ml-[35px] overflow-hidden relative align-middle md:text-2xl text-xl font-space-grotesk text-white hover:underline underline-offset-8 decoration-4 hover:-translate-y-1 duration-75"
              >
                {item.anchor}
              </Link>
            ))}
          </div>
          <div
            id="candles"
            className="flex gap-16 justify-between items-center font-bungee"
          >
            <div className="flex flex-col items-center">
              <p className="text-2xl text-white font-bungee">3min </p>
              <p className="text-2xl text-white font-space-grotesk">{time?.threeMins}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl text-white font-bungee">5min </p>
              <p className="text-2xl text-white font-space-grotesk">{time?.fiveMins}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl text-white font-bungee">15min </p>
              <p className="text-2xl text-white font-space-grotesk">{time?.fifthteenMins}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl text-white font-bungee">30min </p>
              <p className="text-2xl text-white font-space-grotesk">{time?.thirtyMins}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl text-white font-bungee">1hr </p>
              <p className="text-2xl text-white font-space-grotesk">{time?.hour}</p>
            </div>
          </div>

          {user ? (
            <div className="flex gap-4 justify-between items-center font-space-grotesk">
              <p
                onClick={handleClick}
                className="md:flex hidden font-space-grotesk text-purple-gray bg-magic-mint md:text-2xl text-xl items-center py-[10px] px-[15px] rounded-lg cursor-pointer hover:underline underline-offset-4 decoration-1 hover:-translate-y-0.5 duration-75"
              >
                Sign out
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/signin"
                className="md:flex hidden font-space-grotesk text-purple-gray bg-magic-mint md:text-2xl text-xl items-center py-[10px] px-[15px] rounded-lg cursor-pointer hover:underline underline-offset-4 decoration-1 hover:-translate-y-0.5 duration-75"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="md:flex hidden font-space-grotesk text-purple-gray bg-magic-mint md:text-2xl text-xl items-center py-[10px] px-[15px] rounded-lg cursor-pointer hover:underline underline-offset-4 decoration-1 hover:-translate-y-0.5 duration-75"
              >
                Register
              </Link>
            </div>
          )}
          {open ? (
            <AiOutlineClose
              onClick={() => setOpen(false)}
              className="md:hidden cursor-pointer"
              color="#acfcd9"
              size={25}
            />
          ) : (
            <AiOutlineMenu
              onClick={() => setOpen(true)}
              className="md:hidden cursor-pointer"
              color="#acfcd9"
              size={25}
            />
          )}
        </div>
      </div>
      {/* <div className='absolute flex flex-col top-0 left-0 bg-purple-gray border border-r-magic-mint min-h-full max-w-[400px]'>
              <p className='text-white font-bold text-xl '>Stock Nitro</p>
      </div> */}
    </div>
  );
};

export default Navbar;

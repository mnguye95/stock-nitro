import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    name: "",
    email: "",
    starting: 0,
    current: 0
  });
  const { createUser, user, navigate, formatter } = UserAuth();

  function validate(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  useEffect(() => {
    if (user) {
      navigate("/journal");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    if (validate(details.email)) {
      e.preventDefault();
      setError("");
      try {
        await createUser(details.email, password, details);
        navigate("/");
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    } else {
      e.preventDefault();
      setError("Please enter a valid email");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-purple-gray">
      <Navbar />
        <div className='bg-contain bg-right bg-no-repeat bg-purple-gray'>
          <div className="w-full flex justify-center lg:max-w-[40em] mx-auto">
            {/* Left Section */}
            <div className="flex flex-col p-5 w-full gap-y-4 text-center py-12 my-12 md:bg-white rounded-md">
              <h1 className="lg:text-5xl md:text-2xl text-4xl md:text-purple-gray text-magic-mint font-bungee">
                Start 30-Day <br></br> Free Trial
              </h1>
              <p className="md:text-md text-xl md:text-purple-gray text-magic-mint font-space-grotesk">
                Perform your best with the best platform.
              </p>
              {error && (
                <p className="border-rose-600 bg-rose-200 text-rose-500 rounded-md p-2 mb-5 text-center">
                  {error}
                </p>
              )}
              <form
                onSubmit={handleSubmit}
                className="text-center md:px-20 px-10"
              >
                <div className="flex flex-col py-2">
                  <input
                    onChange={(e) =>
                      setDetails({ ...details, name: e.target.value })
                    }
                    className="border border-purple-gray rounded-md font-space-grotesk p-3 m-2"
                    type="text"
                    placeholder="Name"
                    required
                  />
                  <input
                    onChange={(e) => setDetails({ ...details, email: e.target.value})}
                    className="border border-purple-gray rounded-md font-space-grotesk p-3 m-2"
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-purple-gray rounded-md font-space-grotesk p-3 m-2"
                    type="password"
                    placeholder="Password * (Minimum: 8 characters)"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                  />
                  <input
                    onChange={(e) => setDetails({ ...details, current: e.target.value, starting: e.target.value})}
                    className="border border-purple-gray rounded-md font-space-grotesk p-3 m-2"
                    type="number"
                    placeholder="Starting Amount $"
                    required
                  />
                </div>
                {error && (
                  <p className="border-rose-600 bg-rose-200 text-rose-500 rounded-md p-3 m-2 text-center">
                    {error}
                  </p>
                )}
                <button
                  type="success"
                  className="bg-purple-gray font-space-grotesk font-[1000] w-1/2 rounded-md text-2xl mx-auto my-4 p-3 text-magic-mint hover:-translate-y-1 duration-75 border border-magic-mint"
                >
                  Register
                </button>
              </form>
              <p className="md:text-md text-lg md:text-purple-gray text-magic-mint font-space-grotesk ">
                Have an account?{" "}
                <Link to="/signin" className="md:text-purple-gray text-magic-mint font-bold hover:underline underline-offset-4 decoration-1 ">
                    Log in.
                </Link>
              </p>
            </div>
            {/* Right Section */}
            {/* <div className='flex p-5 w-1/2'>
            <img src=''/>
            <h3 className="text-lg md:text-xl md:text-purple-gray text-magic-mint font-space-grotesk">Something</h3>
          </div> */}
          </div>
        </div>
      </div>
  );
        }
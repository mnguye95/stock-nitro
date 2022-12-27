import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Demo() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Test123test");
  const [error, setError] = useState('')
  const { user, logIn, forgotPassword, navigate } = UserAuth();

  useEffect(() => {
    if (user) {
      navigate("/journal");
    }
    // eslint-disable-next-line
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/journal");
    } catch (er) {
      console.log(er.message);
      setError(er.message.split(":")[1]);
    }
  };
  return (
    <div className="flex flex-col w-full h-screen bg-purple-gray">
      <Navbar />
      <div className='bg-contain bg-right bg-no-repeat bg-purple-gray'>
        <div className="relative w-full flex justify-center pt-[50px] lg:max-w-[40em] mx-auto">
          {/* Left Section */}
          <div className="flex flex-col p-5 w-full gap-y-4 text-center py-12 md:bg-white rounded-md">
            <h1 className="lg:text-5xl md:text-2xl text-4xl md:text-purple-gray text-magic-mint font-bungee">
              Demo Sign In
            </h1>
            <p className="md:text-md text-xl md:text-purple-gray text-magic-mint font-space-grotesk">
              Please log with demo details.
            </p>
            <form
              onSubmit={handleSignIn}
              className="text-center md:px-20 px-10"
            >
              <div className="flex flex-col py-2">
                <input
                  className="border border-purple-gray rounded-md font-space-grotesk p-3 m-2"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                />
                <input
                  className="border border-purple-gray rounded-md font-space-grotesk p-3 m-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                />
              </div>
              {error && (
                <p className="border-rose-600 bg-rose-200 text-rose-500 rounded-md p-3 m-2 text-center">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="bg-purple-gray font-space-grotesk font-[1000] w-1/2 rounded-md text-2xl mx-auto my-4 p-3 text-magic-mint hover:-translate-y-1 duration-75 border border-magic-mint"
              >
                Sign In
              </button>
            </form>
            <p className="md:text-md text-lg md:text-purple-gray text-magic-mint font-space-grotesk ">
              Don't have an account?{" "}
              <Link to="/register" className="md:text-purple-gray text-magic-mint font-bold hover:underline underline-offset-4 decoration-1 ">
                  Create one.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

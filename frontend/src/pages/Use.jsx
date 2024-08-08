import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log("formData log", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/auth/signin', formData);
      const data = res.data;
      console.log("dataLogin===>", data);
      
      if (!data.success) {
        setError(data.message);
      } else {
        setError(null);
        navigate('/');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[90.1vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="w-[33vw] rounded-md p-4 bg-[rgba(255,255,255,0.79)]">
        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-center text-2xl">Login to your account</p>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          <div className="flex flex-col mt-3">
            <label htmlFor="email">Email</label>
            <input
              className="w-full h-12 mt-1 border border-slate-400 rounded-md"
              type="email" id="email" onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="password">Password</label>
            <input
              className="w-full h-12 mt-1 border border-slate-400 rounded-md"
              type="password" id="password" onChange={handleChange}
            />
          </div>
          <div className="mb-12 mt-4 text-center">
            <TERipple rippleColor="light" className="w-full">
              <button
                disabled={loading}
                className="inline-block w-full h-12 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out shadow-md focus:outline-none"
                type="submit"
                style={{
                  background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                }}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </TERipple>
            <Link to="/forgot-password" className="block mt-3 text-sm text-blue-500">Forgot password?</Link>
          </div>
          <div className="flex items-center justify-between pb-6">
            <p className="mb-0 mr-2">Create new account?</p>
            <Link to="/register">
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                >
                  Register
                </button>
              </TERipple>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

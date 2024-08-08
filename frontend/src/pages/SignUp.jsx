import { TERipple } from "tw-elements-react";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    })

  }

  // console.log("formData",formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/auth/signup', formData);
      const data = res.data;
      // console.log("data===>", data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  
  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48 mt-[-3vw]"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />

                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-4 text-center">Create to your account</p>

                      <div className="flex flex-col ">
                        <label>Username</label>
                        <input
                          className="w-[72vw] lg:w-[37vw] md:w-[60vw] xl:w-[37.5vw] h-12 mt-1 border border-slate-400 rounded-md"
                          type="text" id="username"
                          onChange={handleChange} />
                      </div>

                      <div className="flex flex-col mt-3">
                        <label>Email</label>
                        <input
                          className="w-[72vw] lg:w-[37vw] md:w-[60vw] xl:w-[37.5vw] h-12  mt-1 border border-slate-400 rounded-md"
                          type="email" id="email"
                          onChange={handleChange} />
                      </div>
                      <div className="flex flex-col mt-3">
                        <label>Password</label>
                        <input
                          className="w-[72vw] lg:w-[37vw] md:w-[60vw] xl:w-[37.5vw] h-12  mt-1 border border-slate-400 rounded-md"
                          type="password" id="password"
                          onChange={handleChange} />
                      </div>

                      <div className="mb-12 mt-3 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                          disabled={loading}
                            className="mb-3 inline-block h-12 w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            {loading ? "Loading..." : "sign Up"}
                          </button>
                          <OAuth/>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        
                        <Link>Forgot password?</Link>
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Already have an account?</p>
                        <Link to='/signin'>
                          <TERipple rippleColor="light">
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                              Login
                            </button>
                          </TERipple>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)
}

export default SignUp
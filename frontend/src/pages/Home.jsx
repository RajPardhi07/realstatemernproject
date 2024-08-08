import axios from "axios";
import { useEffect, useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {

  const [userListings, setUserListings] = useState([])
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {

    const handleShowListings = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/auth/listings/${currentUser?.user?._id}`)

        console.log("res get", res)
        setUserListings(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    handleShowListings();
  }, [])
  return (
    <div >

      <div className="w-full relative h-[90vh] flex ">

        <div className="w-[30%] ">

        </div>

        <div className="w-[50vw] flex flex-col gap-6 top-[20%] left-[17%] h-[45vh]  absolute">
          <div className="w-full top-[20%] flex left-[17%] shadow-lg h-[34vh]  ">
            <div className="w-[26%] text-black bg-white  h-full">

              <h3 className="absolute top-[32%] text-2xl left-[-9%] -rotate-90">SAHAND ESTATE</h3>
            </div>
            <div className="w-[74%] flex items-center justify-center h-full bg-white bg-opacity-50">

              <h1 className="text-[4.5vw] leading-[10vh] font-bold text-[#214B54]">
                DONT SETTLE <br /> FOR AVERAGE
              </h1>
            </div>

          </div>
          <div className="w-full flex items-center justify-center text-3xl text-white top-[20%] left-[17%] h-[10vh] bg-[#1A517A] ">
            View All
          </div>

        </div>

        <div className="w-[70%] bg-red-400">
          <img className="w-[100%] h-[90vh] " src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

        </div>
      </div>

      <div className="w-full relative mt-8  p-5">

        {userListings &&
          userListings.length > 0 &&
          <div className="flex gap-10">
            {userListings.map((listing) => (
              <div key={listing._id}
                className="border-2	 rounded-lg w-[28vw] h-[60vh] overflow-hidden flex flex-col justify-between gap-4">
                <Link to={`/listing/${listing._id}`}>
                  <img src={listing.imageUrls[0]} alt="listing"
                    className=" h-60 w-[28vw] object-cover" />


                </Link>


                <div className="flex px-2">
                  <Link
                    className="text-slate-700 text-2xl font-semibold flex-1"
                    to={`/listing/${listing._id}`}>
                    <p className="uppercase">{listing.name}</p>
                  </Link>
                  <div className="p-3 text-white rounded-lg  bg-[#1A517A]">

                    <p>$ {listing.regularPrice}</p>
                  </div>
                </div>
                <div className="flex items-center px-2 justify-between">
                  <div className="flex text-green-900 items-center gap-2">
                    <FaLocationPin  />
                    <p>{listing.address}</p>

                  </div>
                  <div className="w-24 h-10 text-black flex items-center
                   justify-center rounded-lg  bg-[#d0d2de]">

                  <p className="font-semibold uppercase">{listing.type}</p>
                  </div>

                </div>


                <p className="text-black p-2">{listing.description}</p>

              </div>
            ))}

          </div>
        }


      </div>

    </div>
  )
}

export default Home
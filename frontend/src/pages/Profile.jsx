import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { deleteUser, updateUserFailure, updateUserStart, updateUserSuccess, logout } from "../redux/user/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"


const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')


  // console.log("formData", formData)
  // console.log("currentUser", currentUser?.user?._id)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);




  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await axios.post(`http://localhost:3000/api/auth/update/${currentUser?.user?._id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = res.data;
      // console.log("data update", data);

      dispatch(updateUserSuccess(data));

    } catch (error) {
      dispatch(updateUserFailure(error.message));

    }
  }

  const deleteAccount = async () => {
    if (!currentUser?.user?._id) return;

    try {
      await dispatch(deleteUser(currentUser.user._id));

      dispatch(logout());
      navigate("/signin")

    } catch (error) {
      console.log("Failed to delete account", error)
    }

  };

  const Logout = () => {
    dispatch(logout(currentUser?.user?._id))
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false)
      const res = await axios.get(`http://localhost:3000/api/auth/listings/${currentUser?.user?._id}`)

      // console.log("res get", res)
      if (res.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(res.data);
    } catch (error) {
      setShowListingsError(true)
    }
  }

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/listing/deletelisting/${listingId}`)
      // console.log("res delete", res)
      // console.log("listingid", listingId)
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error)
    }
  }


  return (

    <>
      <div className="w-full ">

        <div style={{ backgroundImage: "url(https://images.unsplash.com/photo-1628744448839-170bf324f27e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}
          className="w-full bg-cover bg-center h-[30vh] bg-green-300">


        </div>

        <div className="flex items-center justify-around">
          <div className="w-[42vw]  h-[53vh] p-3">

            <div className="bg-[#5E60CD] rounded-lg p-2 h-full">


              <form onSubmit={handleSubmit}>
                <input onChange={(e) => setFile(e.target.files[0])} type="file" hidden ref={fileRef} accept="image/*" />

                {/* <img onClick={() => fileRef.current.click()} className="w-32 h-32 rounded-full" src={formData.avatar || currentUser?.avatar} alt="profile" /> */}
                <img className="w-32 h-32 object-cover  object-top rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

                <p>
                  {fileUploadError ? (
                    <span className="text-red-400">
                      Error Image Upload(image must be less than 4 mb)
                    </span>) : filePerc > 0 && filePerc < 100 ? (
                      <span>{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                      <span className="text-green-400">Image successfully uploaded!</span>
                    ) : (
                    ''
                  )
                  }
                </p>

                <div className="flex flex-col ml-36  -mt-24">
                  <label className="text-white " htmlFor="username">Username</label>

                  <input className="border w-[28vw] rounded-lg pl-2  h-11" type="text"
                    defaultValue={currentUser?.user?.username} id="username" onChange={handleChange} />
                </div>
                <div className="flex flex-col mt-1 ml-36">
                  <label className="text-white " htmlFor="email">Email</label>

                  <input className="border w-[28vw] rounded-lg pl-2 h-10" type="email" id="email" onChange={handleChange}
                    defaultValue={currentUser?.user?.email} />
                </div>
                <div className="flex flex-col mt-1 ml-36">
                  <label className="text-white " htmlFor="password">Password</label>

                  <input className="border w-[28vw] rounded-lg pl-2 h-10" type="password" id="password" onChange={handleChange}
                    defaultValue={currentUser.password} />
                </div>

                <button type="submit" className="bg-[#FF9A00] font-semibold mt-3 w-[28vw] rounded-lg pl-2 ml-36 text-white p-3 ">Update</button>

              </form>

            </div>
          </div>
          <div className="w-[42vw] mt-3 rounded-lg  h-[50vh] p-3 ">
            <button onClick={Logout} className="bg-[#AA7BFB] font-semibold rounded-lg text-xl text-white ml-3 p-5 mt-5 w-[36vw]  ">Sign Out</button>
            <Link to="/createlisting" >
            <button className="bg-[#C3D020] rounded-lg text-xl text-white ml-3 p-5 mt-5  w-[36vw]  ">

            Create Listing
            </button>
            </Link>
            <button onClick={deleteAccount} className="bg-[#98AE1B] rounded-lg text-xl text-white mt-3 ml-3 w-[36vw] p-5 ">Delete Account</button>
          </div>

        </div>

        <div className="w-full p-3">


          <button onClick={handleShowListings} className="text-white text-3xl font-semibold mt-6 h-[8vh] bg-black w-full">
            Show Listings</button>

          <p>
            {showListingsError ? "Error showing listing" : ''}
          </p>

          {userListings &&
            userListings.length > 0 &&
            <div className="flex flex-col gap-4">
              <h1 className="text-center text-black mt-3">Your Listings</h1>
              {userListings.map((listing) => (
                <div key={listing._id}
                  className="border bg-black rounded-lg p-3 flex justify-between items-center gap-4">
                  <Link to={`/listing/${listing._id}`}>
                    <img src={listing.imageUrls[0]} alt="listing"
                      className="h-20 w-20 object-contain" />


                  </Link>
                  <Link
                    className="text-white font-semibold flex-1"
                    to={`/listing/${listing._id}`}>
                    <p className="text-xl">{listing.name}</p>


                  </Link>
                  <div className="flex flex-col items-center">
                    <button onClick={() => handleDeleteListing(listing._id)} className="text-red-700 uppercase">Delete</button>
                    <Link to={`/updateListing/${listing._id}`} >
                      <button className="text-white uppercase">Edit</button>
                    </Link>
                  </div>

                </div>
              ))}

            </div>
          }

        </div>


      </div>

    </>
  )
}

export default Profile
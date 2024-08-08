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
      <div className="w-full h-[92.5vh] bg-red-300">

        <div className="w-full h-[30vh] bg-green-300">
          

        </div>

        <div className="w-[40vw]">

          <div className="bg-slate-300">
            <h1>Profile</h1>


            <form onSubmit={handleSubmit}>
              <input onChange={(e) => setFile(e.target.files[0])} type="file" hidden ref={fileRef} accept="image/*" />

              <img onClick={() => fileRef.current.click()} className="w-32 h-32 rounded-full" src={formData.avatar || currentUser?.avatar} alt="profile" />

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

              <div className="flex flex-col">
                <label className="text-black" htmlFor="username">Username</label>

                <input className="border" type="text"
                  defaultValue={currentUser?.user?.username} id="username" onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <label className="text-black" htmlFor="email">Email</label>

                <input className="border" type="email" id="email" onChange={handleChange}
                  defaultValue={currentUser?.user?.email} />
              </div>
              <div className="flex flex-col">
                <label className="text-black" htmlFor="password">Password</label>

                <input className="border" type="password" id="password" onChange={handleChange}
                  defaultValue={currentUser.password} />
              </div>

              <button type="submit" className="bg-green-500 text-white p-3 mt-3">Update</button>

            </form>

          </div>
        </div>
        <div>
          <button onClick={deleteAccount} className="bg-slate-400 ml-3 p-3 text-red-500">Delete Account</button>
          <button onClick={Logout} className="bg-slate-400 ml-3 p-3  text-red-500">Sign Out</button>
          <Link to="/createlisting" className="bg-slate-400 ml-3 p-3  text-red-500">Create Listing</Link>
        </div>

        <button onClick={handleShowListings} className="text-green-300 w-full">
          Show Listings</button>

        <p>
          {showListingsError ? "Error showing listing" : ''}
        </p>

        {userListings &&
          userListings.length > 0 &&
          <div className="flex flex-col gap-4">
            <h1>Your Listings</h1>
            {userListings.map((listing) => (
              <div key={listing._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4">
                <Link to={`/listing/${listing._id}`}>
                  <img src={listing.imageUrls[0]} alt="listing"
                    className="h-16 w-16 object-contain" />


                </Link>
                <Link
                  className="text-slate-700 font-semibold flex-1"
                  to={`/listing/${listing._id}`}>
                  <p>{listing.name}</p>


                </Link>
                <div className="flex flex-col items-center">
                  <button onClick={() => handleDeleteListing(listing._id)} className="text-red-700 uppercase">Delete</button>
                  <Link to={`/updateListing/${listing._id}`} >
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>

              </div>
            ))}

          </div>
        }

      </div>

    </>
  )
}

export default Profile
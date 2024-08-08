
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaShare } from "react-icons/fa6";
import { FaBath, FaBed, FaChair, FaParking } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';


const Listing = () => {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact , setContact] = useState(false);
    const params = useParams();

    const {currentUser } = useSelector((state) => state.user);

    // console.log(currentUser.user._id, listing.userRef)


    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                const data = await axios.get(`http://localhost:3000/api/listing/get/${params.listingId}`)
                // console.log("shivji", data);
                setListing(data.data.listing)
                setLoading(false)
                setError(false);
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchListing();
    }, [params.listingId]);
    return (
        <main className='relative'>
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && (
                <p className='text-center my-7 text-2xl'>Something went wrong!</p>
            )}

            {listing && !loading && !error && (
                <div>
                    <Swiper navigation>
                        {listing?.imageUrls?.map((url) => (
                            <SwiperSlide key={url}>
                                <div className='h-[550px]'
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: 'cover',
                                    }}>

                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className='fixed z-40 top-[15%] rounded-full cursor-pointer flex items-center justify-center w-10 h-10 right-[3%] bg-slate-100'>
                        <FaShare className='text-black'
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true)
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000)
                            }}
                        />
                    </div>
                    {copied && (
                        <p className='fixed top-[22%] text-black right-[3%] z-40 p-2 bg-white rounded-lg'>Link Copied</p>
                    )}

                    <div className='p-5'>

                        <div className='text-black gap-5 flex items-center ' >
                            <p>

                                {listing.name}
                            </p>
                            <p>
                                {listing.offer ? listing.discountPrice.toLocaleString("en-US") :
                                    listing.regularPrice.toLocaleString("en-US")}
                            </p>


                        </div>
                        <div className='text-green-800 flex items-center gap-2'>
                            <FaLocationDot />
                            <p>{listing.address}</p>

                        </div>
                        <div>
                            <ul className='text-green-900 font-semibold text-sm 
                        flex flex-wrap items-center sm:gap-6 gap-4'>

                                <li className='flex items-center gap-1 whitespace-nowrap'>
                                    <FaBed className='text-lg' />
                                    {
                                        listing.bedrooms > 1
                                            ? `${listing.bedrooms} beds`
                                            : `${listing.bedrooms} bed`
                                    }

                                </li>

                                <li className='flex items-center gap-1 whitespace-nowrap'>
                                    <FaBath className='text-lg' />
                                    {
                                        listing.bathrooms > 1
                                            ? `${listing.bathrooms} baths`
                                            : `${listing.bathrooms} bath`
                                    }
                                </li>

                                <li className='flex items-center gap-1 whitespace-nowrap'>
                                    <FaParking className='text-lg' />
                                    {listing.parking ? 'Parking spot' : 'No Parking'}
                                </li>

                                <li className='flex items-center gap-1 whitespace-nowrap'>
                                    <FaChair className='text-lg' />
                                    {listing.furnished ? "Furnished" : "Unfurnished"}

                                </li>

                            </ul>

                        </div>
                        <div className='flex gap-3 mt-4 mb-3'>
                            <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </p>
                            {listing.offer && (
                                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>

                                    ${+listing.regularPrice - +listing.discountPrice}
                                </p>
                            )}
                        </div>
                        <div className='text-black'>
                            <p>{listing.description}</p>
                        </div>

                        {currentUser && listing.userRef == currentUser.user._id && !contact && (
                            <button onClick={() => setContact(true)} className='bg-slate-700
                             text-white rounded-lg uppercase hover:opacity-95 p-3'>
                                Contact Landlord
                            </button>
                        )}
                    </div>
                        {contact && <Contact listing={listing}/>}
                </div>
            )}
        </main>
    )
}

export default Listing
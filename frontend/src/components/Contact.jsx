import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Contact = (listing) => {

    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/auth/${listing.userRef}`)
                // console.log("constact", res)
                setLandlord(res);
            } catch (error) {
                console.log(error)
            }

        }
        fetchLandlord()
    }, [listing.userRef])

    return (
        <>
            {
                landlord && (
                    <div>
                        <p>
                            Contact <span>{landlord.username}</span>{' '}
                            for{' '}
                            <span>{listing.name.toLowerCase()}</span>
                        </p>
                        <textarea className="w-full border p-3 rounded-lg"
                            value={message}
                            onChange={onChange}
                            placeholder="Enter your message here..." name="message" id="message">

                        </textarea>

                        <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-35'>
                            Send Message
                        </Link>
                    </div>
                )
            }

        </>
    )
}

export default Contact
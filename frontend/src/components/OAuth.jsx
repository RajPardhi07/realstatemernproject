import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
      
            const result = await signInWithPopup(auth, provider);
      
            const res = await fetch('http://localhost:3000/api/auth/google', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
              }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
          } catch (error) {
            console.log('could not sign in with google', error);
          }
    }
    return (
        <button onClick={handleGoogleClick} type="button"
            className="inline-block w-full h-12 rounded bg-blue-500 mt-3 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out shadow-md focus:outline-none"

        >CONTINUE WITH GOOGLE</button>
    )
}

export default OAuth
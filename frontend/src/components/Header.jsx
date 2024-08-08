import { Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div>

      <header className='h-[7.5vh]'>
        <div className='flex justify-between items-center  mx-auto '>
          <div className="w-[30%] h-[6.5vh] flex items-center justify-center bg-white">

            <Link to='/'>
              <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Sahand</span>
                <span className='text-slate-700'>Estate</span>
              </h1>
            </Link>
          </div>

          <div className="w-[70%] px-20 h-[7.5vh] flex items-center justify-between bg-slate-300">


            <form
              className='bg-slate-100  w-[30vw] p-3 rounded-lg flex items-center'
            >
              <input
                type='text'
                placeholder='Search...'
                className='bg-transparent focus:outline-none w-[30vw]'
              />
              <button>
                <FaSearch className='text-slate-600' />
              </button>
            </form>
            <ul className='flex gap-4'>
              <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                  Home
                </li>
              </Link>
              <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>
                  About
                </li>
              </Link>
              {/* <Link to='/profile'>
            
              <img
                className='rounded-full h-7 w-7 object-cover'
                src=""
                alt='profile'
              />
        
            
          </Link> */}
              <Link to='/profile'>

                {currentUser ? <img className='rounded-full h-9 w-9 object-cover object-top'
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  : <li className=' text-slate-700 hover:underline'> Sign Up</li>}


                {/* {currentUser ? <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              /> : <li className=' text-slate-700 hover:underline'> Sign Up</li>}
           */}

              </Link>
            </ul>
          </div>
        </div>

      </header>
    </div>
  )
}

export default Header
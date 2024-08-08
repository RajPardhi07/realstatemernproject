
const Home = () => {
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
    </div>
  )
}

export default Home
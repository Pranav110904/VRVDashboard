import React from 'react'

const Navbar = () => {
  return (
        <div className='h-max flex justify-between items-center py-[16px] px-[40px] font-raleway  bg-[#29292f] '>
                <img  className='rounded-[20px] w-[70px]' src='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732639496224x321187789423778000%2F1.png?w=96&h=96&auto=compress&dpr=1&fit=max'></img>
                <section className='flex gap-4 text-[14px]'>
                      <button type="submit" className="group relative inline-block w-[150px] h-12 overflow-hidden rounded-full text-[16px] text-black">
                      <div className="h-[inherit] w-[inherit] overflow-hidden rounded-full bg-[#bac3ff] [transition:_transform_1.5s_cubic-bezier(.19,1,.22,1)] group-hover:scale-[.94]">
                        <span className="absolute bottom-0 left-1/2 z-20 block h-[200%] w-[120%] -translate-x-0 translate-y-[100%] bg-[#ffffff] [border-radius:999px_999px_0_0] [translate:-50%] group-hover:translate-y-[10px] group-hover:[border-radius:60%_60%_0_0] group-hover:[transition:_transform_1s_cubic-bezier(.19,1,.22,1)_200ms,_border-radius_.2s_cubic-bezier(.19,1,.22,1)_270ms]" />
                        <span className="absolute bottom-0 left-1/2 z-20 block h-[200%] w-[120%] -translate-x-0 translate-y-[100%] bg-[#222c61] [border-radius:999px_999px_0_0] [translate:-50%] group-hover:translate-y-[10px] group-hover:[border-radius:60%_60%_0_0] group-hover:[transition:_transform_1s_cubic-bezier(.19,1,.22,1)_300ms,_border-radius_.2s_cubic-bezier(.19,1,.22,1)_470ms]" />
                        <span className="absolute bottom-0 left-1/2 z-20 block h-[200%] w-[120%] -translate-x-0 translate-y-[100%] bg-[#bac3ff] [border-radius:999px_999px_0_0] [translate:-50%] group-hover:translate-y-[10px] group-hover:[border-radius:60%_60%_0_0] group-hover:[transition:_transform_1s_cubic-bezier(.19,1,.22,1)_380ms,_border-radius_.2s_cubic-bezier(.19,1,.22,1)_670ms]" />
                      </div>
                      <span className="absolute inset-0 z-0 m-auto flex w-4/5 items-center justify-center text-[#222c61]   font-bold">
                        Dashboard
                      </span> 
                    </button> 
                    <h1 className='text-white px-[12px] py-[16px] font-semibold cursor-pointer'>Home</h1>
                    <h1 className='text-white px-[12px] py-[16px] font-semibold cursor-pointer'>Services</h1>
                    <h1 className='text-white px-[12px] py-[16px] font-semibold cursor-pointer'>Clients</h1>
                </section>
        </div>
    
  )
}

export default Navbar
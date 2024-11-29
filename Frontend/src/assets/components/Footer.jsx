import React from 'react'

const Footer = () => {
  return (
    <div className='h-max pt-[64px] pb-[108px] px-[40px] bg-[#29292f] '> 
        <div>
            <div className='flex gap-3 '>
            <img className='h-8  rounded-[10px]' src='https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F87ddfef3cf0a6037a59c6c202f802117.cdn.bubble.io%2Ff1732639496224x321187789423778000%2F1.png?w=96&h=96&auto=compress&dpr=1&fit=max'></img>
            <div className='text-white text-2xl font-bold font-raleway'>VRV Security</div>
            
            </div>
            <div className='px-12 pt-3 text-[#b2b2b2] text-[12px]'>© 2024 VRV Security</div>
        </div>
    </div>
  )
}

export default Footer
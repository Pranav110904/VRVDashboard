import React from 'react'
import RolesTable from '../../components/RolesTable'

const Roles = () => {
  return (
    <div className="h-[70%]"> {/* Ensure the parent div has height */}
      <section className="w-full h-full flex">
        <div className="w-full h-full rounded-lg bg-[#bac3ff]"><RolesTable/></div>
      </section>
    </div>
  )
}

export default Roles
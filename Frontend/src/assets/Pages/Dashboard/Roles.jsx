import React from 'react'
import RolesTable from '../../components/RolesTable'

const Roles = () => {
  return (
    <div className="h-max"> {/* Ensure the parent div has height */}
      <section className="w-full h-full flex">
        <div className="w-full h-full rounded-2xl bg-white"><RolesTable/></div>
      </section>
    </div>
  )
}

export default Roles
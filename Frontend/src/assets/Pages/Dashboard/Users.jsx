import React from 'react';
import TableDemo from '../../components/EnhancedTable';
import EnhancedTable from '../../components/EnhancedTable';


const Users = () => {
  return (
    <div className="h-[70%]"> 
      <section className="w-full h-full flex">
        <div className="w-full h-full rounded-lg bg-[#bac3ff]"><EnhancedTable/></div>
      </section>
    </div>
  );
};

export default Users;

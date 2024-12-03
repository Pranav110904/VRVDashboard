import React from 'react';
import TableDemo from '../../components/EnhancedTable';
import EnhancedTable from '../../components/EnhancedTable';


const Users = () => {
  return (
    <div className="h-max"> 
      <section className="w-full h-full flex">
        <div className="w-full h-full rounded-2xl bg-white"><EnhancedTable/></div>
      </section>
    </div>
  );
};

export default Users;

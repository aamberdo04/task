import React, { useState } from "react";
import AddProject from "./AddProject";

function Todo() {
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <div className=" p-8 pt-12 flex justify-center items-center gap-8 mb-8 w-full">
            <div className="flex items-center">
                <span className="font-bold text-2xl">To Do</span>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => setOpenPopup(true)}
            >
                Add New
            </button>

            {/* Pass isVisible and closePopUp correctly */}
            <AddProject isVisible={openPopup} closePopUp={() => setOpenPopup(false)} />
        </div>
    );
}

export default Todo;


// // Todo.jsx
// import React from 'react';

// export const Todo = () => {
//   return (
//     <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7
//      min-h-[550px] rounded x-1'>
//       Todo App 
//     <div className = 'flex items-center mt-7 gap-2'></div>
//     <div></div>
//     <div></div>

  
      
//     </div>
  
//   );
// };

// export default Todo; // You can keep this for compatibility, though it's unnecessary.

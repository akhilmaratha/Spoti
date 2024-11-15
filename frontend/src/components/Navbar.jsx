import React from 'react';

function NavItem({ icon, label, active = false }) {
  return (
    <button className={`flex items-center w-full py-2 px-4 rounded ${active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}>
      {icon}
      <span className="ml-4">{label}</span>
    </button>
  );
}

export default NavItem;
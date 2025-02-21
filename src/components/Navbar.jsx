import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 '>
        <div className='myconatiner flex justify-between items-center px-4 py-5 h-14'>

        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'> &lt;</span>

          <span>Pass</span><span className='text-green-700'>OP/&gt;
          </span>
          </div>
      <ul>
        <li className='flex gap-4 '>
            <a className='hover:font-bold' href='/'>Home</a>
            <a className='hover:font-bold' href='#'>About</a>
            <a className='hover:font-bold' href='#'>Contact</a>
        </li>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar

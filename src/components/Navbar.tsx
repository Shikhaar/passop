

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 backdrop-blur-md bg-slate-900/50 border-b border-slate-700/50 shadow-lg'>
      <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>

        <div className="logo font-bold text-white text-2xl tracking-tight cursor-pointer flex items-center gap-1">
          <span className='text-blue-500 text-3xl'>&lt;</span>
          <span>Pass</span><span className='text-blue-500'>OP/&gt;</span>
        </div>
        <ul className='flex gap-8 text-slate-300 font-medium'>
          <li>
            <a className='hover:text-blue-400 transition-colors duration-200' href='/'>Home</a>
          </li>
          <li>
            <a className='hover:text-blue-400 transition-colors duration-200' href='#'>About</a>
          </li>
          <li>
            <a className='hover:text-blue-400 transition-colors duration-200' href='#'>Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar



const Manager = () => {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      <div className="mx-auto bg-slate-50 myconatiner">
        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-700'> &lt;</span>

          <span>Pass</span><span className='text-green-700'>OP/&gt;
          </span>
        </h1>
        <p className='flex justify-center'>Your own password manager</p>
        <div className="text-white flex justify-center flex-col p-4">
          <input className='rounded-full bg-white' type="text" name="" id="" />
          <div className="flex justify-center">
            <input type="text" className='bg-white mt-2' />
            <input type="text" className='bg-white mt-2 ml-2' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager

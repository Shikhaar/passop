

const Manager = () => {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#020617] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="mycontainer mx-auto min-h-[85vh] mt-10">
        <h1 className='text-5xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-slate-200 bg-clip-text text-transparent mb-3'>
          <span className='text-blue-500'>&lt;</span>
          <span>Pass</span><span className='text-blue-500'>OP/&gt;</span>
        </h1>
        <p className='text-lg text-slate-400 text-center mb-12'>Your own digital vault.</p>

        <div className="flex flex-col p-4 w-full max-w-4xl mx-auto space-y-6">
          <div className='flex flex-col gap-8'>
            <div className='relative w-full'>
              <input
                className='w-full rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300'
                type="text"
                placeholder="Website URL"
              />
            </div>

            <div className="flex gap-6 w-full">
              <div className='relative w-full'>
                <input
                  type="text"
                  className='w-full rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300'
                  placeholder="Username"
                />
              </div>
              <div className='relative w-full'>
                <input
                  type="password"
                  className='w-full rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300'
                  placeholder="Password"
                />
              </div>
            </div>

            <button className='flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-8 py-3 w-fit mx-auto transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 active:translate-y-0'>
              <span>Add Password</span>
            </button>
          </div>

          <div className="passwords mt-16">
            <h2 className='font-bold text-2xl py-4 text-white border-b border-slate-800 mb-6'>Your Passwords</h2>
            <div className='text-slate-500 text-center py-10 bg-slate-900/30 rounded-2xl border border-slate-800/50 backdrop-blur-sm'>
              No passwords to show
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager

import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <main className='flex flex-col min-h-screen justify-center items-center'>
      <div className=' bg-colorPrimaryBg md:p-12 p-8 rounded shadow-lg text-black'>
        <h2 className='font-semibold text-3xl md:text-4xl '>Poolder transaction tracker</h2>
        <p className='opacity-80 pb-8'>Sign in to get started.</p>
        <AuthForm/>
      </div>
      
    </main>
  )
}

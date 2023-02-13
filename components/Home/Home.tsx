import Image from 'next/image';

const Home = () => {
  return (
     <main className="bg-gray-50 w-full h-screen pt-36 dark:bg-black">
        <div className="w-100 max-w-5xl mx-auto">
          <div className="flex flex-row gap-20 items-center justify-around">
            <div className="flex flex-col gap-1">
              <div className="text-blue-600 font-sans font-semibold text-6xl dark:text-gray-50">Felipe Gorostiaga</div>
              <div className="text-gray-600 font-sans font-regular text-2xl dark:text-gray-200">Sr. Software Engineer at Banco Galicia</div>
            </div>
            <Image className="object-cover rounded-2xl shadow-2xl" src={'/pfp.jpg'} height={190} width={190} alt='profile picture'/>
          </div>
        </div>
      </main>
  );
};

export default Home;

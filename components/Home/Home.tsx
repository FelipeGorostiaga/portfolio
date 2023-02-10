import Image from 'next/image';

const Home = () => {
  return (
     <main className="bg-black w-full h-screen pt-36">
        <div className="w-100 max-w-5xl mx-auto">
          <div className="flex flex-row gap-20 items-center">
            <div className="flex flex-col gap-1">
              <div className="font-sans font-semibold text-6xl text-gray-50">Felipe Gorostiaga</div>
              <div className="font-sans font-regular text-2xl text-gray-200">Sr. Software Engineer at Banco Galicia</div>
            </div>
            <Image className="object-cover rounded-2xl" src={'/pfp.jpg'} height={190} width={190} alt='profile picture'/>
          </div>
        </div>
      </main>
  );
};

export default Home;

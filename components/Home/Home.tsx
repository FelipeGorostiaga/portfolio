import Image from 'next/image';
import Navbar from '../Layout/Navbar/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
     {/* <main className="w-full h-full bg-black">
        <section className="">
          <div className="relative">
            <Image src="/pfp.jpg" alt="Profile picture" width={200} height={200} className="mb-5 object-cover aspect-square rounded-full"/>
             <Image src="/argentina.jpg" alt="Argentina flag" width={45} height={36} className="" />
          </div>
        </section>
        <div className="">
          <div className="font-bold text-xl">Felipe Gorostiaga</div>
          <div className="">Sr. Software Engineer at Banco Galicia</div>
        </div>
      </main>*/}
    </>
  );
};

export default Home;

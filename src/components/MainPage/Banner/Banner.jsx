import bg from "/assets/image 7.png";
import FindBanner from "./FindBanner";

const Banner = () => {
  return (
    <main
  className="w-full h-[670px] px-8 bg-cover bg-center relative flex flex-col items-center justify-start pt-46 relative w-full min-h-[600px] pb-40"
  style={{ backgroundImage: `url(${bg})` }}
>
  <div className="absolute inset-0 pointer-events-none" />

  <div className="relative text-white text-center">
    <h1 className="text-6xl font-bold">Mirage</h1>
    <p className="mt-4 text-2xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, fuga?</p>
  </div>

  <div className="flex bg-amber-300 w-full hover:bg-yellow-500 text-white  justify-center rounded-2xl p-4 text-2xl px-10 md:w-1/3 mt-6 transition-colors duration-300">
    All Tours
  </div>

  <FindBanner />
</main>
  );
};

export default Banner;

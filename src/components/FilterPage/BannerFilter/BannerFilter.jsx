import { motion } from 'motion/react';
import bg from "/assets/beautiful-japanese-forest-scene.jpg";

const BannerFilter = () => {
  return(
    <>
      <motion.main
        className="w-full h-140 bg-center bg-cover flex flex-col items-center justify-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Overlay for better text contrast */}
        <motion.div className="absolute inset-0 bg-black/30" />

        {/* Content container */}
        <motion.div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            View Beautiful World
          </h1>
          <h2 className="text-xl md:text-2xl text-amber-300 font-semibold drop-shadow-md">
            Explore stunning destinations around the globe
          </h2>
        </motion.div>
      </motion.main>
    </>
  )
}

export default BannerFilter
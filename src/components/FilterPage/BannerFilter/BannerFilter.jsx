import { motion } from 'motion/react';

const BannerFilter = () => {
  return(
    <>
      <motion.main
        className="w-full h-140 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <img
          src="/assets/hero-forest-1280.webp"
          srcSet="/assets/hero-forest-640.webp 640w, /assets/hero-forest-1280.webp 1280w, /assets/hero-forest-1920.webp 1920w"
          sizes="100vw"
          alt="Японский лесной пейзаж"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <motion.div className="absolute inset-0 bg-black/30" />

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
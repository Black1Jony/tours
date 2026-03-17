import { Suspense, lazy, useEffect, useState } from "react";

const FindBanner = lazy(() => import("./FindBanner"));

const Banner = () => {
  const [showFind, setShowFind] = useState(false);

  useEffect(() => {
    const cb = () => setShowFind(true);
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(cb, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(cb, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative w-full min-h-[600px] pb-40 px-8 flex flex-col items-center justify-start pt-46">
      <img
        src="/assets/hero-forest-1280.webp"
        srcSet="/assets/hero-forest-640.webp 640w, /assets/hero-forest-1280.webp 1280w, /assets/hero-forest-1920.webp 1920w"
        sizes="100vw"
        alt="Японский лесной пейзаж"
        fetchpriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative text-white text-center">
        <h1 className="text-6xl font-bold">Mirage</h1>
        <p className="mt-4 text-2xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, fuga?
        </p>
      </div>

      <div className="flex bg-amber-300 w-full hover:bg-yellow-500 text-white  justify-center rounded-2xl p-4 text-2xl px-10 md:w-1/3 mt-6 transition-colors duration-300">
        All Tours
      </div>

      {showFind ? (
        <Suspense fallback={null}>
          <FindBanner />
        </Suspense>
      ) : null}
    </main>
  );
};

export default Banner;

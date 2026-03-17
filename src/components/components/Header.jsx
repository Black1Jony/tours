import React, { Suspense, lazy, useState, useEffect } from "react";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import GlobeAltIcon from "@heroicons/react/24/solid/GlobeAltIcon";
import ShieldCheckIcon from "@heroicons/react/24/solid/ShieldCheckIcon";
import { useNavigate, Link } from "react-router";
import api from "../../api/api";

const HeaderMobileMenu = lazy(() => import("./HeaderMobileMenu"));

const Header = ({ isVisibility = true }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const secretKey = localStorage.getItem("secretKey");
    if (!secretKey) return;

    const checkAdmin = async () => {
      try {
        const { data } = await api.get(`/isAdmin?secretKey=${secretKey}`);
        setIsAdmin(data?.isAdmin === true);
      } catch (err) {
        console.warn("Admin check failed:", err);
      }
    };

    checkAdmin();
  }, []);

  const menuItems = [
    { key: "/", label: "Home" },
    { key: "/tours", label: "Tours" },
    { key: "/#about", label: "About Us" },
    { key: "/#reviews", label: "Reviews" },
  ];

  const headerClasses = [
    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b",
    scrolled || isVisibility
      ? "bg-blue-400/85 shadow-xl backdrop-blur-2xl"
      : "bg-transparent border-white/20",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-wrap items-center">
          <img
            src="/assets/photo_2026-01-08_12-50-51.jpg"
            alt="Mirage Travel logo"
            className="h-10 w-10 sm:h-12 sm:w-auto object-cover rounded-xl shadow-md"
            width={48}
            height={48}
          />
          <div className="ml-2 sm:ml-3">
            <div className="flex items-center text-xs sm:text-sm text-white tracking-wide">
              <GlobeAltIcon className="mr-1 w-4 h-4 text-blue-600" />
              Explore the world
            </div>
            <div className="text-sm sm:text-xl font-semibold text-white">
              Mirage Travel
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 mt-2 md:mt-0 w-full md:w-auto">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.key}
              className="text-sm sm:text-base text-white hover:text-gray-200 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Admin panel — отображаем только если isAdmin === true */}
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-sm sm:text-base font-medium
                         text-yellow-300 hover:text-yellow-100 transition-colors
                         border border-yellow-300/40 rounded-lg px-3 py-1
                         hover:bg-yellow-300/10"
            >
              <ShieldCheckIcon className="w-4 h-4" />
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white ml-auto"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>

        {/* Mobile Menu */}
        <Suspense fallback={null}>
          {mobileMenuOpen && (
            <HeaderMobileMenu
              isOpen={mobileMenuOpen}
              menuItems={menuItems}
              isAdmin={isAdmin}
              onNavigate={(key) => {
                navigate(key);
                setMobileMenuOpen(false);
              }}
            />
          )}
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
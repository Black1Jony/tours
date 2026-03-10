import React, { useState, useEffect } from "react";
import { Button, Menu } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  PhoneFilled,
  CompassOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import api from "../../api/api";
const Header = ({ isVisibility=true }) => {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isadmin = async () => {
      const key = localStorage.getItem('secretKey')

    }
  }, [])
  const menuItems = [
    { key: "/", label: "Home" },
    { key: "/tours", label: "Tours" },
    { key: "about", label: "About Us" },
    { key: "reviews", label: "Reviews" },
    { key: "contacts", label: "Contacts" },
  ];

  const contactWithUs = () => {
    window.open("https://t.me/Hightourism", "_blank");
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${
    isVisibility ? "bg-blue-400/85" : "border-white/20"
  } ${scrolled  ? "bg-blue-400/85 shadow-xl backdrop-blur-2xl" : isVisibility ? "bg-blue-400/85" : "bg-transparent"}`;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex flex-wrap items-center cursor-pointer">
          <img
            src="/assets/photo_2026-01-08_12-50-51.jpg"
            alt="Mirage"
            className="h-10 w-10 sm:h-12 sm:w-auto object-cover rounded-xl shadow-md"
          />
          <div className="ml-2 sm:ml-3">
            <div className="flex items-center text-xs sm:text-sm text-white tracking-wide">
              <CompassOutlined className="mr-1 text-blue-600" />
              Explore the world
            </div>
            <div className="text-sm sm:text-xl font-semibold text-white">
              Mirage Travel
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 mt-2 md:mt-0 w-full md:w-auto">
          {menuItems.map((item) => (
            <span
              key={item.key}
              className="text-white hover:text-blue-600 font-medium transition-colors cursor-pointer"
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </span>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <CloseOutlined className="text-xl" /> : <MenuOutlined className="text-xl" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`md:hidden w-full overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-[500px] opacity-100 backdrop-blur-2xl bg-white/10 py-2" : "max-h-0 opacity-0"
            }`}
        >
          <Menu mode="vertical" items={menuItems} className="border-none !bg-transparent text-white" />
          <div className="px-2 pb-2 flex flex-col space-y-2">
            <Button block type="text" className="text-white truncate">
              +996 703 123 324
            </Button>
            <Button
              block
              type="primary"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 border-none"
              onClick={contactWithUs}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
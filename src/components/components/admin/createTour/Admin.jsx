import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ViewTour from "../ViewTour";
import Orders from "../Orders";
import CreateTour from "./CreateTour";
const Admin = () => {
  const [activeTab, setActiveTab] = useState(0);

  const menuItems = [
    { name: "Туры", icon: "🌍" },
    { name: "Заказы", icon: "💳" },
    { name: "Создать тур", icon: "➕" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7FE] font-sans mt-[49px]">
      <aside className="w-72 bg-white p-6 shadow-sm flex flex-col">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-black text-blue-600 uppercase tracking-wider">
            Dashboard
          </h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`relative w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === index ? "text-blue-600" : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              {/* Фон активной кнопки (анимированный) */}
              {activeTab === index && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-blue-50 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8">
        <header className="mb-10 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {menuItems[activeTab].name}
          </h2>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-gray-500 border border-gray-100">
            Admin Mode
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[32px] p-8 shadow-xl shadow-blue-900/5 min-h-[70vh] border border-gray-50"
          >
            {activeTab === 0 && <ViewTour />}
            {activeTab === 1 && <Orders />}
            {activeTab === 2 && <CreateTour />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Admin;
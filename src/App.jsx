import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Main = lazy(() => import("./page/Main"));
const Tour = lazy(() => import("./page/Tour"));
const TourDetailsPage = lazy(() => import("./page/TourDetailsPage"));
import { useScrollToHash } from "../tools/useScrollToHash";
import AdminPage from "./page/AdminPage";
function App() {
  useScrollToHash();
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-gray-600">Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tours" element={<Tour />} />
        <Route path="/tour/:id" element={<TourDetailsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;

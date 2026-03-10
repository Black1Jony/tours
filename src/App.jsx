import { Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Tour from "./page/Tour";
import TourDetailsPage from "./page/TourDetailsPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/tours" element={<Tour/>}/>
      <Route path="/tour/:id" element={<TourDetailsPage/>}/>
    </Routes>
  );
}

export default App;

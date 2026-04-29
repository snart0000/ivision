import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
// import ProfilePage from "../pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/profile/:id" element={<ProfilePage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
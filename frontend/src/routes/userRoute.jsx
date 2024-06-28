import { Routes, Route } from "react-router-dom";
import UserHome from "../pages/user/UserHome";
import UserProfile from "../components/user/UserProfile";
import ProfileInfo from "../components/user/ProfileInfo";
const UserRoute = () => {
  return (
    <>
      <Routes>           
        <Route path="/home" element={<UserHome />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profileInfo" element={<ProfileInfo />} />
      </Routes>
    </>
  );
};

export default UserRoute;

import { Routes, Route } from "react-router-dom";
import UserHome from "../pages/user/UserHome";
import UserProfile from "../components/user/UserProfile";
import ProfileInfo from "../components/user/ProfileInfo";
import Navbar from "../components/main/Navbar";
import Footer from "../components/main/footer";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const user = useSelector((state) => state.persisted.user.user);

  return (
    <>

    <Navbar userInfo={user}/>
      <Routes>           
        <Route path="/home" element={<UserHome />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profileInfo" element={<ProfileInfo />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default UserRoute;

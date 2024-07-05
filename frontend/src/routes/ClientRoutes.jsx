import { Routes, Route } from "react-router-dom";
import ClientHome from "../pages/client/ClientHome";
import PostJobs from  "../pages/client/Addjob/PostJobs"
import Navbar from "../components/main/Navbar";
import Footer from "../components/main/footer";
import { useSelector } from "react-redux";
const ClientRoute = () => {
  const client = useSelector((state) => state.persisted.client.client);

  return (
    <>
    <Navbar userInfo={client}/>
  
      <Routes>     
      <Route path="/home" element={<ClientHome />} />      
      <Route path="/postJob" element={<PostJobs />} />      
      </Routes>
      <Footer/>
    </>
  );
};

export default ClientRoute;

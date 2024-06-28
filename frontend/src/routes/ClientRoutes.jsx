import { Routes, Route } from "react-router-dom";
import ClientHome from "../pages/client/ClientHome";

const ClientRoute = () => {
  return (
    <>
      <Routes>     
      <Route path="/home" element={<ClientHome />} />
       
      </Routes>
    </>
  );
};

export default ClientRoute;

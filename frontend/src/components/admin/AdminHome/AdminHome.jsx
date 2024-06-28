import "./AdminHomePage.scss";
import { useSelector } from "react-redux";


export default function AdminHomePage() {
  const admin = useSelector((state) => state.persisted.admin.admin);


  return (
    <div className="home-div">
      <div className="welcome-message">
        <h1>Welcome, {admin?.name ? admin.name : "Admin"}!</h1>
        <p>We hope you have a productive day!</p>
      </div>
    </div>
  );
}


      // <div className="btn-1">
      //   {/* <button>+ Add new</button> */}
      // </div>
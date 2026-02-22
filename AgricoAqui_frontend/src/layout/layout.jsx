// layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/navBar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main >
        <Outlet />
      </main>
     <Footer/>


    </>
  );
}

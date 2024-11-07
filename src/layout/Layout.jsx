import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";

const Layout = () => {
    return (
        <div className="">
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Layout;
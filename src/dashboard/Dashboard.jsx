import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className=" bg-gradient-to-b from-green-100 to-green-200">
      <div className="container mx-auto">
        <div className="flex gap-2 h-screen">
          <div className="overflow-y-auto">
            <Sidebar></Sidebar>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

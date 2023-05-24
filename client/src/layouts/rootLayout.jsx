import { Outlet } from "react-router-dom";

import SideNavigationBar from "@/components/SideNavigationBar";
import TopNavigationBar from "@/components/TopNavigationBar";

export default function RootLayout() {
  return (
    <div>
      <TopNavigationBar />

      <div className="flex">
        <SideNavigationBar />
        <Outlet />
      </div>
    </div>
  );
}

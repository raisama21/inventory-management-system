import SideNavigationBar from "@/components/SideNavigationBar";
import TopNavigationBar from "@/components/TopNavigationBar";

export default function Layout({ children }) {
  return (
    <div>
      <TopNavigationBar />
      <div className="flex">
        <SideNavigationBar />
        {children}
      </div>
    </div>
  );
}

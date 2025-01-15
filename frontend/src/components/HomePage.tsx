import SideBar from "./ui/SideBar";
import Body from "./ui/Body";

export default function HomePage() {
  return (
    <div className="flex min-h-screen gap-8 bg-gray-50">
      <div className="p-6 border-r-2 border-gray-100">
        <SideBar />
      </div>
      <div className="flex-1">
        <Body />
      </div>
    </div>
  );
}

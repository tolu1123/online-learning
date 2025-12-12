import Header from "./Header"
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AppLayout() {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  )
}

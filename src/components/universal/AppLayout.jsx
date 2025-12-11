import Header from "./Header"
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  )
}

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileMenu({ isLanding }) {
  const location = useLocation();
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Resources",
      href: "/resources",
      icon: FileText,
    },
    {
      name: "Requests",
      href: "/requests",
      icon: Users,
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label='Button to display the Mobile Navbar'
          variant='ghost'
          className='hover:bg-transparent'
        >
          <Menu size={"2em"} className='text-black' />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col justify-between'>
        <SheetHeader className='sr-only'>
          <SheetTitle>Mobile Sidebar</SheetTitle>
          <SheetDescription>Mobile Sidebar for on page links</SheetDescription>
        </SheetHeader>
        <nav className='px-5 mt-20 flex flex-col gap-y-4 text-[#333] font-worksans font-medium text-base'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900",
                  isActive ? "text-gray-900" : "text-gray-500"
                )}
              >
                <item.icon className='h-4 w-4' />
                {item.name}
              </Link>
            );
          })}

          {!isLanding && (
            <>
              <Link
                to='/notifications'
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900",
                  location.href == "/notifications"
                    ? "text-gray-900"
                    : "text-gray-500"
                )}
              >
                <Bell className='h-4 w-4' />
                Notifications
              </Link>
              <Link
                to='/profile'
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900",
                  location.href == "/profile"
                    ? "text-gray-900"
                    : "text-gray-500"
                )}
              >
                <User className='h-4 w-4' />
                Profile
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

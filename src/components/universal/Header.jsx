import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  BookOpen,
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  User,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/universal/MobileMenu";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false)
  const isLanding = location.pathname === "/";
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
    <header className='sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-8'>
          <Link
            to='/'
            className='flex items-center gap-2 font-bold text-xl text-gray-900'
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white'>
              <BookOpen className='h-5 w-5' />
            </div>
            <span>PeerLearn</span>
          </Link>
        </div>

        {!isLanding && (
          <nav className='hidden md:flex items-center gap-6'>
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
          </nav>
        )}

        <div className='flex items-center gap-4'>
          {isLanding ? (
            <>
              <Link to='/login'>
                <Button variant='ghost'>Log in</Button>
              </Link>
              <Link to='/signup'>
                <Button>Sign up</Button>
              </Link>
            </>
          ) : (
            <div className='hidden md:contents'>
              <Button asChild variant='ghost' size='icon' className='text-gray-500'>
                <Link to="/notifications">
                  <Bell className='h-5 w-5' />
                </Link>
              </Button>
              <Link to='/profile'>
                <div className='flex items-center gap-2 pl-2'>
                  <div className='h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200'>
                    <User className='h-4 w-4 text-gray-600' />
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>

        {!isLanding && (
          <div className='md:hidden'>
            <MobileMenu isLanding={isLanding} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
          </div>
        )}
      </div>
    </header>
  );
}

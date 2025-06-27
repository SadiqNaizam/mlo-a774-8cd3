import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="fixed top-0 right-0 z-10 flex h-16 w-full items-center gap-4 border-b bg-background px-6 sm:left-64 sm:w-[calc(100%-16rem)]">
      {/* Mobile-first: Full-width logo and menu for small screens */}
      <div className="flex w-full items-center justify-between sm:justify-end">
        <Link to="/" className="flex items-center gap-2 font-semibold sm:hidden">
          <Package className="h-6 w-6 text-primary" />
          <span className="">CommerceVista</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="User avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
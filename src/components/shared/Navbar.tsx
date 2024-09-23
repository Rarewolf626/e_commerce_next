"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CartSheetContent from "@/components/cartSheet/CartSheet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import useLoginStore from "../hooks/useLoginStore";
import { logout } from "@/redux/slices/auth.slice";
import { removeAccessTokenFromLocalStorage } from "@/helperUtils/localstorage";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const { onOpen } = useLoginStore();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.auth?.token);

  const handleLoginModal = () => {
    onOpen();
  };

  const handleLogout = () => {
    dispatch(logout());
    removeAccessTokenFromLocalStorage();
  };

  return (
    <main>
      <header className=" w-full border-b bg-white ">
        <div className="container mx-auto flex h-14 items-center">
          {/* logo  */}
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                GadgetZone
              </span>
            </Link>
          </div>
          {/* logo  */}
          {/* mobile nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="flex items-center py-2">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  <span className="font-bold">GadgetZone</span>
                </Link>
                <Link href="/categories">Categories</Link>
                <Link href="/deals">Deals</Link>
                <Link href="/support">Support</Link>
              </nav>
            </SheetContent>
          </Sheet>
          {/* mobile nav */}
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            {/* cart sheet */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Open cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black/90 dark:bg-black/90 text-[10px] dark:text-white text-white">
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <CartSheetContent />
            </Sheet>
            {/* cart sheet */}
            {/* authenticate user show user profile otherwise login button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button size={"sm"} onClick={handleLoginModal}>
                  Login
                </Button>
              </>
            )}
            {/* authenticate user show user profile otherwise login button */}
          </div>
        </div>
      </header>
    </main>
  );
}

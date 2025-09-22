"use client";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useBasketStore } from "@/store/store";
import { getItemKey } from "sanity";

const Navbar = () => {
  const { user } = useUser();
  const [isNavVisible, setIsNavVisible] = useState(false);
  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  // const createClerkPasskey = async () => {
  //   try {
  //     const res = await user?.createPasskey();
  //     console.log(res);
  //   } catch (err) {
  //     console.error("Error", JSON.stringify(err, null, 2));
  //   }
  // };

  return (
    <nav
      className="flex justify-between items-center py-2 px-4 bg-[#131313] 
    lg:px-20"
    >
      <div className="">
        <Link href="/" className="text-[1.5rem] text-white">
          Store
        </Link>
      </div>

      {/* search */}
      <Form action="/search">
        <div
          className="flex relative items-center justify-between bg-slate-200 px-1 py-[.2rem] md:px-4 lg:py-[.3rem] rounded-sm text-gray-700 border-[1px] border-gray-200 
            "
        >
          <input className="bg-transparent text-[.9rem] lg:text-[1rem] w-[200px] md:w-[300px]
          lg:w-[500px]" type="text" name="query" placeholder="search products" />

          <button type="submit" className="absolute right-2 md:inset-0 md:relative">
            <CiSearch size={20} className="font-bold" />
          </button>
        </div>
      </Form>

      <button onClick={() => setIsNavVisible(!isNavVisible)} className="menu lg:hidden flex flex-col gap-[4px]">
        <div className="h-[2px] w-[30px] rounded-md bg-[silver]"></div>
        <div className="h-[2px] w-[30px] rounded-md bg-[silver]"></div>
        <div className="h-[2px] w-[30px] rounded-md bg-[silver]"></div>
      </button>

      <div className={`${isNavVisible ? "absolute" : "hidden"} flex flex-col gap-2 bg-[#131313] right-4 top-14 p-4 w-[200px] rounded-sm z-10
        lg:flex-row lg:relative lg:flex lg:inset-0 lg:bg-transparent lg:p-0 justify-between lg:items-center 
        
        ${user ? "lg:w-[40%]" : "lg:w-[20%]"}`}>
        <Link
          href="/cart"
          onClick={() => setIsNavVisible(false)}
          className="relative bg-blue text-white py-2 px-4 text-[.9rem] rounded-lg flex items-center justify-between w-full "
        >
          <span
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1"
          >{itemCount}</span>
          My Cart
          <TrolleyIcon className="font-bold ml-2 text-[1.2rem]" />
        </Link>

        {/* user area*/}
        <ClerkLoaded>
          <SignedIn>
            <Link
              href="/orders"
              onClick={() => setIsNavVisible(false)}
              className="bg-blue text-white py-2 px-4 text-[.9rem] rounded-lg flex items-center w-full justify-between"
            >
              My Orders
              <PackageIcon className="font-bold ml-2 text-[1.2rem]" />
            </Link>
          </SignedIn>

          {/* user  */}
          {user ? (
            <div className="flex items-center space-x-2">
              <div
              // onClick={() => setIsNavVisible(false)}
              >
                <UserButton />
              </div>

              <div className="lg:block lg:min-w-[100px]">
                <p className="text-gray-400 text-[.9rem]">Welcome back!</p>
                <p className="text-gray-400 text-[.9rem]">{user.fullName}</p>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <SignInButton mode="modal"
                className="flex lg:ml-3 rounded-lg py-2 w-full justify-center items-center bg-slate-800 text-white"
              />
            </div>
          )}
        </ClerkLoaded>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import {cx} from "class-variance-authority";
import Link from "next/link";
import {memo, useCallback, useState} from "react";

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);


  const handleOnMouseEnter = useCallback(() => {
      setIsOpen(true);
  }, []);


  const handleOnMouseLeave = useCallback(() => {
      setIsOpen(false);
    }, []);


  return (
    <nav className={cx("h-full transition-all ease-in-out duration-200 ml-4 my-4", {
      "w-82": isOpen,
      "w-12": !isOpen,
    })} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      <ul>
        <li>
          <Link href="/" className="block text-gray-700 hover:bg-gray-200 transition-colors">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default memo(SideNav);
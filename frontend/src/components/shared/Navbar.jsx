import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold ">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex font-medium items-center gap-12">
          <ul className="flex font-medium gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          {/* <li><Link>Home</Link></li>
        <li><Link>Jobs</Link></li>
        <li><Link>Browse</Link></li> */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
              <Button
                variant="outline"
                className="
                cursor-pointer
                border-gray-300
                px-5
                py-2
                rounded-lg
                font-medium
                transition-all
                duration-300
                hover:bg-gray-100
                hover:border-[#F83002]
                hover:text-[#F83002]
                hover:scale-105
                active:scale-95
              "
              >
                Login
              </Button>
              </Link>

              <Link to="/signup">
              <Button
                className="
                cursor-pointer
                bg-[#F83002]
                text-white
                px-5
                py-2
                rounded-lg
                font-medium
                transition-all
                duration-300
                hover:bg-[#d92c02]
                hover:shadow-lg
                hover:shadow-orange-200
                hover:scale-105
                active:scale-95
              "
              >
                Sign Up
              </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-gray-200 hover:border-[#F83002] transition-all duration-300">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-4">
                {/* User Info */}
                <div className="flex items-start gap-4 border-b pb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold text-base">Ayush Mern</h4>

                    <p className="text-sm text-muted-foreground">
                      Full Stack Developer
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col mt-4 gap-1">
                  <Button
                    variant="ghost"
                    className="
                    justify-start gap-2 cursor-pointer
                    transition-all duration-200
                    hover:bg-gray-100
                    hover:translate-x-1
                    hover:text-[#f80202]
                  "
                  >
                    <User2
                      size={18}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                    View Profile
                  </Button>

                  <Button
                    variant="ghost"
                    className="
                    justify-start gap-2 cursor-pointer
                    text-red-500
                    transition-all duration-200
                    hover:bg-red-50
                    hover:text-brown-600
                    hover:translate-x-1
                  "
                  >
                    <LogOut
                      size={18}
                      className="transition-transform duration-200"
                    />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

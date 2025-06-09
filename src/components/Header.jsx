import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Home, Search, Bell, Settings, User, LogOut, Rocket } from "lucide-react";

export default function Header({ active = "dashboard", user }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef();
  const notifRef = useRef();
  const [search, setSearch] = useState("");

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    if (dropdownOpen || notifOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen, notifOpen]);

  const navItems = [
    { label: "Dashboard", icon: <Home className="h-4 w-4 mr-2 text-primary-800" />, path: "/dashboard", key: "dashboard" },
  ];

  const initials = (user?.fullName || user?.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Custom icon button style
  const iconBtn =
    "rounded-full bg-white text-primary-800 shadow border border-primary-200 p-2 transition-colors hover:bg-primary-50 hover:text-primary-900 focus:bg-primary-50 focus:text-primary-900 focus:outline-none";

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
            <Rocket className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">theColeb</span>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Button
              key="dashboard"
              variant="ghost"
              className={`font-semibold transition-colors px-5 py-2 rounded-lg shadow-sm
                ${active === "dashboard"
                  ? "bg-primary-600 text-white scale-105 shadow-md"
                  : "bg-white text-primary-700 hover:bg-primary-50 hover:text-primary-900 hover:scale-105"}
              `}
              onClick={() => navigate("/dashboard")}
              disabled={active === "dashboard"}
              aria-label="Dashboard"
              style={{ transition: 'all 0.15s cubic-bezier(.4,0,.2,1)' }}
            >
              <Home className={`h-4 w-4 mr-2 ${active === "dashboard" ? "text-white" : "text-primary-700"}`} />
              Dashboard
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-300 pointer-events-none transition-colors" aria-label="Search" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search co-founders..."
              className="pl-11 pr-10 w-64 h-11 rounded-full border border-primary-200 bg-white text-primary-900 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all placeholder:text-primary-300"
              aria-label="Search co-founders"
            />
            {search && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-700 focus:outline-none"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                tabIndex={0}
              >
                ×
              </button>
            )}
          </div>
          <div ref={notifRef} className="relative group">
            <button
              className="rounded-full bg-white text-primary-800 shadow border border-primary-200 p-2 transition-all hover:bg-primary-50 hover:text-primary-900 hover:scale-105 focus:bg-primary-50 focus:text-primary-900 focus:scale-105 focus:outline-none"
              aria-label="Notifications"
              onClick={() => setNotifOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={notifOpen}
            >
              <Bell className="h-5 w-5" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-primary-200 rounded-lg shadow-xl z-50 animate-fade-in p-4 text-center text-primary-800">
                <span className="block py-2">No notifications yet.</span>
              </div>
            )}
          </div>
          <div ref={dropdownRef} className="relative group">
            <button
              tabIndex={0}
              className={"rounded-full bg-white text-primary-800 shadow border border-primary-200 p-2 flex items-center justify-center w-11 h-11 ml-1 transition-all hover:bg-primary-50 hover:text-primary-900 hover:scale-105 focus:bg-primary-50 focus:text-primary-900 focus:scale-105 focus:outline-none"}
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="User menu"
            >
              <Avatar className="w-9 h-9 border-2 border-primary-300 shadow bg-primary-200">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-primary-800 bg-primary-200 border border-primary-300">{initials}</AvatarFallback>
              </Avatar>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-primary-200 rounded-lg shadow-xl z-50 animate-fade-in">
                <button
                  className="w-full flex items-center px-5 py-3 text-primary-800 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none transition-colors text-base"
                  onClick={() => { setDropdownOpen(false); navigate("/profile"); }}
                  tabIndex={0}
                  aria-label="Profile"
                >
                  <User className="h-4 w-4 mr-2 text-primary-800" /> Profile
                </button>
                <button
                  className="w-full flex items-center px-5 py-3 text-primary-800 hover:bg-primary-50 focus:bg-primary-50 focus:outline-none transition-colors text-base"
                  onClick={() => { setDropdownOpen(false); localStorage.removeItem("token"); navigate("/login"); }}
                  tabIndex={0}
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4 mr-2 text-primary-800" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 
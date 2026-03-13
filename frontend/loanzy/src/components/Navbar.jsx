import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Wallet, LayoutDashboard, User } from "lucide-react";
import { isAuthenticated, getUserRole } from "../utils/auth";
import toast from "react-hot-toast";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-white to-neutral-400 flex items-center justify-center text-black">
            <Wallet size={18} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
            Loanzy
          </span>
        </Link>

        {}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Home
          </Link>
          <a
            href="/#solutions"
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            Solutions
          </a>
          <Link
            to="/about"
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            About
          </Link>
        </div>

        {}
        <div className="flex items-center gap-4">
          {isAuthenticated() ? (
            <>
              <Link
                to={getUserRole() === 'ADMIN' ? "/admin" : "/dashboard"}
                className="text-sm font-medium text-white hover:text-neutral-300 transition-colors bg-white/10 px-4 py-2 rounded-full"
              >
                {getUserRole() === 'ADMIN' ? "Admin Panel" : "Dashboard"}
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  toast.success("Logged out successfully");
                  navigate("/");
                }}
                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-white hover:text-neutral-300 transition-colors"
              >
                Sign In
              </Link>
              <button
                onClick={() => navigate("/apply")}
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-all transform hover:scale-105"
              >
                Apply Now
                <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

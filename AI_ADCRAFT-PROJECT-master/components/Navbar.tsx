"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, Menu, X, Sparkles, LayoutTemplate, Home, Rocket, HelpCircle, Info, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in - this runs on every mount and when user updates
    const checkUser = () => {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (userData && token) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    
    // Listen for user updates (login/logout)
    window.addEventListener("userUpdated", checkUser);
    window.addEventListener("storage", checkUser); // For cross-tab updates
    
    return () => {
      window.removeEventListener("userUpdated", checkUser);
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  useEffect(() => {
    // Close user menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.user-menu-container')) {
          setIsUserMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsUserMenuOpen(false);
    // Trigger custom event for same-tab updates
    window.dispatchEvent(new Event("userUpdated"));
    toast.success("Logged out successfully");
    router.push("/");
  };

  const isActive = (path: string) => pathname === path;

  const updateAvatar = (avatar: string) => {
    if (!user) return;
    const updatedUser = { ...user, avatar };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Update stored users list if exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) =>
      u.email === user.email ? { ...u, avatar } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Profile photo updated");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      updateAvatar(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-primary/20 bg-gradient-to-r from-dark-bg/95 via-dark-bg/90 to-dark-bg/95 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-primary/10"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="gradient-text">Ad-Vision AI</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive("/")
                  ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 shadow-lg shadow-primary/20"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/launch"
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive("/launch")
                  ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 shadow-lg shadow-primary/20"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Rocket className="w-4 h-4" />
              Launch
            </Link>
            <Link
              href="/templates"
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive("/templates")
                  ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 shadow-lg shadow-primary/20"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <LayoutTemplate className="w-4 h-4" />
              Templates
            </Link>
            <Link
              href="/features"
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive("/features")
                  ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 shadow-lg shadow-primary/20"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Features
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive("/about")
                  ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 shadow-lg shadow-primary/20"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Info className="w-4 h-4" />
              About
            </Link>
            <Link
              href="/pricing"
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                isActive("/pricing")
                  ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 shadow-lg shadow-primary/20"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Pricing
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  isActive("/dashboard")
                    ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30 shadow-lg shadow-primary/20"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                Dashboard
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-dark-card border border-white/10 rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Change Photo
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold hover:from-primary/90 hover:to-emerald-500/90 transition-all shadow-lg shadow-primary/30"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/20 bg-dark-bg/95">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                  isActive("/")
                    ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                href="/launch"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                  isActive("/launch")
                    ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Rocket className="w-4 h-4" />
                Launch
              </Link>
              <Link
                href="/templates"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                  isActive("/templates")
                    ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <LayoutTemplate className="w-4 h-4" />
                Templates
              </Link>
              <Link
                href="/features"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                  isActive("/features")
                    ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Features
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                  isActive("/about")
                    ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all ${
                  isActive("/pricing")
                    ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Pricing
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${
                    isActive("/dashboard")
                      ? "text-white bg-gradient-to-r from-primary/20 to-emerald-500/20 border border-primary/30"
                      : "text-gray-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Dashboard
                </Link>
              )}
              {user ? (
                <>
                  <div className="px-3 py-2 border-t border-white/10 mt-2">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-lg text-left text-gray-300 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-primary/20">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-center font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-center bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold hover:from-primary/90 hover:to-emerald-500/90 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}


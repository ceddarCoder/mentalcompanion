
"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import { Menu, Home, MessageCircle, Heart, Calendar, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fabMenuItems = [
    {
      href: "/dashboard/home",
      icon: <Home className="w-5 h-5 mr-2 text-primary" />,
      label: "Home",
      className: "hover:bg-primary/10"
    },
    {
      href: "/dashboard/wellness",
      icon: <Heart className="w-5 h-5 mr-2 text-primary" />,
      label: "Wellness Check",
      className: "hover:bg-primary/10"
    },
    {
      href: "/dashboard/chat",
      icon: <MessageCircle className="w-5 h-5 mr-2 text-primary" />,
      label: "Your Companion",
      className: "hover:bg-primary/10"
    },
    {
      href: "/dashboard/journal",
      icon: <Calendar className="w-5 h-5 mr-2 text-primary" />,
      label: "Journal",
      className: "hover:bg-primary/10"
    },
    {
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5 mr-2 text-primary" />,
      label: "Settings",
      className: "hover:bg-primary/10"
    }
  ];

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar
          onSignOut={handleSignOut}
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div
  className={cn(
    "flex-1 min-w-0",
    "lg:ml-64", // Default margin for expanded sidebar
    {
      "lg:ml-16": isSidebarCollapsed, // Collapsed margin
    }
  )}
>
  <main className="w-full h-full px-4 lg:px-6 py-4 overflow-x-auto ">
    {children}
  </main>
</div>

      {/* FAB Menu - Visible only on mobile */}
      <div className="fixed bottom-20 right-6 z-50 lg:hidden">
        <button
          onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
          className="bg-primary text-primary-foreground w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <AnimatePresence>
          {isFabMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-lg w-56 p-2"
            >
              {fabMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm text-foreground rounded-lg transition-colors",
                    item.className,
                    pathname === item.href && "bg-primary/5"
                  )}
                  onClick={() => setIsFabMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsFabMenuOpen(false);
                  handleSignOut();
                }}
                className="flex items-center w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardLayout;
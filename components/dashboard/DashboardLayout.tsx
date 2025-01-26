"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { Home, MessageCircle, BookOpen, Settings, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground"> {/* Use global background and text colors */}
      {/* Desktop Navigation */}
      <Sidebar
        onSignOut={handleSignOut}
        className="hidden lg:flex lg:fixed lg:inset-y-0"
      />

      {/* Main Content with animation */}
      <motion.div
        className="lg:pl-64"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <main className={cn(
          "py-6 px-4 sm:px-6 lg:px-8",
          pathname === '/dashboard/chat' && "py-0 px-0" // Remove padding for the chat page
        )}>
          {children}
        </main>
      </motion.div>

      {/* Floating Action Button (Visible only on mobile) */}
      <div className="fixed bottom-20 right-6 z-50 lg:hidden">
        <button
          onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
          className="bg-primary text-primary-foreground w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* FAB Menu */}
        {isFabMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-lg w-56 p-2"
          >
            <Link
              href="/dashboard/home"
              className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 mr-2 text-primary" />
              Home
            </Link>
            <Link
              href="/dashboard/chat"
              className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2 text-secondary" />
              Chat
            </Link>
            <Link
              href="/dashboard/journal"
              className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors"
            >
              <BookOpen className="w-5 h-5 mr-2 text-accent" />
              Journal
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 mr-2 text-secondary" />
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2 text-destructive" />
              Sign Out
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
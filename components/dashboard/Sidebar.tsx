"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Heart,
  MessageCircle,
  Calendar,
  BookOpen,
  Activity,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  description?: string;
}

const navItems: NavItem[] = [
  {
    icon: <Home className="w-5 h-5" />,
    label: 'Home',
    href: '/dashboard/home',
    description: 'Your personal wellness space'
  },
  {
    icon: <Heart className="w-5 h-5" />,
    label: 'Wellness Check',
    href: '/dashboard/wellness',
    description: 'AI-powered mood analysis'
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'Your Companion',
    href: '/dashboard/chat',
    description: 'Talk with our AI companion'
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: 'Journal',
    href: '/dashboard/journal',
    description: 'Track your journey'
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: 'Resources',
    href: '/dashboard/resources',
    description: 'Mental health education'
  },
  {
    icon: <Activity className="w-5 h-5" />,
    label: 'Progress',
    href: '/dashboard/progress',
    description: 'View your growth'
  }
];

interface SidebarProps {
  onSignOut: () => Promise<void> | void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSignOut, className }) => {
  const pathname = usePathname();

  return (
    <div className={cn(
      "flex flex-col h-screen bg-white border-r border-teal-100 p-6 w-64 space-y-6",
      className
    )}>
      {/* Logo/Brand */}
      <div className="flex items-center gap-2 px-2">
        <Heart className="w-8 h-8 text-teal-600" fill="currentColor" />
        <h1 className="text-xl font-semibold text-teal-800">MindfulAI</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="block"
            >
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                  isActive 
                    ? "bg-teal-100/80 text-teal-700" 
                    : "hover:bg-teal-100/40 text-gray-600 hover:text-teal-700"
                )}
              >
                {React.cloneElement(item.icon as React.ReactElement, {
                  className: cn(
                    "w-5 h-5",
                    isActive ? "text-teal-700" : "text-gray-500 group-hover:text-teal-600"
                  )
                })}
                <span className="font-medium">{item.label}</span>
                
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-white border border-teal-100 rounded hidden group-hover:block text-sm text-gray-600 shadow-sm">
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="space-y-2 pt-4 border-t border-teal-100">
        <Link href="/dashboard/settings">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-gray-600 hover:text-teal-700 hover:bg-teal-100/40"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Button>
        </Link>
        
        <Button 
          onClick={onSignOut}
          variant="ghost"
          className="w-full justify-start gap-2 text-red-400 hover:text-red-500 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
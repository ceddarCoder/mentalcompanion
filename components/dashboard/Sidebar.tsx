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
  Home,
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
    description: 'Your personal wellness space',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    label: 'Wellness Check',
    href: '/dashboard/wellness',
    description: 'AI-powered mood analysis',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'Your Companion',
    href: '/dashboard/chat',
    description: 'Talk with our AI companion',
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: 'Journal',
    href: '/dashboard/journal',
    description: 'Track your journey',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: 'Resources',
    href: '/dashboard/resources',
    description: 'Mental health education',
  },
  {
    icon: <Activity className="w-5 h-5" />,
    label: 'Progress',
    href: '/dashboard/progress',
    description: 'View your growth',
  },
];

interface SidebarProps {
  onSignOut: () => Promise<void> | void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSignOut, className }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-card border-r border-border p-6 w-64 space-y-6',
        className
      )}
    >
      {/* Logo/Brand */}
      <div className="flex items-center gap-2 px-2">
        <Heart className="w-8 h-8 text-primary" fill="currentColor" />
        <h1 className="text-xl font-semibold text-foreground">MindfulAI</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className="block">
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-primary'
                )}
              >
                {React.cloneElement(item.icon as React.ReactElement, {
                  className: cn(
                    'w-5 h-5',
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                  ),
                })}
                <span className="font-medium">{item.label}</span>

                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border rounded hidden group-hover:block text-sm text-foreground shadow-sm">
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="space-y-2 pt-4 border-t border-border">
        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Button>
        </Link>

        <Button
          onClick={onSignOut}
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Heart,
  MessageCircle,
  Calendar,
  Home,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
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
];
interface SidebarProps {
  onSignOut: () => Promise<void> | void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ onSignOut, isCollapsed, toggleSidebar }) => {
  const pathname = usePathname();
  
  return (
    <div className="relative h-screen">
      {/* Sidebar Content */}
      <div
        className={cn(
          'flex h-full flex-col bg-card border-r border-border transition-all duration-300',
          isCollapsed ? 'w-[5rem]' : 'w-[16rem]'
        )}
      >
        {/* Logo Container - Now used as a reference point for toggle */}
        <div className="relative h-[72px] flex items-center px-6">
          {/* Toggle Button - Positioned relative to logo container */}
          <div 
            className={cn(
              'absolute right-0 translate-x-[32px]',
              'flex items-center justify-center',
              'h-10 bg-card',
              'border-y border-r border-border',
              'rounded-r-lg'
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className={cn(
                'h-8 w-8 p-0',
                'hover:bg-primary/10 hover:text-primary'
              )}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Logo */}
          <Heart className="w-8 h-8 text-primary" fill="currentColor" />
          {!isCollapsed && (
            <h1 className="text-xl font-semibold text-foreground ml-2">MindfulAI</h1>
          )}
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col px-4 py-4">
          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className="block">
                  <div
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-primary/10 text-muted-foreground hover:text-primary'
                    )}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: cn(
                        'w-5 h-5',
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:text-primary'
                      )
                    })}
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
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
                {!isCollapsed && 'Settings'}
              </Button>
            </Link>
            <Button
              onClick={onSignOut}
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && 'Sign Out'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
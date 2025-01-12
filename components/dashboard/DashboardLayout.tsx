// // 'use client';

// // import React from 'react';
// // import { usePathname } from 'next/navigation'; // Import usePathname
// // import { motion } from 'framer-motion';
// // import Sidebar from './Sidebar';
// // import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// // import { Button } from '@/components/ui/button';
// // import { Menu, Shield } from 'lucide-react';
// // import { cn } from '@/lib/utils';

// // const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
// //   const pathname = usePathname(); // Get the current route

// //   const handleSignOut = async () => {
// //     try {
// //       // Call the logout endpoint to clear the authentication cookie
// //       await fetch('/api/auth/logout', {
// //         method: 'POST',
// //         credentials: 'include', // Ensure cookies are sent with the request
// //       });

// //       // Redirect to the homepage or login page
// //       window.location.href = '/';
// //     } catch (error) {
// //       console.error('Logout failed:', error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Hamburger Menu for Mobile */}
// //       <div className="lg:hidden fixed top-4 left-4 z-50">
// //         <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
// //           <SheetTrigger asChild>
// //             <Button variant="ghost" size="icon" className="rounded-full">
// //               <Menu className="w-5 h-5" />
// //             </Button>
// //           </SheetTrigger>
// //           <SheetContent side="left" className="w-64 p-0">
// //             {/* Framer Motion animation for the Sidebar */}
// //             <motion.div
// //               initial={{ x: -250 }}
// //               animate={{ x: 0 }}
// //               exit={{ x: -250 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               <Sidebar onSignOut={handleSignOut} />
// //             </motion.div>
// //           </SheetContent>
// //         </Sheet>
// //       </div>

// //       {/* Desktop Navigation */}
// //       <Sidebar
// //         onSignOut={handleSignOut}
// //         className="hidden lg:flex lg:fixed lg:inset-y-0"
// //       />

// //       {/* Main Content with animation */}
// //       <motion.div
// //         className="lg:pl-64"
// //         initial={{ opacity: 0, y: 10 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         exit={{ opacity: 0, y: 10 }}
// //         transition={{ duration: 0.3 }}
// //       >
// //         <main className={cn(
// //           "py-6 px-4 sm:px-6 lg:px-8",
// //           pathname === '/dashboard/chat' && "py-0 px-0" // Remove padding for the chat page
// //         )}>
// //           {children}
// //         </main>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default DashboardLayout;


// 'use client';

// import React from 'react';
// import { usePathname } from 'next/navigation'; // Import usePathname
// import { motion } from 'framer-motion';
// import Sidebar from './Sidebar';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Button } from '@/components/ui/button';
// import { Menu } from 'lucide-react';
// import { cn } from '@/lib/utils';

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
//   const pathname = usePathname(); // Get the current route

//   const handleSignOut = async () => {
//     try {
//       // Call the logout endpoint to clear the authentication cookie
//       await fetch('/api/auth/logout', {
//         method: 'POST',
//         credentials: 'include', // Ensure cookies are sent with the request
//       });

//       // Redirect to the homepage or login page
//       window.location.href = '/';
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Floating Action Button (FAB) for Mobile Sidebar */}
//       <div className="lg:hidden fixed bottom-4 right-4 z-50">
//         <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
//           <SheetTrigger asChild>
//             <Button
//               variant="default"
//               size="icon"
//               className="rounded-full w-12 h-12 shadow-lg bg-teal-500 hover:bg-teal-600 text-white"
//             >
//               <Menu className="w-6 h-6" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-64 p-0">
//             {/* Framer Motion animation for the Sidebar */}
//             <motion.div
//               initial={{ x: -250 }}
//               animate={{ x: 0 }}
//               exit={{ x: -250 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Sidebar onSignOut={handleSignOut} />
//             </motion.div>
//           </SheetContent>
//         </Sheet>
//       </div>

//       {/* Desktop Navigation */}
//       <Sidebar
//         onSignOut={handleSignOut}
//         className="hidden lg:flex lg:fixed lg:inset-y-0"
//       />

//       {/* Main Content with animation */}
//       <motion.div
//         className="lg:pl-64"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 10 }}
//         transition={{ duration: 0.3 }}
//       >
//         <main className={cn(
//           "py-6 px-4 sm:px-6 lg:px-8",
//           pathname === '/dashboard/chat' && "py-0 px-0" // Remove padding for the chat page
//         )}>
//           {children}
//         </main>
//       </motion.div>
//     </div>
//   );
// };

// export default DashboardLayout;

'use client';

import React, { useState } from 'react'; // Import useState
import { usePathname } from 'next/navigation'; // Import usePathname
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { Home, MessageCircle, BookOpen, Menu, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // Get the current route
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const handleSignOut = async () => {
    try {
      // Call the logout endpoint to clear the authentication cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent with the request
      });

      // Redirect to the homepage or login page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100"> {/* Soft gradient background */}
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

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200/20 h-16 shadow-lg">
        <div className="flex justify-around p-2">
          {/* Home */}
          <Link href="/dashboard/home" className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors">
            <Home className="w-6 h-6" /> {/* Larger icon */}
            <span className="text-xs mt-1">Home</span>
          </Link>

          {/* Chat */}
          <Link href="/dashboard/chat" className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors">
            <MessageCircle className="w-6 h-6" /> {/* Larger icon */}
            <span className="text-xs mt-1">Chat</span>
          </Link>

          {/* Journal */}
          <Link href="/dashboard/journal" className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors">
            <BookOpen className="w-6 h-6" /> {/* Larger icon */}
            <span className="text-xs mt-1">Journal</span>
          </Link>

          {/* More (Dropdown) */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
              className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors"
            >
              <Menu className="w-6 h-6" /> {/* Larger icon */}
              <span className="text-xs mt-1">More</span>
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && ( // Conditionally render dropdown
              <div className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-sm border border-gray-200/20 rounded-xl shadow-lg w-56 p-2">
                <Link href="/dashboard/settings" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 mr-2 text-pink-500" /> {/* Larger icon */}
                  Settings
                </Link>
                <Link href="/dashboard/resources" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5 mr-2 text-teal-500" /> {/* Larger icon */}
                  Resources
                </Link>
                <button onClick={handleSignOut} className="flex items-center w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5 mr-2 text-red-500" /> {/* Larger icon */}
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
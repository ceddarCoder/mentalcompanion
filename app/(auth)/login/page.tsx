// "use client";

// import { useState } from 'react';
// import AuthLayout from '@/components/auth/AuthLayout';
// import LoginForm from '@/components/auth/LoginForm';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/hooks/use-toast';

// interface LoginError {
//   message: string;
// }

// export default function LoginPage() {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (username: string, password: string): Promise<void> => {
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'An unexpected error occurred');
//       }

//       localStorage.setItem('isAuthenticated', 'true'); // Store authentication state

//       toast({
//         title: "Login successful",
//         description: "Redirecting to dashboard...",
//         duration: 2000,
//       });

//       // Redirect to the main page or dashboard
//       setTimeout(() => {
//         router.push('/dashboard/home');
//       }, 500);

//     } catch (error) {
//       const loginError = error as LoginError;

//       toast({
//         variant: "destructive",
//         title: "Login failed",
//         description: loginError.message || "An unexpected error occurred",
//         duration: 3000,
//       });

//       console.error('Login error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (username: string, password: string) => {
//     await handleLogin(username, password);
//   };

//   return (
//     <AuthLayout>
//       <LoginForm 
//         onLogin={handleSubmit}
//         isLoading={isLoading}
//       />
//     </AuthLayout>
//   );
// }

"use client";

import { useState } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface LoginError {
  message: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unexpected error occurred');
      }

      const data = await response.json();
      const userName = data.user.name; // Get the user's name from the response

      // Store authentication state and user data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', userName); // Store the user's name

      toast({
        title: "Login successful",
        description: "Redirecting to dashboard...",
        duration: 2000,
      });

      // Redirect to the main page or dashboard
      setTimeout(() => {
        router.push('/dashboard/home');
      }, 500);

    } catch (error) {
      const loginError = error as LoginError;

      toast({
        variant: "destructive",
        title: "Login failed",
        description: loginError.message || "An unexpected error occurred",
        duration: 3000,
      });

      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (username: string, password: string) => {
    await handleLogin(username, password);
  };

  return (
    <AuthLayout>
      <LoginForm 
        onLogin={handleSubmit}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}
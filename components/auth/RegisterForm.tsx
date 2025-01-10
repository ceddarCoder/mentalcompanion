"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Brain, ArrowLeft, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface RegisterFormProps {
  onRegister: (email: string, username: string, password: string) => Promise<void>;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, isLoading = false }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onRegister(username, email, password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto p-4"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Link href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </motion.div>

      <Card className="border-teal-100 shadow-lg">
        <CardHeader className="space-y-2 text-center pb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-center mb-4 space-x-2"
          >
            <Brain className="w-12 h-12 text-teal-600" />
            <Heart className="w-12 h-12 text-teal-500" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-gray-800">Begin Your Journey</CardTitle>
          <CardDescription className="text-gray-600">
            Join our supportive community and start your path to better mental well-being
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="w-full border-teal-200 focus:border-teal-400 focus:ring-teal-400"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
                className="w-full border-teal-200 focus:border-teal-400 focus:ring-teal-400"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="w-full border-teal-200 focus:border-teal-400 focus:ring-teal-400"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="space-y-4"
            >
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
              Sign in
            </Link>
          </p>
          <div className="text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </div>
          <div className="text-xs text-gray-500">
            Need immediate support? Call 988 for 24/7 crisis assistance
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RegisterForm;
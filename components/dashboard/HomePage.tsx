"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Brain,Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, description }) => (
  <motion.div variants={cardVariants}>
    <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/90">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gray-200 rounded-lg">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg text-gray-800">{title}</CardTitle>
            <CardDescription className="text-gray-600">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  </motion.div>
);

const quickActions: QuickActionProps[] = [
  {
    icon: <Heart className="w-6 h-6 text-teal-600" />,
    title: "Wellness Check",
    description: "Take a quick mental health assessment",
    href: "/dashboard/wellness",
  },
  {
    icon: <Brain className="w-6 h-6 text-teal-600" />,
    title: "AI Companion",
    description: "Chat with your supportive AI companion",
    href: "/dashboard/chat",
  },
  {
    icon: <Calendar className="w-6 h-6 text-teal-600" />,
    title: "Journal Entry",
    description: "Record your thoughts and feelings",
    href: "/dashboard/journal",
  },
];

const HomePage = () => {
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) greeting = "Good afternoon";
  else if (currentHour >= 17) greeting = "Good evening";

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-gray-50">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">{greeting}, User</h1>
        <p className="text-gray-600">
          Welcome to your personal mental wellness space. How are you feeling today?
        </p>
      </div>

      {/* Mood Selection */}
      <Card className="border-2 border-dashed border-gray-300 bg-white">
        <CardContent className="pt-6">
          <div className="flex justify-center space-x-4">
            {["😊", "😐", "😢", "😫", "😡"].map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                className="text-3xl hover:bg-gray-100 rounded-full w-16 h-16"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800">Quick Actions</h2>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quickActions.map((action) => (
            <QuickAction key={action.title} {...action} />
          ))}
        </motion.div>
      </div>

      {/* Wellness Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-800">Weekly Mood Trends</CardTitle>
            <CardDescription className="text-gray-600">Your emotional journey this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              [Mood Chart Placeholder]
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Journal Entries</CardTitle>
            <CardDescription className="text-gray-600">Your latest reflections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-800">Journal Entry #{3-i}</p>
                    <p className="text-sm text-gray-600">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Resources */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <MessageCircle className="w-5 h-5 text-gray-600" />
            Need immediate support?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-gray-700 hover:bg-gray-800">Talk to AI Companion</Button>
            <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
              Crisis Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;

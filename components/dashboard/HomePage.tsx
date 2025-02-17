"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, description, href }) => {
  const router = useRouter();

  return (
    <motion.div variants={cardVariants}>
      <Card
        className="hover:shadow-lg transition-shadow cursor-pointer bg-card/90"
        onClick={() => router.push(href)}
      >
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-muted rounded-lg">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg text-foreground">{title}</CardTitle>
              <CardDescription className="text-muted-foreground">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

const quickActions: QuickActionProps[] = [
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Wellness Check",
    description: "Take a quick mental health assessment",
    href: "/dashboard/wellness",
  },
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "AI Companion",
    description: "Chat with your supportive AI companion",
    href: "/dashboard/chat",
  },
  {
    icon: <Calendar className="w-6 h-6 text-primary" />,
    title: "Journal Entry",
    description: "Record your thoughts and feelings",
    href: "/dashboard/journal",
  },
];

const HomePage = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const router = useRouter();

  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) greeting = "Good afternoon";
  else if (currentHour >= 17) greeting = "Good evening";

  useEffect(() => {
    // Retrieve the user's name from localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
    // Save the selected mood to local storage or send it to the backend
    localStorage.setItem('selectedMood', mood);
  };

  const handleCrisisResources = () => {
    router.push('/resources');
  };

  const handleAIChat = () => {
    router.push('/dashboard/chat');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-background">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{greeting}, {userName}</h1>
        <p className="text-muted-foreground">
          Welcome to your personal mental wellness space. How are you feeling today?
        </p>
      </div>

      {/* Mood Selection */}
      <Card className="border-2 border-dashed border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex justify-center space-x-4">
            {["😊", "😐", "😢", "😫", "😡"].map((emoji) => (
              <Button
                key={emoji}
                variant={selectedMood === emoji ? "default" : "ghost"}
                className={`text-3xl rounded-full w-16 h-16 ${
                  selectedMood === emoji ? 'bg-primary/10 hover:bg-primary/20' : 'hover:bg-muted'
                }`}
                onClick={() => handleMoodSelection(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Quick Actions</h2>
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
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Mood Trends</CardTitle>
            <CardDescription className="text-muted-foreground">Your emotional journey this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              [Mood Chart Placeholder]
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Journal Entries</CardTitle>
            <CardDescription className="text-muted-foreground">Your latest reflections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-3 rounded-lg bg-muted">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Journal Entry #{3 - i}</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Resources */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
            Need immediate support?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleAIChat}>
              Talk to AI Companion
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted"
              onClick={handleCrisisResources}
            >
              Crisis Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
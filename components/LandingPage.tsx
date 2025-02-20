"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Brain, Heart, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const LandingPage = () => {
  const router = useRouter();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  const handleNavigation = (path: string) => {
    const timer = setTimeout(() => { router.push(path); }, 300);
    return () => clearTimeout(timer);
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "AI-Powered Support",
      description: "24/7 emotional support and coping strategies tailored to your needs."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Mindfulness Tools",
      description: "Guided meditation, breathing exercises, and mood tracking."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary" />,
      title: "Safe Space Community",
      description: "Connect with others in moderated support groups."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Wellness Journey",
      description: "Track your progress and celebrate small victories."
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-background"
    >
      {/* Navigation Bar */}
      <nav className="border-b bg-card/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-8 h-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">MindfulAI</span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => handleNavigation('/resources')}
                className="hover:bg-primary/10 text-foreground"
              >
                Crisis Resources
              </Button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/login')}
                  className="hover:bg-primary/10 text-foreground"
                >
                  Login
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handleNavigation('/register')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Register
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="block">Your Mental Health Journey</span>
              <span className="block text-primary mt-1">Begins With a Simple Hello</span>
            </motion.h1>
            
            <motion.p 
              className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Experience compassionate AI-powered support, mindfulness tools, and a caring community. 
              Because your mental health matters, and you're never alone on this journey.
            </motion.p>

            <motion.div 
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="group bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => handleNavigation('/register')}
                >
                  Get Started
                  <motion.div
                    className="ml-2 inline-block"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="h-4 w-4 text-primary-foreground" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleNavigation('/assessment')}
                  className="hover:bg-primary/10 text-foreground border-border"
                >
                  Take Well-being Assessment
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Crisis Helpline Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="p-6 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-lg text-muted-foreground">
              If you're experiencing a mental health crisis or need immediate support:
            </p>
            <p className="mt-2 text-2xl font-bold text-primary">
              24/7 Crisis Helpline: 988
            </p>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="flex justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-lg font-medium text-primary mt-4">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage;
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import AIChat from '@/components/dashboard/AIChat';

const AIChatPage = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AIChat />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AIChatPage;
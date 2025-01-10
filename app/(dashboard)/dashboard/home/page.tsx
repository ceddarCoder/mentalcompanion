import { Metadata } from 'next';
import HomePage from '@/components/dashboard/HomePage';

export const metadata: Metadata = {
  title: 'Home | MindfulAI',
  description: 'Your personal mental wellness dashboard and AI companion',
};

export default function Home() {
  return <HomePage />;
}
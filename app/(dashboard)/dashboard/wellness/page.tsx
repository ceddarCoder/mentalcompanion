import { Metadata } from 'next';
import WellnessCheck from '@/components/dashboard/WelnessCheck';

export const metadata: Metadata = {
  title: 'Wellness Check | MindfulAI',
  description: 'AI-powered mental health assessment and mood analysis',
};

export default function WellnessCheckPage() {
  return <WellnessCheck />;
}
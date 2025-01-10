"use client";

import React, { useState} from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface Question {
  id: number;
  text: string;
  type: 'scale' | 'choice' | 'mood';
  options?: string[];
}

const questions: Question[] = [
  { id: 1, type: 'mood', text: 'How are you feeling right now?' },
  { id: 2, type: 'scale', text: 'How would you rate your stress level today?' },
  {
    id: 3,
    type: 'choice',
    text: 'Have you experienced any of these symptoms recently?',
    options: ['Difficulty sleeping', 'Changes in appetite', 'Lack of energy', 'Difficulty concentrating', 'None of the above']
  },
  { id: 4, type: 'scale', text: 'How would you rate your overall energy level?' },
  {
    id: 5,
    type: 'choice',
    text: 'What activities have you engaged in today?',
    options: ['Exercise', 'Meditation', 'Social interaction', 'Creative activities', 'Other']
  }
];

const WellnessCheck = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAssessing, setIsAssessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [analysis, setAnalysis] = useState<{ stress: string; energy: string; wellness: string }>({
    stress: '',
    energy: '',
    wellness: ''
  });

  const handleResponse = (questionId: number, value: any) => {
    setResponses((prevResponses) => ({ ...prevResponses, [questionId]: value }));
  };

  const calculateAnalysis = () => {
    const stressLevel = responses[2] ?? 5;
    const energyLevel = responses[4] ?? 5;

    const stress = stressLevel > 6 ? 'High' : stressLevel > 3 ? 'Medium' : 'Low';
    const energy = energyLevel > 6 ? 'High' : energyLevel > 3 ? 'Good' : 'Low';
    const wellness = energyLevel > 5 && stressLevel < 5 ? 'Stable' : 'Needs Attention';

    setAnalysis({ stress, energy, wellness });
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAssessing(true);
      setTimeout(() => {
        setIsAssessing(false);
        calculateAnalysis();
        setIsComplete(true);
      }, 2000);
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'mood':
        return (
          <div className="flex justify-center space-x-4">
            {['😊', '😐', '😔', '😫', '😡'].map((emoji) => (
              <Button
                key={emoji}
                variant={responses[question.id] === emoji ? "default" : "ghost"}
                className={`text-3xl rounded-full w-16 h-16 ${
                  responses[question.id] === emoji 
                    ? 'bg-teal-100 hover:bg-teal-200' 
                    : 'hover:bg-teal-50'
                }`}
                onClick={() => handleResponse(question.id, emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        );
      
      case 'scale':
        return (
          <div className="space-y-4">
            <Slider
              value={[responses[question.id] || 0]}
              onValueChange={(value: any[]) => handleResponse(question.id, value[0])}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-teal-600">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        );
      
      case 'choice':
        return (
          <Select 
            onValueChange={(value) => handleResponse(question.id, value)}
            value={responses[question.id]}
          >
            <SelectTrigger className="border-teal-200 focus:ring-teal-200">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
    }
  };

  const getStressColor = (level: string) => {
    switch (level) {
      case 'High':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          icon: 'text-red-500'
        };
      case 'Medium':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          icon: 'text-yellow-500'
        };
      case 'Low':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          icon: 'text-green-500'
        };
      default:
        return {
          bg: 'bg-teal-50',
          text: 'text-teal-700',
          icon: 'text-teal-500'
        };
    }
  };

  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'High':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          icon: 'text-purple-500'
        };
      case 'Good':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          icon: 'text-blue-500'
        };
      case 'Low':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          icon: 'text-orange-500'
        };
      default:
        return {
          bg: 'bg-teal-50',
          text: 'text-teal-700',
          icon: 'text-teal-500'
        };
    }
  };

  const getWellnessColor = (status: string) => {
    switch (status) {
      case 'Stable':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          icon: 'text-emerald-500'
        };
      case 'Needs Attention':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          icon: 'text-amber-500'
        };
      default:
        return {
          bg: 'bg-teal-50',
          text: 'text-teal-700',
          icon: 'text-teal-500'
        };
    }
  };

  if (isComplete) {
    const stressColors = getStressColor(analysis.stress);
    const energyColors = getEnergyColor(analysis.energy);
    const wellnessColors = getWellnessColor(analysis.wellness);

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-teal-900">Your Wellness Report</CardTitle>
                <CardDescription className="text-teal-600">Analysis based on your responses</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                  <Download className="w-4 h-4 mr-2" />
                  Save Report
                </Button>
                <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-teal-900">Current Mood Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={stressColors.bg}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm text-teal-900">Stress Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${stressColors.text}`}>{analysis.stress}</span>
                      <AlertCircle className={stressColors.icon} />
                    </div>
                  </CardContent>
                </Card>
                <Card className={energyColors.bg}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm text-teal-900">Energy Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${energyColors.text}`}>{analysis.energy}</span>
                      <CheckCircle2 className={energyColors.icon} />
                    </div>
                  </CardContent>
                </Card>
                <Card className={wellnessColors.bg}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm text-teal-900">Overall Wellness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${wellnessColors.text}`}>{analysis.wellness}</span>
                      <Heart className={wellnessColors.icon} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-teal-900">AI Insights</h3>
              <Alert className="bg-white border-teal-200">
                <Brain className="h-4 w-4 text-teal-600" />
                <AlertTitle className="text-teal-900">Personalized Recommendations</AlertTitle>
                <AlertDescription className="text-teal-700">
                  Based on your responses, consider these activities:
                  <ul className="list-disc list-inside mt-2">
                    <li>Morning meditation (10-15 minutes)</li>
                    <li>Light exercise</li>
                    <li>Regular sleep schedule</li>
                    <li>Social connection activities</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-teal-600">
          <span>Question {currentStep} of {questions.length}</span>
          <span>{Math.round((currentStep / questions.length) * 100)}% Complete</span>
        </div>
        <Progress 
          value={(currentStep / questions.length) * 100} 
          className="bg-teal-100"
        />
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-teal-900">{questions[currentStep - 1].text}</CardTitle>
          <CardDescription className="text-teal-600">Answer honestly for better support.</CardDescription>
        </CardHeader>
        <CardContent>{renderQuestion(questions[currentStep - 1])}</CardContent>
        <CardFooter className="justify-between">
          <Button 
            variant="ghost" 
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)} 
            disabled={currentStep === 1}
            className="text-teal-700 hover:bg-teal-50"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!responses[questions[currentStep - 1].id]}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {currentStep === questions.length ? 'Complete' : 'Next'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>

      {isAssessing && (
        <div className="fixed inset-0 bg-teal-900/20 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-[300px] bg-white">
            <CardHeader>
              <CardTitle className="text-center text-teal-900">Analyzing Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Brain className="w-8 h-8 animate-pulse text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
};

export default WellnessCheck;
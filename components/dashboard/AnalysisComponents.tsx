"use client";
import React from 'react';
import { Search, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';


// New Analysis Component
export const NewAnalysis = () => {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<any>(null);

  const handleAnalysis = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setResults({
        vulnerabilities: [
          {
            id: 1,
            type: 'SQL Injection',
            severity: 'high',
            description: 'Possible SQL injection vulnerability detected in login form',
            solution: 'Use parameterized queries or an ORM to prevent SQL injection attacks',
          },
          {
            id: 2,
            type: 'XSS',
            severity: 'medium',
            description: 'Cross-site scripting vulnerability in comment section',
            solution: 'Implement proper input sanitization and output encoding',
          },
        ],
        summary: {
          high: 1,
          medium: 1,
          low: 0,
        },
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Security Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Enter target URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleAnalysis}
                disabled={!url || isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Start Fuzzing
                  </span>
                )}
              </Button>
            </div>

            {results && <ResultsDisplay results={results} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Results Display Component
export const ResultsDisplay = ({ results }: { results: any }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-50 border-red-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-medium">High Risk</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{results.summary.high}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium">Medium Risk</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{results.summary.medium}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Low Risk</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{results.summary.low}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      
      <Card>
        <CardHeader>
          <CardTitle>Detected Vulnerabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Recommended Solution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.vulnerabilities.map((vuln: any) => (
                <TableRow key={vuln.id}>
                  <TableCell className="font-medium">{vuln.type}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>{vuln.description}</TableCell>
                  <TableCell>{vuln.solution}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};


export const ReportsHistory = () => {
  const [reports] = React.useState([
    {
      id: 1,
      url: 'https://example.com',
      date: '2024-03-15',
      vulnerabilities: { high: 2, medium: 3, low: 1 },
      status: 'completed',
    },
    {
      id: 2,
      url: 'https://test.com',
      date: '2024-03-14',
      vulnerabilities: { high: 0, medium: 2, low: 3 },
      status: 'completed',
    },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analysis History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>High</TableHead>
                <TableHead>Medium</TableHead>
                <TableHead>Low</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.date}</TableCell>
                  <TableCell className="font-medium">{report.url}</TableCell>
                  <TableCell className="text-red-600">{report.vulnerabilities.high}</TableCell>
                  <TableCell className="text-yellow-600">{report.vulnerabilities.medium}</TableCell>
                  <TableCell className="text-blue-600">{report.vulnerabilities.low}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                      {report.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
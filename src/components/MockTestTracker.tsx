import React, { useState } from 'react';
import { LineChart, Trophy } from 'lucide-react';
import { MockTest, ExamType } from '../types';

interface MockTestTrackerProps {
  examType: ExamType;
  mockTests: MockTest[];
  onAddMockTest: (score: number) => void;
}

export default function MockTestTracker({ examType, mockTests, onAddMockTest }: MockTestTrackerProps) {
  const [newScore, setNewScore] = useState('');
  const totalMarks = examType === 'JEE' ? 300 : 720;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseInt(newScore);
    if (!isNaN(score) && score >= 0 && score <= totalMarks) {
      onAddMockTest(score);
      setNewScore('');
    }
  };

  const getPerformancePrediction = () => {
    if (mockTests.length < 2) return null;
    
    const recentScores = mockTests.slice(-2);
    const avgScore = recentScores.reduce((acc, test) => acc + test.score, 0) / recentScores.length;
    const trend = recentScores[1].score - recentScores[0].score;
    
    const prediction = avgScore + (trend * 0.5); // Simple linear projection
    return {
      predicted: Math.round(prediction),
      trend: trend > 0 ? 'improving' : trend < 0 ? 'declining' : 'stable'
    };
  };

  const prediction = getPerformancePrediction();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-indigo-600" />
        Mock Test Tracker
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="number"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            placeholder={`Enter score (max ${totalMarks})`}
            className="flex-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            min="0"
            max={totalMarks}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Score
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {mockTests.map((test, index) => (
          <div key={test.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Mock Test {index + 1}</span>
            <span className="font-semibold">{test.score}/{test.totalMarks}</span>
          </div>
        ))}
      </div>

      {prediction && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <LineChart className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-indigo-900">Performance Prediction</h3>
          </div>
          <p className="text-sm text-indigo-800">
            Based on your recent performance, your predicted score is around{' '}
            <span className="font-bold">{prediction.predicted}</span> marks.
            Your performance is {prediction.trend}.
          </p>
        </div>
      )}
    </div>
  );
}
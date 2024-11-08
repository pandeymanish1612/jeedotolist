import React, { useState, useEffect } from 'react';
import { ExamType, Topic, MockTest, DailyTask, ChapterStatus, Subject } from './types';
import ProgressChart from './components/ProgressChart';
import MockTestTracker from './components/MockTestTracker';
import DailyTaskList from './components/DailyTaskList';
import DailyQuote from './components/DailyQuote';
import { BookOpen, GraduationCap } from 'lucide-react';
import { chapters } from './data/chapters';

export default function App() {
  const [examType, setExamType] = useState<ExamType>('JEE');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);

  // Initialize topics from chapters data
  useEffect(() => {
    const initialTopics: Topic[] = Object.entries(chapters).flatMap(([subject, chapterList]) =>
      chapterList.map(chapter => ({
        id: chapter.id,
        name: chapter.name,
        subject: subject as Subject,
        status: chapter.status,
        completionPercentage: 0
      }))
    );
    setTopics(initialTopics);
  }, []);

  const handleUpdateChapterStatus = (chapterId: string, status: ChapterStatus) => {
    setTopics(prevTopics =>
      prevTopics.map(topic => {
        if (topic.id === chapterId) {
          const completionPercentage = 
            status === 'COMPLETED' ? 100 :
            status === 'IN_PROGRESS' ? 50 : 0;
          
          return {
            ...topic,
            status,
            completionPercentage
          };
        }
        return topic;
      })
    );
  };

  const handleAddMockTest = (score: number) => {
    const newTest: MockTest = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score,
      totalMarks: examType === 'JEE' ? 300 : 720
    };
    setMockTests(prev => [...prev, newTest]);
  };

  const handleAddTask = (task: Omit<DailyTask, 'id'>) => {
    const newTask: DailyTask = {
      ...task,
      id: Date.now().toString(),
      completed: false
    };
    setDailyTasks(prev => [...prev, newTask]);
  };

  const handleToggleTask = (taskId: string) => {
    setDailyTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StudyTracker</span>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as ExamType)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DailyQuote />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Subject Progress
              </h2>
              <div className="space-y-6">
                <ProgressChart
                  topics={topics}
                  subject="Physics"
                  onUpdateChapterStatus={handleUpdateChapterStatus}
                />
                <ProgressChart
                  topics={topics}
                  subject="Chemistry"
                  onUpdateChapterStatus={handleUpdateChapterStatus}
                />
                {examType === 'JEE' ? (
                  <ProgressChart
                    topics={topics}
                    subject="Mathematics"
                    onUpdateChapterStatus={handleUpdateChapterStatus}
                  />
                ) : (
                  <ProgressChart
                    topics={topics}
                    subject="Biology"
                    onUpdateChapterStatus={handleUpdateChapterStatus}
                  />
                )}
              </div>
            </div>
            <DailyTaskList
              tasks={dailyTasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
            />
          </div>
          <div>
            <MockTestTracker
              examType={examType}
              mockTests={mockTests}
              onAddMockTest={handleAddMockTest}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
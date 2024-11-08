import React, { useState } from 'react';
import { CheckSquare, PlusCircle, BookOpen, Brain, Clock, FileText } from 'lucide-react';
import { DailyTask, Subject } from '../types';

interface DailyTaskListProps {
  tasks: DailyTask[];
  onAddTask: (task: Omit<DailyTask, 'id'>) => void;
  onToggleTask: (taskId: string) => void;
}

export default function DailyTaskList({ tasks, onAddTask, onToggleTask }: DailyTaskListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'CHAPTER_STUDY' as const,
    subject: undefined as Subject | undefined,
    chapter: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({
      ...newTask,
      completed: false,
    });
    setNewTask({
      title: '',
      type: 'CHAPTER_STUDY',
      subject: undefined,
      chapter: '',
    });
    setShowAddForm(false);
  };

  const getTaskIcon = (type: DailyTask['type']) => {
    switch (type) {
      case 'CHAPTER_STUDY':
        return BookOpen;
      case 'MOCK_TEST':
        return Brain;
      case 'REVISION':
        return Clock;
      case 'PYQ_PRACTICE':
        return FileText;
      default:
        return CheckSquare;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-indigo-600" />
          Daily Tasks
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-indigo-600 hover:text-indigo-700"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Type</label>
              <select
                value={newTask.type}
                onChange={(e) => setNewTask({ ...newTask, type: e.target.value as DailyTask['type'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="CHAPTER_STUDY">Chapter Study</option>
                <option value="MOCK_TEST">Mock Test</option>
                <option value="REVISION">Revision</option>
                <option value="PYQ_PRACTICE">PYQ Practice</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Task
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {tasks.map((task) => {
          const TaskIcon = getTaskIcon(task.type);
          return (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                task.completed ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <button
                onClick={() => onToggleTask(task.id)}
                className={`p-1 rounded-full ${
                  task.completed ? 'text-green-600' : 'text-gray-400 hover:text-indigo-600'
                }`}
              >
                <TaskIcon className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </p>
                {task.subject && (
                  <p className="text-xs text-gray-500">
                    {task.subject} {task.chapter && `- ${task.chapter}`}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
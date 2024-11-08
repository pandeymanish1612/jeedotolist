import React from 'react';
import { CheckCircle, Circle, BookOpen, PenTool, Brain } from 'lucide-react';
import { Topic, TopicStatus } from '../types';

interface TopicListProps {
  topics: Topic[];
  onUpdateStatus: (topicId: string, status: TopicStatus) => void;
}

const statusIcons = {
  'NOT_STARTED': Circle,
  'THEORY_COMPLETED': BookOpen,
  'PYQ_SOLVED': PenTool,
  'MOCK_TEST_TAKEN': Brain
};

export default function TopicList({ topics, onUpdateStatus }: TopicListProps) {
  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div key={topic.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{topic.name}</h3>
              <p className="text-sm text-gray-500">{topic.subject}</p>
            </div>
            <div className="flex gap-2">
              {Object.entries(statusIcons).map(([status, Icon]) => (
                <button
                  key={status}
                  onClick={() => onUpdateStatus(topic.id, status as TopicStatus)}
                  className={`p-2 rounded-full transition-colors ${
                    topic.status === status
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
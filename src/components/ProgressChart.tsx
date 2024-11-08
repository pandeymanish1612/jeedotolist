import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Topic, ChapterStatus } from '../types';
import { chapters } from '../data/chapters';

interface ProgressChartProps {
  topics: Topic[];
  subject: string;
  onUpdateChapterStatus: (chapterId: string, status: ChapterStatus) => void;
}

export default function ProgressChart({ topics, subject, onUpdateChapterStatus }: ProgressChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const subjectTopics = topics.filter(topic => topic.subject === subject);
  const avgProgress = subjectTopics.reduce((acc, topic) => acc + topic.completionPercentage, 0) / (subjectTopics.length || 1);
  const subjectChapters = chapters[subject as keyof typeof chapters] || [];

  const getStatusColor = (status: ChapterStatus) => {
    switch (status) {
      case 'NOT_STARTED':
        return 'bg-gray-100 text-gray-600';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-2">
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full">
        <div className="relative pt-1 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                {subject}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {avgProgress.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div
              style={{ width: `${avgProgress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
            />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="bg-white rounded-lg border border-gray-200 divide-y">
          {subjectChapters.map((chapter) => (
            <div key={chapter.id} className="p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{chapter.name}</span>
                <div className="flex items-center gap-2">
                  <select
                    value={chapter.status}
                    onChange={(e) => onUpdateChapterStatus(chapter.id, e.target.value as ChapterStatus)}
                    className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(chapter.status as ChapterStatus)}`}
                  >
                    <option value="NOT_STARTED">NOT STARTED</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
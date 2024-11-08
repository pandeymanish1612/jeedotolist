import { Quote } from 'lucide-react';
import { getRandomQuote } from '../data/quotes';

export default function DailyQuote() {
  const quote = getRandomQuote();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-start gap-4">
        <Quote className="w-8 h-8 flex-shrink-0 opacity-75" />
        <div>
          <p className="text-lg font-medium italic">{quote.text}</p>
          <p className="mt-2 text-sm opacity-75">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
}
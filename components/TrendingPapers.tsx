
import React from 'react';
import { PaperCard } from './PaperCard';
import { FireIcon } from './icons/Icons';
import { usePapers } from '../PaperContext';

const TrendingPapers: React.FC = () => {
  const { publishedPapers } = usePapers();

  const trendingPapers = [...publishedPapers]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl flex items-center justify-center gap-3">
            <FireIcon className="w-8 h-8 text-blue-600" />
            Trending Papers
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Check out the papers that students are finding most helpful right now.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trendingPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPapers;

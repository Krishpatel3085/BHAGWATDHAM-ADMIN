import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { StatCardProps } from '../types/stats';

const StatCard = ({ icon, title, value, trend, trendLabel }: StatCardProps) => {
  return (
    <div className="bg-[#1e2746] p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#252d3d] rounded-lg">{icon}</div>
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <h3 className="text-xl font-bold mt-0.5 text-white">{value}</h3>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <p className="text-xs text-gray-400">{trendLabel}</p>
    </div>
  );
};
export default StatCard ;
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeProvider';

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, color = 'blue' }) {
  const { theme } = useTheme();
  
  const colorClasses = {
    blue: 'from-blue-600 to-blue-800',
    green: 'from-emerald-600 to-emerald-800',
    orange: 'from-orange-500 to-orange-700',
    purple: 'from-violet-600 to-violet-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl p-6 ${
        theme === 'dark' 
          ? 'bg-slate-800/50 border border-slate-700/50' 
          : 'bg-white border border-slate-200 shadow-lg shadow-slate-200/50'
      }`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full -translate-y-8 translate-x-8`} />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            {title}
          </p>
          <h3 className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {value}
          </h3>
          {subtitle && (
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend > 0 ? 'text-emerald-500' : 'text-red-500'
            }`}>
              <span>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
              <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}>vs ontem</span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
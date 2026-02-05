"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { IEEEAnalytics } from "@/lib/chapter-details";

// Dataset Chart - Vertical Bar Chart (Region × Grade)
function DatasetChart({ data, isInView }: { data: IEEEAnalytics; isInView: boolean }) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  const gradeData = data.gradeDistribution;
  const maxValue = Math.max(...gradeData.map(d => d.count));
  
  // Calculate nice Y-axis ticks with padding, starting from 0
  const getYAxisTicks = () => {
    const tickCount = 4; // Reduced to 4 intervals so we have 5 points including 0
    // Add 20% padding to maxValue so smaller bars are more visible
    const paddedMax = Math.ceil(maxValue * 1.1);
    const step = Math.ceil(paddedMax / tickCount);
    const ticks = [0]; 
    for (let i = 1; i <= tickCount; i++) {
      ticks.push(step * i);
    }
    return ticks;
  };
  
  const yAxisTicks = getYAxisTicks();
  const displayMaxValue = yAxisTicks[yAxisTicks.length - 1];

  return (
    <div className="h-80 flex">
      {/* Y-axis */}
      <div className="flex flex-col justify-end pr-3 text-sm text-zinc-600 font-medium">
        {[...yAxisTicks].reverse().map((tick, i) => (
          <div 
            key={i} 
            className="flex items-center"
            style={{ 
              height: i === yAxisTicks.length - 1 ? 'auto' : `${100 / (yAxisTicks.length - 1)}%`,
              paddingBottom: i === yAxisTicks.length - 1 ? '0.5rem' : '0'
            }}
          >
            {tick}
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 relative border-b border-l border-zinc-300">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-start">
            {[...yAxisTicks].reverse().map((_, i) => (
              <div 
                key={i} 
                className="border-t border-zinc-200"
                style={{ 
                  height: i === yAxisTicks.length - 1 ? '0' : `${100 / (yAxisTicks.length - 1)}%`
                }}
              />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-between gap-1.5 pb-0 pl-1">
            {gradeData.map((item, i) => {
              // Calculate height based on padded max value so smaller bars are visible
              const height = displayMaxValue > 0 ? (item.count / displayMaxValue) * 100 : 0;
              
              return (
                <div key={i} className="relative flex-1 flex flex-col items-center h-full justify-end">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: isInView ? `${height}%` : 0, 
                      opacity: isInView ? 1 : 0 
                    }}
                    transition={{ 
                      duration: 1, 
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t cursor-pointer hover:from-blue-500 hover:to-blue-300 transition-colors relative"
                  >
                    {hoveredBar === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-100 text-xs px-2 py-1 rounded whitespace-nowrap z-20 shadow-lg"
                      >
                        {item.grade}: {item.count}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-800" />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between gap-1.5 mt-2">
          {gradeData.map((item, i) => (
            <div key={i} className="flex-1 text-center text-sm text-zinc-600 font-medium px-0.5">
              <div className="break-words leading-tight">
                {item.grade.length > 12 ? item.grade.split(' ')[0] : item.grade}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// Gender Chart - Donut/Pie Chart
function GenderChart({ data, isInView }: { data: IEEEAnalytics; isInView: boolean }) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  
  const genderData = data.genderDistribution;
  let currentAngle = -90;

  return (
    <div className="relative flex items-center justify-center h-56">
      <svg width="180" height="180">
        {genderData.map((segment, i) => {
          const angle = (segment.percentage / 100) * 360;
          const radius = 65;
          const circumference = 2 * Math.PI * radius;
          const strokeDasharray = `${(angle / 360) * circumference} ${circumference}`;
          const rotation = currentAngle;
          
          currentAngle += angle;

          return (
            <motion.circle
              key={i}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="18"
              strokeDasharray={strokeDasharray}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: isInView ? 0 : circumference }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '90px 90px' }}
              onMouseEnter={() => setHoveredSegment(i)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
          );
        })}
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-2xl font-bold text-zinc-100">{data.totalMembers}</div>
        <div className="text-xs text-zinc-400">Total</div>
      </div>

      {hoveredSegment !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-100 text-xs px-3 py-2 rounded whitespace-nowrap shadow-lg z-20"
        >
          {genderData[hoveredSegment].label}: {genderData[hoveredSegment].value} ({genderData[hoveredSegment].percentage}%)
        </motion.div>
      )}
    </div>
  );
}

// Technology Focus Area - Pareto with cumulative percentage line
function TechnologyFocusChart({ data, isInView }: { data: IEEEAnalytics; isInView: boolean }) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  const techData = data.technologyFocus;
  const totalCount = techData.reduce((sum, item) => sum + item.count, 0);
  const maxValue = Math.max(...techData.map(d => d.count));
  
  // Calculate cumulative percentages
  let cumulativePercentage = 0;
  const dataWithCumulative = techData.map(item => {
    const percentage = (item.count / totalCount) * 100;
    cumulativePercentage += percentage;
    return {
      ...item,
      percentage,
      cumulative: cumulativePercentage
    };
  });

  return (
    <div className="space-y-2.5 relative">
      {dataWithCumulative.map((item, i) => {
        const barWidth = (item.count / maxValue) * 100;
        
        return (
          <div key={i} className="relative">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] text-zinc-400 truncate flex-1 pr-2 leading-tight">{item.area}</span>
              <span className="text-[11px] text-zinc-500 font-medium">{item.count}</span>
            </div>
            <div className="relative h-5 bg-zinc-800 rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${barWidth}%` : 0 }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 cursor-pointer hover:from-blue-500 hover:to-blue-300 transition-colors relative"
              />
              
              {/* Cumulative percentage overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: 1 + i * 0.08 }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-200"
              >
                {Math.round(item.cumulative)}%
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Grade × Gender - Stacked Horizontal Bar
function GradeGenderChart({ data, isInView }: { data: IEEEAnalytics; isInView: boolean }) {
  const gradeGenderData = data.gradeGenderBreakdown;
  const maxValue = Math.max(...gradeGenderData.map(d => d.count));

  return (
    <div className="space-y-3">
      {gradeGenderData.map((item, i) => {
        const malePercent = ((item.male || 0) / maxValue) * 100;
        const femalePercent = ((item.female || 0) / maxValue) * 100;
        const unknownPercent = ((item.unknown || 0) / maxValue) * 100;
        
        return (
          <div key={i} className="relative">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] text-zinc-400 leading-tight">{item.grade}</span>
              <span className="text-[11px] text-zinc-500 font-medium">{item.count}</span>
            </div>
            <div className="h-7 bg-zinc-800 rounded overflow-hidden flex">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${malePercent}%` : 0 }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-zinc-600 hover:bg-zinc-500 cursor-pointer transition-colors relative group"
                title={`Male: ${item.male}`}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.male}
                </span>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${femalePercent}%` : 0 }}
                transition={{ duration: 1, delay: i * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-orange-400 hover:bg-orange-300 cursor-pointer transition-colors relative group"
                title={`Female: ${item.female}`}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.female}
                </span>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${unknownPercent}%` : 0 }}
                transition={{ duration: 1, delay: i * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-slate-400 hover:bg-slate-300 cursor-pointer transition-colors relative group"
                title={`Unknown: ${item.unknown}`}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.unknown}
                </span>
              </motion.div>
            </div>
          </div>
        );
      })}
      
      {/* Legend */}
      <div className="flex gap-4 justify-center mt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-zinc-600 rounded" />
          <span className="text-zinc-400">Male</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-orange-400 rounded" />
          <span className="text-zinc-400">Female</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-slate-400 rounded" />
          <span className="text-zinc-400">Unknown</span>
        </div>
      </div>
    </div>
  );
}

// Chart Card Component
function ChartCard({ 
  title, 
  index, 
  children 
}: { 
  title: string; 
  index: number; 
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative bg-zinc-900 rounded-xl border border-zinc-800 p-4 transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    >
      <h3 className="text-sm font-semibold text-zinc-300 mb-3">{title}</h3>
      {children}
    </motion.div>
  );
}

interface ChapterStatsProps {
  ieeeAnalytics?: {
    delhiSection: IEEEAnalytics;
    studentBranch: IEEEAnalytics;
  };
}

export default function ChapterStats({ ieeeAnalytics }: ChapterStatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!ieeeAnalytics) {
    return null;
  }

  const { delhiSection, studentBranch } = ieeeAnalytics;

  return (
    <section ref={ref} className="relative py-16 sm:py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Chapter Insights
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            IEEE Delhi Section & Student Branch Analytics
          </p>
        </motion.div>

        {/* Delhi Section Data */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-zinc-200 mb-6 flex items-center gap-2"
          >
            <div className="w-1 h-6 bg-blue-500 rounded" />
            {delhiSection.sectionName}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Count by Region and Grade" index={0}>
              <DatasetChart data={delhiSection} isInView={isInView} />
            </ChartCard>

            <ChartCard title="Count by Gender" index={1}>
              <GenderChart data={delhiSection} isInView={isInView} />
            </ChartCard>

            <ChartCard title="Count by Technology Focus Area" index={2}>
              <TechnologyFocusChart data={delhiSection} isInView={isInView} />
            </ChartCard>

            <ChartCard title="Count by Grade and Gender" index={3}>
              <GradeGenderChart data={delhiSection} isInView={isInView} />
            </ChartCard>
          </div>
        </div>

        {/* IEEE Student Branch Data */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-zinc-200 mb-6 flex items-center gap-2"
          >
            <div className="w-1 h-6 bg-green-500 rounded" />
            {studentBranch.sectionName}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Count by Region and Grade" index={4}>
              <DatasetChart data={studentBranch} isInView={isInView} />
            </ChartCard>

            <ChartCard title="Count by Gender" index={5}>
              <GenderChart data={studentBranch} isInView={isInView} />
            </ChartCard>

            <ChartCard title="Count by Technology Focus Area" index={6}>
              <TechnologyFocusChart data={studentBranch} isInView={isInView} />
            </ChartCard>

            <ChartCard title="Count by Grade and Gender" index={7}>
              <GradeGenderChart data={studentBranch} isInView={isInView} />
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  );
}
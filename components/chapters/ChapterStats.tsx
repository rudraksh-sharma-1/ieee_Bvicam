"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { IEEEAnalytics } from "@/lib/chapter-details";
import { AreaChart, Area, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Dataset Chart - Vertical Bar Chart (Region × Grade)
function DatasetChart({ data, isInView }: { data: IEEEAnalytics; isInView: boolean }) {
  const gradeData = data.gradeDistribution;
  
  // Transform data for Recharts format
  const chartData = gradeData.map(item => ({
    name: item.grade.length > 12 ? item.grade.split(' ')[0] : item.grade,
    fullName: item.grade,
    count: item.count
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-blue-950/95 backdrop-blur-sm text-blue-50 text-xs px-3 py-2 rounded shadow-lg border border-blue-700/50">
          {payload[0].payload.fullName}: {payload[0].value}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="h-80 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.2} vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#93c5fd', fontSize: 14, fontWeight: 500 }}
            axisLine={{ stroke: '#60a5fa' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#93c5fd', fontSize: 14, fontWeight: 500 }}
            axisLine={{ stroke: '#60a5fa' }}
            tickLine={false}
            width={40}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
          <Bar 
            dataKey="count" 
            fill="url(#blueGradient)"
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
            animationBegin={0}
            isAnimationActive={isInView}
          />
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
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
        <div className="text-2xl font-bold text-white">{data.totalMembers}</div>
        <div className="text-xs text-blue-200/70">Total</div>
      </div>

      {hoveredSegment !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-blue-950/95 backdrop-blur-sm text-blue-50 text-xs px-3 py-2 rounded whitespace-nowrap shadow-lg z-20 border border-blue-700/50"
        >
          {genderData[hoveredSegment].label}: {genderData[hoveredSegment].value} ({genderData[hoveredSegment].percentage}%)
        </motion.div>
      )}
    </div>
  );
}

// Technology Focus Area
function TechnologyFocusChart({ data, isInView }: { data: IEEEAnalytics; isInView: boolean }) {
  const techData = data.technologyFocus;
  
  const chartData = techData.map(item => ({
    area: item.area,
    count: item.count
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-blue-950/95 backdrop-blur-sm text-blue-50 text-sm px-3 py-2 rounded shadow-lg border border-blue-700/50">
          <p className="font-semibold mb-1">{payload[0].payload.area}</p>
          <p>Count: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const CustomYAxisTick = ({ x, y, payload }: any) => {
    const maxLength = 35;
    const text = payload.value;
    const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  words.forEach((word: string) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length > maxLength && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // Limit to 2 lines
  const displayLines = lines.slice(0, 2);
  if (lines.length > 2) {
    displayLines[1] = displayLines[1] + '...';
  }
  
  return (
    <g transform={`translate(${x},${y})`}>
      {displayLines.map((line, index) => (
        <text 
          key={index}
          x={-10} 
          y={0} 
          dy={index * 12 - (displayLines.length - 1) * 6 + 4}
          textAnchor="end" 
          fill="#93c5fd" 
          fontSize={"12"}
        >
          {line}
        </text>
      ))}
    </g>
  );
  };

  return (
    <motion.div 
      className="h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 10,
            right: 30,
            left: 200,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.2} horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            tick={{ fill: '#93c5fd', fontSize: 11 }}
            axisLine={{ stroke: '#60a5fa' }}
            tickLine={{ stroke: '#60a5fa' }}
          />
          <YAxis 
            type="category" 
            dataKey="area"
            tick={<CustomYAxisTick />}
            axisLine={{ stroke: '#60a5fa' }}
            tickLine={{ stroke: '#60a5fa' }}
            width={1}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
          <defs>
            <linearGradient id="blueGradientHorizontal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <Bar 
            dataKey="count" 
            fill="url(#blueGradientHorizontal)"
            radius={[0, 4, 4, 0]}
            animationDuration={1000}
            isAnimationActive={isInView}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

// Grade × Gender
function GradeGenderChart({ data, isInView }: { data: IEEEAnalytics; isInView: boolean }) {
  const gradeGenderData = data.gradeGenderBreakdown;
  
  // Transform data for Recharts format
  const chartData = gradeGenderData.map(item => ({
    grade: item.grade.length > 12 ? item.grade.split(' ')[0] : item.grade,
    fullGrade: item.grade,
    male: item.male || 0,
    female: item.female || 0,
    unknown: item.unknown || 0,
    total: item.count
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      return (
        <div className="bg-blue-950/95 backdrop-blur-sm text-blue-50 text-lg px-3 py-2 rounded shadow-lg border border-blue-700/50">
          <p className="font-semibold mb-1">{payload[0]?.payload.fullGrade}</p>
          {payload.reverse().map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
          <p className="font-semibold mt-1 pt-1 border-t border-blue-700">
            Total: {total}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.2} />
          <XAxis 
            dataKey="grade" 
            tick={{ fill: '#93c5fd', fontSize: 14 }}
            axisLine={{ stroke: '#60a5fa' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#93c5fd', fontSize: 14 }}
            axisLine={{ stroke: '#60a5fa' }}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
            formatter={(value) => (
              <span className="text-blue-200/80 text-lg">{value}</span>
            )}
          />
          <Area 
            type="monotone" 
            dataKey="male" 
            stackId="1" 
            stroke="#7CC476" 
            fill="#7CC476"
            animationDuration={1000}
            isAnimationActive={isInView}
          />
          <Area 
            type="monotone" 
            dataKey="female" 
            stackId="1" 
            stroke="#fb923c" 
            fill="#fb923c"
            animationDuration={1000}
            animationBegin={100}
            isAnimationActive={isInView}
          />
          <Area 
            type="monotone" 
            dataKey="unknown" 
            stackId="1" 
            stroke="#7696C4" 
            fill="#7696C4"
            animationDuration={1000}
            animationBegin={200}
            isAnimationActive={isInView}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
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
      className="relative bg-blue-950/40 backdrop-blur-sm rounded-xl border-2 border-blue-700/40 p-4 transition-all duration-300 hover:border-blue-600/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:bg-blue-950/50"
    >
      <h3 className="text-sm font-semibold text-blue-100 mb-3">{title}</h3>
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
    <section ref={ref} className="relative py-16 sm:py-24 bg-gradient-to-b from-blue-900 via-blue-950 to-slate-950 overflow-hidden">
      {/* Smooth transition overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-900/50 to-transparent pointer-events-none" />
      
      {/* Pulsating background orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent mb-4">
            Chapter Insights
          </h2>
          <p className="text-blue-100/80 text-lg max-w-2xl mx-auto">
            IEEE Delhi Section & Student Branch Analytics
          </p>
        </motion.div>

        {/* Delhi Section Data */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-2"
          >
            <div className="w-1 h-6 bg-blue-400 rounded shadow-lg shadow-blue-400/50" />
            {delhiSection.sectionName}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="text-2xl font-bold text-blue-100 mb-6 flex items-center gap-2"
          >
            <div className="w-1 h-6 bg-green-400 rounded shadow-lg shadow-green-400/50" />
            {studentBranch.sectionName}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
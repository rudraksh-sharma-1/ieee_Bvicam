"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ChapterStat } from "@/lib/chapter-details";

// Lightweight count-up using RAF
function useCountUp(end: number, start: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      );

      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, duration]);

  return count;
}

// Bar Graph - Interactive vertical bars
function BarGraph({ value, isInView }: { value: number; isInView: boolean }) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  // Generate 12 months of data
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const base = value / 12;
    const variance = base * 0.3;
    return Math.floor(base + (Math.random() - 0.5) * variance);
  });

  const maxValue = Math.max(...monthlyData);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="h-48">
      <div className="flex items-end justify-between gap-1 h-40">
        {monthlyData.map((val, i) => {
          const height = (val / maxValue) * 100;
          
          return (
            <div key={i} className="relative flex-1 flex flex-col items-center group">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: isInView ? `${height}%` : 0 }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t cursor-pointer hover:from-blue-500 hover:to-blue-300 transition-colors relative"
              >
                {/* Tooltip */}
                {hoveredBar === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-100 text-xs px-2 py-1 rounded whitespace-nowrap z-20"
                  >
                    {months[i]}: {val}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-800" />
                  </motion.div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-zinc-600 mt-2 px-1">
        <span>{months[0]}</span>
        <span>{months[5]}</span>
        <span>{months[11]}</span>
      </div>
    </div>
  );
}

// Pie Chart - Donut style with segments
function PieChart({ value, isInView }: { value: number; isInView: boolean }) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  
  // Create segments that add up to the total value
  const segments = [
    { label: 'Completed', value: Math.floor(value * 0.6), color: 'rgb(59, 130, 246)' },
    { label: 'In Progress', value: Math.floor(value * 0.25), color: 'rgb(96, 165, 250)' },
    { label: 'Planned', value: Math.floor(value * 0.15), color: 'rgb(147, 197, 253)' },
  ];

  const total = segments.reduce((sum, seg) => sum + seg.value, 0);
  let currentAngle = -90; // Start from top

  return (
    <div className="relative flex items-center justify-center h-64">
      <svg width="200" height="200" className="transform">
        {segments.map((segment, i) => {
          const percentage = (segment.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const radius = 70;
          const circumference = 2 * Math.PI * radius;
          const strokeDasharray = `${(angle / 360) * circumference} ${circumference}`;
          const rotation = currentAngle;
          
          currentAngle += angle;

          return (
            <motion.circle
              key={i}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="20"
              strokeDasharray={strokeDasharray}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: isInView ? 0 : circumference }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '100px 100px' }}
              onMouseEnter={() => setHoveredSegment(i)}
              onMouseLeave={() => setHoveredSegment(null)}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
          );
        })}
      </svg>
      
      {/* Center display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-3xl font-bold text-zinc-100">{total}</div>
        <div className="text-xs text-zinc-400">Total</div>
      </div>

      {/* Legend with hover info */}
      {hoveredSegment !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-100 text-xs px-3 py-2 rounded whitespace-nowrap"
        >
          {segments[hoveredSegment].label}: {segments[hoveredSegment].value}
        </motion.div>
      )}
    </div>
  );
}

// Progress Chart - Horizontal progress bar with gradient
function ProgressChart({ value, max, isInView }: { value: number; max: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = (value / max) * 100;
  
  return (
    <div 
      className="space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main progress bar */}
      <div className="relative">
        <div className="h-8 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isInView ? `${percentage}%` : 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 relative"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
        
        {/* Value label */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-sm font-bold"
          style={{ color: percentage > 50 ? 'white' : 'rgb(161, 161, 170)' }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {value} / {max}
        </motion.div>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-between text-xs text-zinc-600">
        <span>0</span>
        <span className="text-zinc-400">{Math.round(percentage)}% Complete</span>
        <span>{max}</span>
      </div>

      {/* Milestone markers */}
      <div className="relative h-2">
        {[25, 50, 75].map((milestone) => (
          <div
            key={milestone}
            className="absolute top-0 h-2 w-px bg-zinc-700"
            style={{ left: `${milestone}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Stock Chart - Line chart with area fill
function StockChart({ value, isInView }: { value: number; isInView: boolean }) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  
  // Generate 30 days of trend data
  const dataPoints = Array.from({ length: 30 }, (_, i) => {
    const trend = i / 30; // Upward trend
    const base = value * (0.5 + trend * 0.5);
    const variance = base * 0.15;
    return base + (Math.random() - 0.5) * variance;
  });

  const maxValue = Math.max(...dataPoints);
  const minValue = Math.min(...dataPoints);
  const range = maxValue - minValue;

  const points = dataPoints.map((val, i) => {
    const x = (i / (dataPoints.length - 1)) * 100;
    const y = 100 - ((val - minValue) / range) * 100;
    return { x, y, value: Math.floor(val) };
  });

  const pathD = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');

  return (
    <div className="h-48 relative">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="rgb(39, 39, 42)"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Area under the line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 0.3 : 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          d={`${pathD} L 100 100 L 0 100 Z`}
          fill="url(#stockGradient)"
        />

        {/* Line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          d={pathD}
          fill="none"
          stroke="rgb(34, 197, 94)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 1.5 + i * 0.02 }}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill="rgb(34, 197, 94)"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <defs>
          <linearGradient id="stockGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Tooltip */}
      {hoveredPoint !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bg-zinc-800 text-zinc-100 text-xs px-2 py-1 rounded pointer-events-none z-20"
          style={{
            left: `${points[hoveredPoint].x}%`,
            top: `${points[hoveredPoint].y}%`,
            transform: 'translate(-50%, -120%)'
          }}
        >
          Day {hoveredPoint + 1}: {points[hoveredPoint].value}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-800" />
        </motion.div>
      )}

      {/* Trend indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-green-500">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Trending Up
      </div>
    </div>
  );
}

// Stat Card Components
function LargeStatCard({ 
  stat, 
  index, 
  chartType 
}: { 
  stat: ChapterStat; 
  index: number; 
  chartType: 'bar' | 'stock' 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(stat.value, isInView, 1500);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative bg-zinc-900 rounded-xl border border-zinc-800 p-6 transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden group"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-4xl font-bold text-zinc-100 mb-1">
              {count}
              {stat.unit && <span className="text-zinc-400 text-2xl ml-1">{stat.unit}</span>}
            </div>
            <h3 className="text-lg font-semibold text-zinc-300">
              {stat.label}
            </h3>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          {stat.description}
        </p>
      </div>

      {/* Chart */}
     {/*  {chartType === 'bar' && <BarGraph value={stat.value} isInView={isInView} />}
      {chartType === 'stock' && <StockChart value={stat.value} isInView={isInView} />} */}
    </motion.div>
  );
}

function SmallStatCard({ 
  stat, 
  index, 
  chartType 
}: { 
  stat: ChapterStat; 
  index: number; 
  chartType: 'pie' | 'progress' 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(stat.value, isInView, 1500);
  const maxValue = Math.ceil(stat.value * 1.5 / 10) * 10;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative bg-zinc-900 rounded-xl border border-zinc-800 p-6 transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden group"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-zinc-100 mb-1">
          {count}
          {stat.unit && <span className="text-zinc-400 text-xl ml-1">{stat.unit}</span>}
        </div>
        <h3 className="text-base font-semibold text-zinc-300 mb-2">
          {stat.label}
        </h3>
        <p className="text-sm text-zinc-500">
          {stat.description}
        </p>
      </div>

      {/* Chart */}
      {/* {chartType === 'pie' && <PieChart value={stat.value} isInView={isInView} />}
      {chartType === 'progress' && <ProgressChart value={stat.value} max={maxValue} isInView={isInView} />} */}
    </motion.div>
  );
}

interface ChapterStatsProps {
  stats: ChapterStat[];
}

export default function ChapterStats({ stats }: ChapterStatsProps) {
  return (
    <section className="relative py-16 sm:py-24 bg-zinc-950">
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
            Quantifying our impact and engagement through data
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First stat - Bar chart (spans 2 columns on large screens) */}
          {stats[0] && (
            <div className="lg:col-span-2">
              <LargeStatCard stat={stats[0]} index={0} chartType="bar" />
            </div>
          )}

          {/* Second stat - Pie chart */}
          {stats[1] && (
            <div>
              <SmallStatCard stat={stats[1]} index={1} chartType="pie" />
            </div>
          )}

          {/* Third stat - Progress chart */}
          {stats[2] && (
            <div>
              <SmallStatCard stat={stats[2]} index={2} chartType="progress" />
            </div>
          )}

          {/* Fourth stat - Stock chart (spans 2 columns on large screens) */}
          {stats[3] && (
            <div className="lg:col-span-2">
              <LargeStatCard stat={stats[3]} index={3} chartType="stock" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
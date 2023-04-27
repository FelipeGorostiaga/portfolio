import styles from './SkillPieChart.module.scss';
import React from 'react';

interface PieChartProps {
  percentage: number;
  width: string;
  color?: string;
}

const SkillPieChart = ({ percentage, width, color = '#2563eb' }: PieChartProps) => {
  return (
    <div className={`${styles.pie} ${styles.animate} text-sm md:text-base lg:text-lg text-neutral-900 font-semibold dark:text-neutral-200`} style={{
      '--p': percentage,
      '--c': color,
      '--w': width
    } as React.CSSProperties}>{percentage}%</div>
  );
};

export default SkillPieChart;

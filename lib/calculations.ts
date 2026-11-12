export type HeatmapIntensityLevel = 0 | 1 | 2 | 3 | 4;

export interface HeatmapCell {
  date: string;          // YYYY-MM-DD
  amount: number;        // Total effort logged on this day
  intensity: HeatmapIntensityLevel;
  entryCount: number;    // Number of individual logs
  dayOfWeek: number;     // 0 = Monday, 6 = Sunday
}

export interface HeatmapWeek {
  weekIndex: number;
  days: (HeatmapCell | null)[]; // 7 days (Mon-Sun); null for padding
}

export interface HabitProgressSummary {
  totalEffort: number;
  targetValue: number;
  percentage: number;
  remainingEffort: number;
  visualPercentage: number;
  isCompleted: boolean;
}

export function calculateHabitProgress(
  targetValue: number,
  entries: { amount: number | string }[]
): HabitProgressSummary {
  // Sum entries with precision handling (converting string or number)
  const rawTotal = entries.reduce((acc, entry) => {
    const val = typeof entry.amount === 'string' ? parseFloat(entry.amount) : entry.amount;
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  // Round to 3 decimal places to prevent IEEE-754 floating point artifacts
  const totalEffort = Math.round(rawTotal * 1000) / 1000;

  if (targetValue <= 0) {
    return {
      totalEffort,
      targetValue,
      percentage: 0,
      remainingEffort: 0,
      visualPercentage: 0,
      isCompleted: false,
    };
  }

  const rawPercentage = (totalEffort / targetValue) * 100;
  const percentage = Math.round(rawPercentage * 10) / 10; // e.g. 30.8%
  const remainingEffort = Math.max(0, Math.round((targetValue - totalEffort) * 1000) / 1000);
  const visualPercentage = Math.min(100, Math.max(0, percentage));
  const isCompleted = totalEffort >= targetValue;

  return {
    totalEffort,
    targetValue,
    percentage,
    remainingEffort,
    visualPercentage,
    isCompleted,
  };
}

export function calculateDailyIntensity(
  dailyAmount: number,
  targetValue: number
): HeatmapIntensityLevel {
  if (dailyAmount <= 0) return 0;

  // Expected daily benchmark (target distributed across 60 active effort days)
  const benchmark = Math.max(1, targetValue / 60);

  if (dailyAmount < benchmark * 0.25) return 1;
  if (dailyAmount < benchmark * 0.75) return 2;
  if (dailyAmount < benchmark * 1.5)  return 3;
  return 4;
}

import { addDaysToDateString, getLocalDateString } from './date-utils';
import { calculateDailyIntensity, HeatmapCell, HeatmapWeek } from './calculations';

export function buildHeatmapCalendar(
  targetValue: number,
  entries: { amount: number | string; entry_date: string }[],
  endDateStr: string = getLocalDateString()
): { weeks: HeatmapWeek[]; totalLoggedDays: number } {
  // 1. Group & sum entries by date
  const dateTotals = new Map<string, { amount: number; count: number }>();
  for (const entry of entries) {
    const val = typeof entry.amount === 'string' ? parseFloat(entry.amount) : entry.amount;
    const existing = dateTotals.get(entry.entry_date) || { amount: 0, count: 0 };
    dateTotals.set(entry.entry_date, {
      amount: existing.amount + (isNaN(val) ? 0 : val),
      count: existing.count + 1,
    });
  }

  // 2. Determine start date: 52 weeks (364 days) before endDateStr aligned to Monday
  const [endY, endM, endD] = endDateStr.split('-').map(Number);
  const endDate = new Date(endY, endM - 1, endD);
  const endDayOfWeek = (endDate.getDay() + 6) % 7; // Convert 0(Sun)..6(Sat) to 0(Mon)..6(Sun)

  // Start 52 complete weeks before the current week's Monday
  const daysBack = (52 * 7) + endDayOfWeek;
  const startDateStr = addDaysToDateString(endDateStr, -daysBack);

  // 3. Build daily cells
  const cells: HeatmapCell[] = [];
  let currentDate = startDateStr;
  let totalLoggedDays = 0;

  for (let i = 0; i <= daysBack; i++) {
    const data = dateTotals.get(currentDate) || { amount: 0, count: 0 };
    if (data.amount > 0) totalLoggedDays++;

    const [y, m, d] = currentDate.split('-').map(Number);
    const dayOfWeek = (new Date(y, m - 1, d).getDay() + 6) % 7; // 0 = Mon, 6 = Sun

    cells.push({
      date: currentDate,
      amount: Math.round(data.amount * 1000) / 1000,
      intensity: calculateDailyIntensity(data.amount, targetValue),
      entryCount: data.count,
      dayOfWeek,
    });

    currentDate = addDaysToDateString(currentDate, 1);
  }

  // 4. Chunk cells into 52+ weeks
  const weeks: HeatmapWeek[] = [];
  let currentWeekDays: (HeatmapCell | null)[] = [];
  let weekIndex = 0;

  for (const cell of cells) {
    currentWeekDays.push(cell);
    if (currentWeekDays.length === 7) {
      weeks.push({ weekIndex: weekIndex++, days: currentWeekDays });
      currentWeekDays = [];
    }
  }

  if (currentWeekDays.length > 0) {
    while (currentWeekDays.length < 7) {
      currentWeekDays.push(null);
    }
    weeks.push({ weekIndex: weekIndex++, days: currentWeekDays });
  }

  return { weeks, totalLoggedDays };
}


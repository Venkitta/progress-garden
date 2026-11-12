export type HabitStatus = 'active' | 'archived';

export interface Profile {
  id: string; // matches auth.users.id
  display_name: string | null;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  unit: string;
  target_value: number;
  status: HabitStatus;
  created_at: string;
  updated_at: string;
}

export interface ProgressEntry {
  id: string;
  habit_id: string;
  user_id: string;
  amount: number;
  entry_date: string; // YYYY-MM-DD
  note: string | null;
  created_at: string;
  updated_at: string;
}

// Aggregated habit with progress statistics for dashboard cards
export interface HabitWithProgress extends Habit {
  total_progress: number;
  progress_percentage: number;
  remaining_effort: number;
  is_completed: boolean;
  entries_count: number;
  recent_entries: ProgressEntry[];
}


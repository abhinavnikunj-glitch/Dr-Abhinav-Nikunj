export type SlotCategory = 
  | 'HIGH_YIELD_NOTES'
  | 'ACTIVE_MCQ'
  | 'PASSIVE_REVISION'
  | 'VOLATILE_FINAL'
  | 'CUSTOM';

export interface SlotItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Slot {
  id: string;
  dayId: string;
  slotNumber: number;
  title: string;
  timeRange: string;
  category: SlotCategory;
  durationMinutes: number;
  remainingSeconds: number;
  isTimerRunning: boolean;
  items: SlotItem[];
  isCompleted: boolean;
  isBacklog: boolean;
  notes?: string;
}

export interface DaySchedule {
  id: string;
  dateLabel: string;
  dayNumber: number;
  title: string;
  protocolSummary: string;
  isGoldenDay?: boolean;
  slots: Slot[];
}

export interface UserProfile {
  fullName: string;
  title: string; // e.g. "Dr. Aspirant"
  rollNo: string;
  dreamBranch: string; // e.g. "MD Radiodiagnosis"
  targetRank: string;
  examDate: string; // "2026-08-30"
  dailyGoalHours: number;
  avatarIcon: string;
  joinedAt: string;
}

export interface VaultNote {
  id: string;
  title: string;
  subject: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  lastModified: number;
  highYieldLevel: 'CRITICAL' | 'VERY_HIGH' | 'HIGH';
}

export type SpotterCategory = 
  | 'ALL'
  | 'RADIOLOGY'
  | 'HISTOPATH'
  | 'DERMATOLOGY'
  | 'INSTRUMENTS'
  | 'CLINICAL_SCORES'
  | 'PHARMA_DOCS'
  | 'ONCOLOGY_STAGING';

export interface SpotterItem {
  id: string;
  title: string;
  subject: string;
  category: SpotterCategory;
  highYieldSummary: string;
  keyFeatures: string[];
  classicBuzzwords: string[];
  examTrapWarning?: string;
  visualType: 'SVG_DIAGRAM' | 'SVG_CHEST_XRAY' | 'SVG_BRAIN_CT' | 'SVG_HISTO_SLIDE' | 'SVG_DERMA_LESION' | 'SVG_INSTRUMENT' | 'CALCULATOR_TABLE';
  scoreCalculatorData?: {
    type: 'GCS' | 'CURB65' | 'WELLS_DVT' | 'CHILD_PUGH' | 'ALVARADO' | 'APGAR';
  };
  detailsTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface StudySessionLog {
  date: string; // YYYY-MM-DD
  secondsStudied: number;
  completedSlotsCount: number;
  totalSlotsCount: number;
  mcqsAttempted: number;
}

export interface MasterTimerState {
  isRunning: boolean;
  totalDailySeconds: number;
  mode: 'STOPWATCH' | 'POMODORO_50' | 'POMODORO_90' | 'DEEP_240';
  pomodoroRemainingSeconds: number;
  activeSlotId: string | null;
  lastTickTimestamp: number;
}

export type ActiveTab = 'SCHEDULE' | 'VAULT' | 'BACKLOG' | 'SPOTTERS' | 'ANALYTICS';

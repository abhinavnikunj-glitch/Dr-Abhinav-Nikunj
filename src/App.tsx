import React, { useState, useEffect, useRef } from 'react';
import { DaySchedule, UserProfile, VaultNote, ActiveTab, Slot, SlotCategory } from './types';
import { DEFAULT_SYLLABUS } from './data/defaultSyllabus';
import { DEFAULT_VAULT_NOTES } from './data/defaultVault';
import { HeaderCockpit } from './components/HeaderCockpit';
import { BottomNav } from './components/BottomNav';
import { ScheduleView } from './components/ScheduleView';
import { VolatileVaultView } from './components/VolatileVaultView';
import { BacklogTrackerView } from './components/BacklogTrackerView';
import { SpottersExplorerView } from './components/SpottersExplorerView';
import { AnalyticsView } from './components/AnalyticsView';
import { ProfileModal } from './components/ProfileModal';
import { MasterTimerModal } from './components/MasterTimerModal';
import { AddCustomSlotModal } from './components/AddCustomSlotModal';
import { BackupModal } from './components/BackupModal';
import { soundEngine } from './services/sound';

const STORAGE_KEY_PROFILE = 'dendrites_profile_v1';
const STORAGE_KEY_DAYS = 'dendrites_days_v1';
const STORAGE_KEY_VAULT = 'dendrites_vault_v1';
const STORAGE_KEY_SECONDS = 'dendrites_study_seconds_v1';
const STORAGE_KEY_SOUND = 'dendrites_sound_v1';

export default function App() {
  // 1. User Profile State
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      fullName: 'Abhinav Nikunj',
      title: 'Dr.',
      rollNo: 'NEETPG-2026-8941',
      dreamBranch: 'MD Radiodiagnosis',
      targetRank: 'AIR < 200',
      examDate: '2026-08-30',
      dailyGoalHours: 12,
      avatarIcon: 'default',
      joinedAt: new Date().toISOString()
    };
  });

  // 2. Syllabus & Days State
  const [days, setDays] = useState<DaySchedule[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DAYS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return DEFAULT_SYLLABUS;
  });

  // 3. Volatile Vault State
  const [vaultNotes, setVaultNotes] = useState<VaultNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VAULT);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return DEFAULT_VAULT_NOTES;
  });

  // 4. Master Cumulative Study Seconds State
  const [totalStudySeconds, setTotalStudySeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SECONDS);
      if (saved) return parseInt(saved, 10) || 0;
    } catch {
      // Ignore
    }
    return 0;
  });

  // 5. Sound Effects Toggle State
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SOUND);
      if (saved !== null) return saved === 'true';
    } catch {
      // Ignore
    }
    return true;
  });

  // UI Navigation & Modals State
  const [activeTab, setActiveTab] = useState<ActiveTab>('SCHEDULE');
  const [selectedDayId, setSelectedDayId] = useState<string>('day-1');
  const [isMasterTimerRunning, setIsMasterTimerRunning] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState<boolean>(false);
  const [isAddSlotModalOpen, setIsAddSlotModalOpen] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);

  // Synchronize sound setting with engine
  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
    localStorage.setItem(STORAGE_KEY_SOUND, String(soundEnabled));
  }, [soundEnabled]);

  // Persist Profile
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  }, [profile]);

  // Persist Days & Syllabus
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DAYS, JSON.stringify(days));
  }, [days]);

  // Persist Vault Notes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_VAULT, JSON.stringify(vaultNotes));
  }, [vaultNotes]);

  // Persist Study Seconds
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SECONDS, String(totalStudySeconds));
  }, [totalStudySeconds]);

  // Active Master Study Timer Loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isMasterTimerRunning) {
      timer = setInterval(() => {
        setTotalStudySeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isMasterTimerRunning]);

  // Individual Active Slot Countdown Timers Loop
  useEffect(() => {
    let slotTimer: NodeJS.Timeout | null = null;
    const hasRunningSlot = days.some(d => d.slots.some(s => s.isTimerRunning));

    if (hasRunningSlot) {
      slotTimer = setInterval(() => {
        setDays(prevDays =>
          prevDays.map(day => ({
            ...day,
            slots: day.slots.map(slot => {
              if (slot.isTimerRunning) {
                if (slot.remainingSeconds <= 1) {
                  soundEngine.playAlarm();
                  return { ...slot, remainingSeconds: 0, isTimerRunning: false };
                }
                return { ...slot, remainingSeconds: slot.remainingSeconds - 1 };
              }
              return slot;
            })
          }))
        );
      }, 1000);
    }

    return () => {
      if (slotTimer) clearInterval(slotTimer);
    };
  }, [days]);

  // Handlers for Slots
  const handleToggleSlotTimer = (slotId: string) => {
    setDays(prevDays =>
      prevDays.map(day => ({
        ...day,
        slots: day.slots.map(slot => {
          if (slot.id === slotId) {
            const nextRunning = !slot.isTimerRunning;
            // Also sync master study timer if starting slot
            if (nextRunning && !isMasterTimerRunning) {
              setIsMasterTimerRunning(true);
            }
            return { ...slot, isTimerRunning: nextRunning };
          }
          return slot;
        })
      }))
    );
  };

  const handleResetSlotTimer = (slotId: string) => {
    setDays(prevDays =>
      prevDays.map(day => ({
        ...day,
        slots: day.slots.map(slot => {
          if (slot.id === slotId) {
            return {
              ...slot,
              remainingSeconds: slot.durationMinutes * 60,
              isTimerRunning: false
            };
          }
          return slot;
        })
      }))
    );
  };

  const handleToggleSlotItem = (slotId: string, itemId: string) => {
    setDays(prevDays =>
      prevDays.map(day => ({
        ...day,
        slots: day.slots.map(slot => {
          if (slot.id === slotId) {
            const updatedItems = slot.items.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            );
            // Auto complete slot if all items are checked
            const allChecked = updatedItems.length > 0 && updatedItems.every(i => i.completed);
            return {
              ...slot,
              items: updatedItems,
              isCompleted: allChecked ? true : slot.isCompleted
            };
          }
          return slot;
        })
      }))
    );
  };

  const handleToggleSlotCompleted = (slotId: string) => {
    setDays(prevDays =>
      prevDays.map(day => ({
        ...day,
        slots: day.slots.map(slot => {
          if (slot.id === slotId) {
            const nextCompleted = !slot.isCompleted;
            return {
              ...slot,
              isCompleted: nextCompleted,
              isBacklog: nextCompleted ? false : slot.isBacklog,
              isTimerRunning: false,
              items: nextCompleted ? slot.items.map(i => ({ ...i, completed: true })) : slot.items
            };
          }
          return slot;
        })
      }))
    );
  };

  const handleToggleSlotBacklog = (slotId: string) => {
    setDays(prevDays =>
      prevDays.map(day => ({
        ...day,
        slots: day.slots.map(slot => {
          if (slot.id === slotId) {
            return { ...slot, isBacklog: !slot.isBacklog };
          }
          return slot;
        })
      }))
    );
  };

  const handleAddSlotItem = (slotId: string, text: string) => {
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text,
      completed: false
    };

    setDays(prevDays =>
      prevDays.map(day => ({
        ...day,
        slots: day.slots.map(slot => {
          if (slot.id === slotId) {
            return { ...slot, items: [...slot.items, newItem] };
          }
          return slot;
        })
      }))
    );
  };

  const handleDeleteSlotItem = (slotId: string, itemId: string) => {
    setDays(prevDays =>
      prevDays.map(day => ({
        ...day,
        slots: day.slots.map(slot => {
          if (slot.id === slotId) {
            return { ...slot, items: slot.items.filter(i => i.id !== itemId) };
          }
          return slot;
        })
      }))
    );
  };

  const handleAddCustomSlot = (
    dayId: string,
    slotData: {
      title: string;
      timeRange: string;
      category: SlotCategory;
      durationMinutes: number;
      subTargetsText: string;
    }
  ) => {
    const lines = slotData.subTargetsText
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    const items = lines.length > 0
      ? lines.map((line, idx) => ({
          id: `custom-item-${Date.now()}-${idx}`,
          text: line,
          completed: false
        }))
      : [{ id: `custom-item-${Date.now()}-0`, text: 'Review high-yield flashcards & solve MCQs', completed: false }];

    const newSlot: Slot = {
      id: `custom-slot-${Date.now()}`,
      dayId,
      slotNumber: 4, // custom
      title: slotData.title,
      timeRange: slotData.timeRange,
      category: slotData.category,
      durationMinutes: slotData.durationMinutes,
      remainingSeconds: slotData.durationMinutes * 60,
      isTimerRunning: false,
      isCompleted: false,
      isBacklog: false,
      items
    };

    setDays(prevDays =>
      prevDays.map(day => {
        if (day.id === dayId) {
          return { ...day, slots: [...day.slots, newSlot] };
        }
        return day;
      })
    );
  };

  const handleDeleteCustomSlot = (slotId: string) => {
    setDays(prevDays =>
      prevDays.map(day => ({
        ...day,
        slots: day.slots.filter(s => s.id !== slotId)
      }))
    );
  };

  // Handlers for Vault Notes
  const handleSaveVaultNote = (note: VaultNote) => {
    setVaultNotes(prev => {
      const exists = prev.some(n => n.id === note.id);
      if (exists) {
        return prev.map(n => (n.id === note.id ? note : n));
      }
      return [note, ...prev];
    });
  };

  const handleDeleteVaultNote = (noteId: string) => {
    setVaultNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const handleTogglePinVaultNote = (noteId: string) => {
    setVaultNotes(prev =>
      prev.map(n => (n.id === noteId ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  // Data Export & Import
  const handleExportData = () => {
    const exportBundle = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile,
      days,
      vaultNotes,
      totalStudySeconds
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DENDRITES_NEETPG_BACKUP_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.days && Array.isArray(parsed.days)) setDays(parsed.days);
      if (parsed.vaultNotes && Array.isArray(parsed.vaultNotes)) setVaultNotes(parsed.vaultNotes);
      if (typeof parsed.totalStudySeconds === 'number') setTotalStudySeconds(parsed.totalStudySeconds);
      return true;
    } catch {
      return false;
    }
  };

  const handleResetToDefaults = () => {
    setDays(DEFAULT_SYLLABUS);
    setVaultNotes(DEFAULT_VAULT_NOTES);
    setTotalStudySeconds(0);
    localStorage.removeItem(STORAGE_KEY_DAYS);
    localStorage.removeItem(STORAGE_KEY_VAULT);
    localStorage.removeItem(STORAGE_KEY_SECONDS);
  };

  // Counts for dock badges
  const allSlots = days.flatMap(d => d.slots);
  const backlogCount = allSlots.filter(s => s.isBacklog && !s.isCompleted).length;
  const completedSlotsCount = allSlots.filter(s => s.isCompleted).length;
  const totalSlotsCount = allSlots.length;
  const currentDaySlots = days.find(d => d.id === selectedDayId)?.slots || [];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 cyber-grid-bg selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Cockpit Header */}
      <HeaderCockpit
        profile={profile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        totalStudySeconds={totalStudySeconds}
        isTimerRunning={isMasterTimerRunning}
        onToggleTimer={() => setIsMasterTimerRunning(!isMasterTimerRunning)}
        onOpenTimerModal={() => setIsTimerModalOpen(true)}
        onOpenBackup={() => setIsBackupModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        completedSlotsCount={completedSlotsCount}
        totalSlotsCount={totalSlotsCount}
      />

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto pt-3 sm:pt-4">
        {activeTab === 'SCHEDULE' && (
          <ScheduleView
            days={days}
            selectedDayId={selectedDayId}
            onSelectDay={setSelectedDayId}
            onToggleSlotTimer={handleToggleSlotTimer}
            onResetSlotTimer={handleResetSlotTimer}
            onToggleSlotItem={handleToggleSlotItem}
            onToggleSlotCompleted={handleToggleSlotCompleted}
            onToggleSlotBacklog={handleToggleSlotBacklog}
            onAddSlotItem={handleAddSlotItem}
            onDeleteSlotItem={handleDeleteSlotItem}
            onOpenAddSlotModal={() => setIsAddSlotModalOpen(true)}
            onDeleteCustomSlot={handleDeleteCustomSlot}
          />
        )}

        {activeTab === 'VAULT' && (
          <VolatileVaultView
            notes={vaultNotes}
            onSaveNote={handleSaveVaultNote}
            onDeleteNote={handleDeleteVaultNote}
            onTogglePin={handleTogglePinVaultNote}
          />
        )}

        {activeTab === 'BACKLOG' && (
          <BacklogTrackerView
            days={days}
            onToggleSlotCompleted={handleToggleSlotCompleted}
            onToggleSlotBacklog={handleToggleSlotBacklog}
            onToggleSlotItem={handleToggleSlotItem}
            onNavigateToDay={(dayId) => {
              setSelectedDayId(dayId);
              setActiveTab('SCHEDULE');
            }}
          />
        )}

        {activeTab === 'SPOTTERS' && (
          <SpottersExplorerView />
        )}

        {activeTab === 'ANALYTICS' && (
          <AnalyticsView
            days={days}
            totalStudySeconds={totalStudySeconds}
            profile={profile}
          />
        )}
      </main>

      {/* Bottom Navigation Dock */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        backlogCount={backlogCount}
        vaultNotesCount={vaultNotes.length}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={setProfile}
      />

      {/* Master Focus Timer Expanded Cockpit */}
      <MasterTimerModal
        isOpen={isTimerModalOpen}
        onClose={() => setIsTimerModalOpen(false)}
        totalDailySeconds={totalStudySeconds}
        isRunning={isMasterTimerRunning}
        onToggleRun={() => setIsMasterTimerRunning(!isMasterTimerRunning)}
        onResetTimer={() => setTotalStudySeconds(0)}
        dailyGoalHours={profile.dailyGoalHours}
        activeSlots={currentDaySlots}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Add Custom Slot Modal */}
      <AddCustomSlotModal
        isOpen={isAddSlotModalOpen}
        onClose={() => setIsAddSlotModalOpen(false)}
        days={days}
        selectedDayId={selectedDayId}
        onAddSlot={handleAddCustomSlot}
      />

      {/* Offline Backup Modal */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onResetToDefaults={handleResetToDefaults}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { X, HardDriveDownload, Upload, Download, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../services/sound';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportData: () => void;
  onImportData: (jsonData: string) => boolean;
  onResetToDefaults: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  onExportData,
  onImportData,
  onResetToDefaults
}) => {
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');

  if (!isOpen) return null;

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    if (!importJsonText.trim()) return;

    const success = onImportData(importJsonText.trim());
    if (success) {
      setImportStatus('SUCCESS');
      setTimeout(() => {
        setImportStatus('IDLE');
        onClose();
      }, 1000);
    } else {
      setImportStatus('ERROR');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportJsonText(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0a0f1d] border border-cyan-500/30 p-6 glow-cyan shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <HardDriveDownload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-orbitron font-bold text-white tracking-wide">
                OFFLINE DATA PERSISTENCE
              </h2>
              <p className="text-xs text-slate-400 font-mono">Export, Backup & Restore Synaptic Memory Data</p>
            </div>
          </div>
          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1 text-xs">
          {/* Export Section */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-mono font-bold text-white text-sm flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-cyan-400" />
                  EXPORT FULL PROGRESS (.JSON)
                </h3>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Downloads your complete profile, 6-day slots, custom sub-targets, vault notes, and focus seconds.
                </p>
              </div>
              <button
                onClick={() => { soundEngine.playClick(); onExportData(); }}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold rounded-xl shadow-md shadow-cyan-500/20 whitespace-nowrap"
              >
                DOWNLOAD
              </button>
            </div>
          </div>

          {/* Import Section */}
          <form onSubmit={handleImportSubmit} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-mono font-bold text-white text-sm flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-emerald-400" />
                RESTORE FROM BACKUP
              </h3>
              <label className="px-3 py-1 bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-300 font-mono text-[11px] rounded-lg cursor-pointer">
                Choose File
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <textarea
              rows={4}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Or paste backup JSON payload here..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-400 placeholder:text-slate-600"
            />

            {importStatus === 'SUCCESS' && (
              <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Successfully restored all data from backup!
              </div>
            )}

            {importStatus === 'ERROR' && (
              <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Invalid JSON backup file structure. Please verify.
              </div>
            )}

            <button
              type="submit"
              disabled={!importJsonText.trim()}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-mono font-bold rounded-xl shadow-md transition-all"
            >
              RESTORE DATA
            </button>
          </form>

          {/* Reset Defaults */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-center justify-between gap-3">
            <div>
              <h4 className="font-mono font-bold text-rose-300 text-xs">RESET TO DEFAULT PROTOCOL</h4>
              <p className="text-slate-400 text-[11px]">Re-initializes default 24-29 Aug syllabus & vault notes.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm('Reset entire revision schedule to default 24-29 Aug syllabus? This clears current checkmarks.')) {
                  soundEngine.playClick();
                  onResetToDefaults();
                  onClose();
                }
              }}
              className="px-3 py-1.5 bg-rose-900/80 hover:bg-rose-800 border border-rose-500/50 text-rose-200 font-mono font-bold rounded-xl text-xs"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

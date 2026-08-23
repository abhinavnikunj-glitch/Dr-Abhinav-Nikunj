import React, { useState } from 'react';
import { VaultNote } from '../types';
import { Search, Plus, Pin, Trash2, Edit3, Copy, Check, Sparkles, BookMarked, Tag, Flame, ShieldAlert, FileText, ChevronRight } from 'lucide-react';
import { soundEngine } from '../services/sound';

interface VolatileVaultViewProps {
  notes: VaultNote[];
  onSaveNote: (note: VaultNote) => void;
  onDeleteNote: (noteId: string) => void;
  onTogglePin: (noteId: string) => void;
}

export const VolatileVaultView: React.FC<VolatileVaultViewProps> = ({
  notes,
  onSaveNote,
  onDeleteNote,
  onTogglePin
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(notes[0]?.id || null);
  const [isEditing, setIsEditing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Edit buffer
  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];
  const [editTitle, setEditTitle] = useState(activeNote?.title || '');
  const [editSubject, setEditSubject] = useState(activeNote?.subject || '');
  const [editContent, setEditContent] = useState(activeNote?.content || '');
  const [editLevel, setEditLevel] = useState<'CRITICAL' | 'VERY_HIGH' | 'HIGH'>(activeNote?.highYieldLevel || 'CRITICAL');
  const [editTags, setEditTags] = useState(activeNote?.tags?.join(', ') || '');

  // Keep editor in sync when switching active note
  const handleSelectNote = (note: VaultNote) => {
    soundEngine.playClick();
    setActiveNoteId(note.id);
    setEditTitle(note.title);
    setEditSubject(note.subject);
    setEditContent(note.content);
    setEditLevel(note.highYieldLevel);
    setEditTags(note.tags.join(', '));
    setIsEditing(false);
  };

  const handleCreateNew = () => {
    soundEngine.playClick();
    const newNote: VaultNote = {
      id: `vault-custom-${Date.now()}`,
      title: 'New Volatile Note (e.g. Enzymes / Staging)',
      subject: 'Pharmacology',
      tags: ['Volatile', 'NEET PG'],
      content: '### Key High-Yield Points\n- Point 1\n- Point 2\n\n| Classification | Drug of Choice |\n| :--- | :--- |\n| Type A | Drug X |',
      isPinned: false,
      lastModified: Date.now(),
      highYieldLevel: 'CRITICAL'
    };
    onSaveNote(newNote);
    setActiveNoteId(newNote.id);
    setEditTitle(newNote.title);
    setEditSubject(newNote.subject);
    setEditContent(newNote.content);
    setEditLevel(newNote.highYieldLevel);
    setEditTags(newNote.tags.join(', '));
    setIsEditing(true);
  };

  const handleSaveCurrent = () => {
    if (!activeNoteId) return;
    soundEngine.playClick();
    const updated: VaultNote = {
      id: activeNoteId,
      title: editTitle.trim() || 'Untitled Note',
      subject: editSubject.trim() || 'General',
      content: editContent,
      tags: editTags.split(',').map(t => t.trim()).filter(Boolean),
      isPinned: activeNote?.isPinned || false,
      lastModified: Date.now(),
      highYieldLevel: editLevel
    };
    onSaveNote(updated);
    setIsEditing(false);
  };

  const handleCopyContent = (text: string, id: string) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const subjects = ['ALL', 'Pharmacology', 'FMT & Pharma', 'Pathology & Hematology', 'Biochemistry', 'PSM & Preventive Medicine', 'Medicine & Surgery'];

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'ALL' || n.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  }).sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div className="mx-3 sm:mx-6 space-y-4 pb-28">
      {/* Vault Hero Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#0a0f1d] border border-cyan-500/30 glow-cyan-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5" />
              VOLATILE VAULT
            </span>
            <span className="text-xs font-mono text-slate-400">
              Offline Synaptic Memory Bank
            </span>
          </div>
          <h1 className="text-lg sm:text-2xl font-orbitron font-extrabold text-white tracking-wide">
            RAPID-FIRE VOLATILES & DOCs
          </h1>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          NEW VOLATILE NOTE
        </button>
      </div>

      {/* Search & Subject Filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search volatile notes, DOCs, antidotes, enzymes, translocation tags..."
            className="w-full bg-[#0a0f1d] border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => { soundEngine.playClick(); setSelectedSubject(sub); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                selectedSubject === sub
                  ? 'bg-cyan-500 text-black font-bold shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Main Vault Content Grid (Sidebar + Reader/Editor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Notes List (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredNotes.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-center text-xs font-mono text-slate-500">
              No volatile notes found matching query.
            </div>
          ) : (
            filteredNotes.map((note) => {
              const isSelected = note.id === activeNoteId;
              return (
                <div
                  key={note.id}
                  onClick={() => handleSelectNote(note)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                    isSelected
                      ? 'bg-cyan-950/50 border-cyan-400 glow-cyan-sm'
                      : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900 text-cyan-400 border border-cyan-500/30 truncate max-w-[140px]">
                      {note.subject}
                    </span>

                    <div className="flex items-center gap-1">
                      {note.isPinned && (
                        <Pin className="w-3 h-3 text-amber-400 fill-amber-400" />
                      )}
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        note.highYieldLevel === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-500/30' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {note.highYieldLevel}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 mb-1">
                    {note.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 font-ui line-clamp-2 leading-tight">
                    {note.content.replace(/[#*`|]/g, '')}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{note.tags.slice(0, 2).map(t => `#${t}`).join(' ')}</span>
                    <span>{new Date(note.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Active Note Reader / Markdown Editor (8 cols) */}
        <div className="lg:col-span-8">
          {activeNote ? (
            <div className="rounded-3xl bg-[#0a0f1d] border border-cyan-500/30 p-4 sm:p-6 glow-cyan-sm flex flex-col justify-between min-h-[500px]">
              {isEditing ? (
                /* Edit Mode */
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" />
                      EDITING VOLATILE NOTE
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1 text-xs font-mono text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveCurrent}
                        className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold rounded-xl"
                      >
                        SAVE NOTE
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Note Title"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-cyan-400"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editSubject}
                      onChange={(e) => setEditSubject(e.target.value)}
                      placeholder="Subject (e.g. Pharmacology)"
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
                    />
                    <select
                      value={editLevel}
                      onChange={(e) => setEditLevel(e.target.value as 'CRITICAL' | 'VERY_HIGH' | 'HIGH')}
                      className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="CRITICAL">CRITICAL (High Probability)</option>
                      <option value="VERY_HIGH">VERY HIGH</option>
                      <option value="HIGH">HIGH YIELD</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="Comma separated tags: DOC, Rapid Fire, Toxicology"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-400"
                  />

                  <textarea
                    rows={16}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Write volatile points or Markdown tables here..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm font-mono text-slate-100 focus:outline-none focus:border-cyan-400 leading-relaxed"
                  />
                </div>
              ) : (
                /* Read / Review Mode */
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header Controls */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                          {activeNote.subject}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[10px] font-mono font-bold">
                          {activeNote.highYieldLevel}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            onTogglePin(activeNote.id);
                          }}
                          className={`p-2 rounded-xl border transition-colors ${
                            activeNote.isPinned
                              ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                          title="Pin note to top"
                        >
                          <Pin className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleCopyContent(activeNote.content, activeNote.id)}
                          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                          title="Copy content"
                        >
                          {copiedId === activeNote.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => { soundEngine.playClick(); setIsEditing(true); }}
                          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                          title="Edit Note"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm('Delete this note from the vault?')) {
                              soundEngine.playClick();
                              onDeleteNote(activeNote.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                          title="Delete Note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Note Title */}
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide mt-4 mb-2">
                      {activeNote.title}
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {activeNote.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Note Content Display with structured markdown formatting */}
                    <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 font-ui leading-relaxed space-y-2 max-h-[480px] overflow-y-auto pr-2">
                      {activeNote.content.split('\n\n').map((block, bIdx) => {
                        if (block.startsWith('###')) {
                          return (
                            <h3 key={bIdx} className="text-sm font-mono font-bold text-cyan-300 border-b border-cyan-500/20 pb-1 mt-3 mb-2">
                              {block.replace(/###/g, '').trim()}
                            </h3>
                          );
                        } else if (block.startsWith('|')) {
                          // Render as formatted table
                          const lines = block.trim().split('\n');
                          const header = lines[0]?.split('|').map(c => c.trim()).filter(Boolean);
                          const rows = lines.slice(2).map(r => r.split('|').map(c => c.trim()).filter(Boolean));
                          return (
                            <div key={bIdx} className="overflow-x-auto my-3 rounded-xl border border-slate-800 bg-slate-950/60 p-1">
                              <table className="w-full text-left text-xs font-mono">
                                <thead>
                                  <tr className="border-b border-slate-800 text-cyan-300">
                                    {header?.map((h, hIdx) => (
                                      <th key={hIdx} className="p-2 font-bold">{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="border-b border-slate-900/80 hover:bg-slate-900/40">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="p-2 text-slate-200">{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        } else {
                          return (
                            <div key={bIdx} className="whitespace-pre-line leading-relaxed text-slate-200">
                              {block}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Auto-saved to LocalStorage</span>
                    <span>Last modified: {new Date(activeNote.lastModified).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-[#0a0f1d] border border-slate-800 text-center text-slate-400 font-mono text-xs">
              Select or create a volatile note to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

"use client";

interface ViewToggleProps {
  view: 'kanban' | 'timeline';
  setView: (view: 'kanban' | 'timeline') => void;
}

export const ViewToggle = ({ view, setView }: ViewToggleProps) => {
  return (
    <div className="toggle-switch">
      <button
        onClick={() => setView('kanban')}
        className={`${view === 'kanban' ? 'active' : ''}`}
      >
        Kanban
      </button>
      <button
        onClick={() => setView('timeline')}
        className={`${view === 'timeline' ? 'active' : ''}`}
      >
        Timeline
      </button>
    </div>
  );
};
interface EmptyStateProps {
  icon: string;
  text: string;
}

export default function EmptyState({ icon, text }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <div className="empty-state-text">{text}</div>
    </div>
  );
}

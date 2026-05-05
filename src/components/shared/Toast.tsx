import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { toast, performUndo } = useApp();

  if (!toast) return null;

  const classNames = [
    'toast',
    toast.message ? 'active' : '',
    toast.type,
    toast.undoable ? 'undoable' : '',
  ]
    .filter(Boolean)
    .join(' ');

  function handleClick() {
    performUndo();
  }

  return (
    <div className={classNames} onClick={handleClick}>
      {toast.undoable && <span style={{ marginRight: 8 }}>↩</span>}
      {toast.message}
      {toast.undoable && <span style={{ marginLeft: 8, opacity: 0.7 }}>แตะเพื่อเรียกคืน</span>}
    </div>
  );
}

import { Component, type ErrorInfo, type ReactNode, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/layout/Header';
import DesktopNav from './components/layout/DesktopNav';
import MobileNav from './components/layout/MobileNav';
import RegisterTab from './components/registration/RegisterTab';
import JudgeTab from './components/judge/JudgeTab';
import Leaderboard from './components/leaderboard/Leaderboard';
import SettingsPage from './components/settings/SettingsPage';
import Toast from './components/shared/Toast';
import Confetti from './components/shared/Confetti';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    try {
      const log = JSON.parse(localStorage.getItem('k9_error_log') || '[]');
      log.push({ message: error.message, stack: info.componentStack, ts: Date.now() });
      localStorage.setItem('k9_error_log', JSON.stringify(log.slice(-10)));
    } catch { /* ignore storage errors */ }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#1a1a2e', color: '#eee' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>เกิดข้อผิดพลาด</h2>
          <p style={{ color: '#aaa', marginBottom: '1.5rem', maxWidth: '400px' }}>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', fontSize: '1rem', border: 'none', borderRadius: '8px', background: '#4f46e5', color: 'white', cursor: 'pointer' }}>
            โหลดใหม่
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const { activeTab } = useApp();

  const [confettiTrigger, setConfettiTrigger] = useState(false);

  return (
    <>
      <Confetti trigger={confettiTrigger} onComplete={() => setConfettiTrigger(false)} />
      <div className="container">
        <Header />
        <DesktopNav />
        <main className="main-content">
          {activeTab === 'register' && <RegisterTab />}
          {activeTab === 'judge' && <JudgeTab />}
          {activeTab === 'leaderboard' && <Leaderboard />}
          {activeTab === 'settings' && <SettingsPage />}
        </main>
        <MobileNav />
        <Toast />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

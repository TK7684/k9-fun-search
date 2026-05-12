import { Component, lazy, Suspense, type ErrorInfo, type ReactNode, useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/layout/Header';
import DesktopNav from './components/layout/DesktopNav';
import MobileNav from './components/layout/MobileNav';
import Toast from './components/shared/Toast';
import Confetti from './components/shared/Confetti';

// Access the confetti ref from AppContext module
import { confettiTriggerRef } from './context/AppContext';

const RegisterTab = lazy(() => import('./components/registration/RegisterTab'));
const JudgeTab = lazy(() => import('./components/judge/JudgeTab'));
const Leaderboard = lazy(() => import('./components/leaderboard/Leaderboard'));
const SettingsPage = lazy(() => import('./components/settings/SettingsPage'));

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

  // Register the confetti trigger so context consumers can fire it
  useEffect(() => {
    confettiTriggerRef.current = () => setConfettiTrigger(true);
    return () => { confettiTriggerRef.current = null; };
  }, []);

  return (
    <>
      <Confetti trigger={confettiTrigger} onComplete={() => setConfettiTrigger(false)} />
      <div className="container">
        <Header />
        <DesktopNav />
        <main className="main-content">
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>กำลังโหลด...</div>}>
            {activeTab === 'register' && <RegisterTab />}
            {activeTab === 'judge' && <JudgeTab />}
            {activeTab === 'leaderboard' && <Leaderboard />}
            {activeTab === 'settings' && <SettingsPage />}
          </Suspense>
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

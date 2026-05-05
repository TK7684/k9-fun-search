import { Component, type ReactNode, useState } from 'react';
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

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>เกิดข้อผิดพลาด</h2>
          <button onClick={() => this.setState({ hasError: false })}>ลองอีกครั้ง</button>
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

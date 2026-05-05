import { useState, useMemo, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateLiveScore } from '../../utils/scoring';
import type { VPState, AttireState, BonusState } from '../../types';
import DogSelector from './DogSelector';
import StickyScoreBar from './StickyScoreBar';
import Timer from './Timer';
import VpScoringCard from './VpScoringCard';
import ChecklistCard from './ChecklistCard';
import LiveScoreCard from './LiveScoreCard';
import NotesCard from './NotesCard';
import ScoreActions from './ScoreActions';

const INITIAL_VP_STATE: VPState = {
  1: { found: false, grade: 'V' },
  2: { found: false, grade: 'V' },
  3: { found: false, grade: 'V' },
};

const INITIAL_ATTIRE_STATE: AttireState = {
  shoes: true,
  shirt: true,
  pants: true,
  hat: false,
  gloves: false,
};

const INITIAL_BONUS_STATE: BonusState = {
  vp1: false,
  vp2: false,
  allFound: false,
  down: false,
};

export default function JudgeTab() {
  const { mergedDogs, timer, saveScore, showToast, scoredDogIds } = useApp();

  const [selectedDogId, setSelectedDogId] = useState<string>('');
  const [vpState, setVpState] = useState<VPState>({ ...INITIAL_VP_STATE });
  const [attireState, setAttireState] = useState<AttireState>({ ...INITIAL_ATTIRE_STATE });
  const [bonusState, setBonusState] = useState<BonusState>({ ...INITIAL_BONUS_STATE });
  const [notes, setNotes] = useState('');

  const panelOpen = selectedDogId !== '';

  const liveScore = useMemo(
    () => calculateLiveScore(vpState, attireState, bonusState),
    [vpState, attireState, bonusState],
  );

  // Unscored dogs for the selector
  const unscoredDogs = useMemo(
    () => mergedDogs.filter((d) => !scoredDogIds.has(d.id)),
    [mergedDogs, scoredDogIds],
  );

  // beforeunload warning when panel is open
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (panelOpen) {
        e.preventDefault();
        e.returnValue = '';
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [panelOpen]);

  const handleSelectDog = useCallback((dogId: string) => {
    setSelectedDogId(dogId);
    if (dogId) {
      resetForm();
    }
  }, []);

  function resetForm() {
    setVpState({ ...INITIAL_VP_STATE });
    setAttireState({ ...INITIAL_ATTIRE_STATE });
    setBonusState({ ...INITIAL_BONUS_STATE });
    setNotes('');
    timer.reset();
  }

  function handleVpChange(vpNum: 1 | 2 | 3, found: boolean) {
    setVpState((prev) => ({
      ...prev,
      [vpNum]: { ...prev[vpNum], found },
    }));
  }

  function handleGradeChange(vpNum: 1 | 2 | 3, grade: string) {
    setVpState((prev) => ({
      ...prev,
      [vpNum]: { ...prev[vpNum], grade },
    }));
  }

  function handleAttireChange(key: keyof AttireState, checked: boolean) {
    setAttireState((prev) => ({ ...prev, [key]: checked }));
  }

  function handleBonusChange(key: keyof BonusState, checked: boolean) {
    setBonusState((prev) => ({ ...prev, [key]: checked }));
  }

  function handleSave() {
    if (!selectedDogId) {
      showToast('กรุณาเลือกสุนัข', 'error');
      return;
    }

    const dog = mergedDogs.find((d) => String(d.id) === selectedDogId);
    if (!dog) {
      showToast('ไม่พบข้อมูลสุนัข', 'error');
      return;
    }

    if (!dog.dogName || !dog.dogBreed || !dog.handlerName) {
      showToast('ข้อมูลสุนัขไม่ครบถ้วน กรุณาตรวจสอบ', 'error');
      return;
    }

    saveScore(dog, vpState, attireState, bonusState, timer.seconds, notes);

    showToast('บันทึกคะแนนสำเร็จ! 🎉', 'success');
    handleCancel();
  }

  function handleCancel() {
    setSelectedDogId('');
    resetForm();
  }

  return (
    <div className="scoring-section">
      <div className="section-header">
        <h2>📝 คิดคะแนน</h2>
      </div>

      <DogSelector
        dogs={unscoredDogs}
        selectedDogId={selectedDogId}
        onSelect={handleSelectDog}
      />

      {panelOpen && (
        <>
          <StickyScoreBar
            vpScore={liveScore.vpScore}
            attireScore={liveScore.attireScore}
            timeBonus={liveScore.timeBonus}
            bonusScore={liveScore.bonusScore}
            totalScore={liveScore.totalScore}
          />

          <Timer
            seconds={timer.seconds}
            isRunning={timer.isRunning}
            onStart={timer.start}
            onPause={timer.pause}
            onReset={timer.reset}
          />

          <VpScoringCard
            vpState={vpState}
            onVpChange={handleVpChange}
            onGradeChange={handleGradeChange}
          />

          <ChecklistCard
            attire={attireState}
            bonus={bonusState}
            onAttireChange={handleAttireChange}
            onBonusChange={handleBonusChange}
          />

          <LiveScoreCard
            vpScore={liveScore.vpScore}
            attireScore={liveScore.attireScore}
            timeBonus={liveScore.timeBonus}
            bonusScore={liveScore.bonusScore}
            totalScore={liveScore.totalScore}
          />

          <NotesCard value={notes} onChange={setNotes} />

          <ScoreActions onSave={handleSave} onCancel={handleCancel} />
        </>
      )}
    </div>
  );
}

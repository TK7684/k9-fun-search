// ============================================
// DATA STORAGE
// ============================================
let dogs = JSON.parse(localStorage.getItem('k9_dogs')) || [];
let scores = JSON.parse(localStorage.getItem('k9_scores')) || [];
let settings = JSON.parse(localStorage.getItem('k9_settings')) || {
    vp1Points: 20,
    vp2Points: 30,
    vp3Points: 40,
    gradeV: 100,
    gradeSG: 92,
    gradeG: 84,
    gradeB: 74,
    gradeM: 0,
    attireRequired: 2,
    attireBonus: 2,
    attireMax: 10,
    bonusVp1: 10,
    bonusVp2: 10,
    bonusAll: 10,
    bonusDown: 5
};

// ============================================
// DEMO DATA
// ============================================
const demoDogs = [
    { id: 1, dogName: 'มอลลี่', dogBreed: 'เยอรมัน เชเพิร์ด', handlerName: 'สมชาย ใจดี', registeredAt: new Date().toISOString() },
    { id: 2, dogName: 'แม็กซ์', dogBreed: 'โกลเด้น รีทรีเวอร์', handlerName: 'วิชัย กล้าหาญ', registeredAt: new Date().toISOString() },
    { id: 3, dogName: 'ลูน่า', dogBreed: 'ลาบราดอร์', handlerName: 'สุดา รักสัตว์', registeredAt: new Date().toISOString() },
    { id: 4, dogName: 'ร็อคกี้', dogBreed: 'เบลเจียน มาลินอยส์', handlerName: 'ประเสริฐ ทำงาน', registeredAt: new Date().toISOString() },
    { id: 5, dogName: 'เบลล่า', dogBreed: 'บอร์เดอร์ คอลลี่', handlerName: 'มานี มีตา', registeredAt: new Date().toISOString() }
];

const demoScores = [
    {
        id: 101,
        dogId: 1,
        dogName: 'มอลลี่',
        handlerName: 'สมชาย ใจดี',
        vpDetails: {
            1: { found: true, grade: 'V', score: 20 },
            2: { found: true, grade: 'V', score: 30 },
            3: { found: true, grade: 'SG', score: 27.6 }
        },
        vpScore: 77.6,
        attireScore: 10,
        bonusScore: 25,
        totalScore: 112.6,
        timeInSeconds: 145,
        notes: 'ทำได้ดีมาก!',
        scoredAt: new Date().toISOString()
    }
];

function loadDemoData() {
    if (dogs.length > 0 || scores.length > 0) {
        if (!confirm('มีข้อมูลอยู่แล้ว ต้องการล้างและโหลดข้อมูลสาธิตใหม่?')) {
            return;
        }
    }

    dogs = [...demoDogs];
    scores = [...demoScores];

    saveDogs();
    saveScores();

    renderDogsList();
    updateDogSelect();
    renderLeaderboard();
    updateHeaderStats();

    showToast('โหลดข้อมูลสาธิตสำเร็จ! 🎉', 'success');
    startConfetti();
}

// ============================================
// TIMER VARIABLES
// ============================================
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

// ============================================
// EDIT SCORE
// ============================================
let editingScoreId = null;

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    startConfetti();
});

function initializeApp() {
    setupEventListeners();
    updateHeaderStats();
    renderDogsList();
    updateDogSelect();
    renderLeaderboard();
    loadSettings();
}

// ============================================
// CONFETTI EFFECT
// ============================================
function startConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 100);
    }
}

// ============================================
// TOGGLE FUNCTIONS
// ============================================
function toggleRegistration() {
    const content = document.getElementById('registration-content');
    const icon = document.querySelector('.collapse-icon');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
}

function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Registration form
    document.getElementById('registration-form').addEventListener('submit', handleRegistration);

    // Team select
    document.getElementById('team-select').addEventListener('change', handleTeamSelect);

    // Timer controls
    document.getElementById('start-btn').addEventListener('click', startTimer);
    document.getElementById('pause-btn').addEventListener('click', pauseTimer);
    document.getElementById('reset-btn').addEventListener('click', resetTimer);

    // VP checkboxes and grades
    document.querySelectorAll('.vp-found').forEach(checkbox => {
        checkbox.addEventListener('change', handleVPChange);
    });

    document.querySelectorAll('.grade-select').forEach(select => {
        select.addEventListener('change', calculateLiveScore);
    });

    // Attire and bonus checkboxes
    document.querySelectorAll('.checklist-item input').forEach(checkbox => {
        checkbox.addEventListener('change', calculateLiveScore);
    });

    // Save and cancel buttons
    document.getElementById('save-score-btn').addEventListener('click', saveScore);
    document.getElementById('cancel-btn').addEventListener('click', cancelScoring);
}

// ============================================
// HEADER STATS
// ============================================
function updateHeaderStats() {
    document.getElementById('total-teams').textContent = dogs.length;
    document.getElementById('completed-teams').textContent = scores.length;
}

// ============================================
// REGISTRATION
// ============================================
function handleRegistration(e) {
    e.preventDefault();

    if (dogs.length >= 20) {
        showToast('เต็มจำนวนแล้ว (20 สุนัข)', 'error');
        return;
    }

    const dog = {
        id: Date.now(),
        dogName: document.getElementById('dog-name').value.trim(),
        dogBreed: document.getElementById('dog-breed').value.trim(),
        handlerName: document.getElementById('handler-name').value.trim(),
        registeredAt: new Date().toISOString()
    };

    dogs.push(dog);
    saveDogs();
    renderDogsList();
    updateDogSelect();
    updateHeaderStats();

    // Reset form
    e.target.reset();

    showToast('ลงทะเบียนสำเร็จ! 🎉', 'success');
    startConfetti();
}

function renderDogsList() {
    const container = document.getElementById('teams-container');
    document.getElementById('team-count').textContent = dogs.length;

    if (dogs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🐕</div>
                <div class="empty-state-text">ยังไม่มีสุนัขลงทะเบียน</div>
            </div>
        `;
        return;
    }

    container.innerHTML = dogs.map(dog => `
        <div class="team-card">
            <div class="team-card-header">
                <div class="team-name">${dog.dogName}</div>
                <button class="team-delete" onclick="deleteDog(${dog.id})" title="ลบสุนัข">🗑️</button>
            </div>
            <div class="team-info">
                <span>🐕 ${dog.dogName} (${dog.dogBreed})</span>
                <span>👤 ${dog.handlerName}</span>
            </div>
        </div>
    `).join('');
}

function deleteDog(id) {
    if (confirm('ยืนยันการลบสุนัข?')) {
        dogs = dogs.filter(d => d.id !== id);
        saveDogs();
        renderDogsList();
        updateDogSelect();
        updateHeaderStats();
        showToast('ลบสุนัขเรียบร้อย', 'success');
    }
}

function saveDogs() {
    localStorage.setItem('k9_dogs', JSON.stringify(dogs));
}

// ============================================
// TEAM SELECT
// ============================================
function updateDogSelect() {
    const select = document.getElementById('team-select');
    const scoredDogIds = scores.map(s => s.dogId);

    select.innerHTML = '<option value="">-- เลือกสุนัข --</option>' +
        dogs
            .filter(d => !scoredDogIds.includes(d.id))
            .map(dog => `<option value="${dog.id}">${dog.dogName} - ${dog.handlerName}</option>`)
            .join('');
}

function handleTeamSelect() {
    const dogId = parseInt(document.getElementById('team-select').value);
    const panel = document.getElementById('judging-panel');

    if (dogId) {
        panel.style.display = 'block';
        resetScoringForm();
    } else {
        panel.style.display = 'none';
    }
}

// ============================================
// TIMER
// ============================================
function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        document.getElementById('start-btn').disabled = true;
        document.getElementById('pause-btn').disabled = false;

        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (timerRunning) {
        timerRunning = false;
        clearInterval(timerInterval);
        document.getElementById('start-btn').disabled = false;
        document.getElementById('pause-btn').disabled = true;
    }
}

function resetTimer() {
    pauseTimer();
    timerSeconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timer-display').textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// ============================================
// VP SCORING
// ============================================
function handleVPChange(e) {
    const checkbox = e.target;
    const vpItem = checkbox.closest('.vp-item');

    if (checkbox.checked) {
        vpItem.classList.add('found');
    } else {
        vpItem.classList.remove('found');
    }

    calculateLiveScore();
}

function calculateLiveScore() {
    let vpScore = 0;
    let attireScore = 0;
    let bonusScore = 0;

    // Calculate VP scores
    const vpPoints = {
        1: settings.vp1Points,
        2: settings.vp2Points,
        3: settings.vp3Points
    };

    const gradePercentages = {
        'V': settings.gradeV / 100,
        'SG': settings.gradeSG / 100,
        'G': settings.gradeG / 100,
        'B': settings.gradeB / 100,
        'M': settings.gradeM / 100
    };

    for (let i = 1; i <= 3; i++) {
        const found = document.querySelector(`.vp-found[data-vp="${i}"]`).checked;
        const grade = document.querySelector(`.grade-select[data-vp="${i}"]`).value;

        if (found) {
            vpScore += vpPoints[i] * gradePercentages[grade];
        }
    }

    // Calculate attire score
    const requiredItems = ['attire-shoes', 'attire-shirt', 'attire-pants'];
    const bonusItems = ['attire-hat', 'attire-gloves'];

    let requiredCount = 0;
    requiredItems.forEach(id => {
        if (document.getElementById(id).checked) requiredCount++;
    });

    let bonusCount = 0;
    bonusItems.forEach(id => {
        if (document.getElementById(id).checked) bonusCount++;
    });

    attireScore = (requiredCount * settings.attireRequired) + (bonusCount * settings.attireBonus);
    if (attireScore > settings.attireMax) attireScore = settings.attireMax;

    // Calculate bonus score
    if (document.getElementById('bonus-vp1-1min').checked) bonusScore += settings.bonusVp1;
    if (document.getElementById('bonus-vp2-2min').checked) bonusScore += settings.bonusVp2;
    if (document.getElementById('bonus-all-3min').checked) bonusScore += settings.bonusAll;
    if (document.getElementById('bonus-down').checked) bonusScore += settings.bonusDown;

    // Update display
    const totalScore = vpScore + attireScore + bonusScore;
    document.getElementById('vp-score-live').textContent = vpScore.toFixed(1);
    document.getElementById('attire-score-live').textContent = attireScore;
    document.getElementById('bonus-score-live').textContent = bonusScore;
    document.getElementById('total-score-live').textContent = totalScore.toFixed(1);

    // Update sticky score bar
    const stickyTotal = document.getElementById('sticky-total-score');
    const stickyVp = document.getElementById('sticky-vp-score');
    const stickyAttire = document.getElementById('sticky-attire-score');
    const stickyBonus = document.getElementById('sticky-bonus-score');

    if (stickyTotal) {
        stickyTotal.textContent = totalScore.toFixed(1);
        stickyVp.textContent = vpScore.toFixed(1);
        stickyAttire.textContent = attireScore;
        stickyBonus.textContent = bonusScore;
    }
}

// ============================================
// SAVE SCORE
// ============================================
function saveScore() {
    const dogId = parseInt(document.getElementById('team-select').value);
    const dog = dogs.find(d => d.id === dogId);

    if (!dog) {
        showToast('กรุณาเลือกสุนัข', 'error');
        return;
    }

    // Calculate final scores
    calculateLiveScore();
    const vpScore = parseFloat(document.getElementById('vp-score-live').textContent);
    const attireScore = parseFloat(document.getElementById('attire-score-live').textContent);
    const bonusScore = parseFloat(document.getElementById('bonus-score-live').textContent);
    const totalScore = vpScore + attireScore + bonusScore;

    // Gather VP details
    const vpDetails = {};
    const gradePercentages = {
        'V': settings.gradeV / 100,
        'SG': settings.gradeSG / 100,
        'G': settings.gradeG / 100,
        'B': settings.gradeB / 100,
        'M': settings.gradeM / 100
    };

    const vpPoints = {
        1: settings.vp1Points,
        2: settings.vp2Points,
        3: settings.vp3Points
    };

    for (let i = 1; i <= 3; i++) {
        const found = document.querySelector(`.vp-found[data-vp="${i}"]`).checked;
        const grade = document.querySelector(`.grade-select[data-vp="${i}"]`).value;

        let earnedScore = 0;
        if (found) {
            earnedScore = vpPoints[i] * gradePercentages[grade];
        }

        vpDetails[i] = {
            found: found,
            grade: grade,
            score: earnedScore
        };
    }

    // Create score record
    const scoreRecord = {
        id: Date.now(),
        dogId: dogId,
        dogName: dog.dogName,
        dogBreed: dog.dogBreed,
        handlerName: dog.handlerName,
        vpDetails: vpDetails,
        vpScore: vpScore,
        attireScore: attireScore,
        bonusScore: bonusScore,
        totalScore: totalScore,
        timeInSeconds: timerSeconds,
        notes: document.getElementById('judge-notes').value,
        scoredAt: new Date().toISOString()
    };

    scores.push(scoreRecord);
    saveScores();

    showToast('บันทึกคะแนนสำเร็จ! 🎉', 'success');
    startConfetti();

    // Reset and close
    cancelScoring();
    updateHeaderStats();
}

function cancelScoring() {
    document.getElementById('team-select').value = '';
    document.getElementById('judging-panel').style.display = 'none';
    resetTimer();
}

function resetScoringForm() {
    // Reset VP checkboxes
    document.querySelectorAll('.vp-found').forEach(checkbox => {
        checkbox.checked = false;
    });

    document.querySelectorAll('.vp-item').forEach(item => {
        item.classList.remove('found');
    });

    // Reset grades to V
    document.querySelectorAll('.grade-select').forEach(select => {
        select.value = 'V';
    });

    // Reset attire
    document.getElementById('attire-shoes').checked = true;
    document.getElementById('attire-shirt').checked = true;
    document.getElementById('attire-pants').checked = true;
    document.getElementById('attire-hat').checked = false;
    document.getElementById('attire-gloves').checked = false;

    // Reset bonuses
    document.getElementById('bonus-vp1-1min').checked = false;
    document.getElementById('bonus-vp2-2min').checked = false;
    document.getElementById('bonus-all-3min').checked = false;
    document.getElementById('bonus-down').checked = false;

    // Reset notes
    document.getElementById('judge-notes').value = '';

    // Reset timer
    resetTimer();

    // Calculate initial score
    calculateLiveScore();
}

function saveScores() {
    localStorage.setItem('k9_scores', JSON.stringify(scores));
}

// ============================================
// LEADERBOARD
// ============================================
function renderLeaderboard() {
    const container = document.getElementById('leaderboard-content');

    if (scores.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🏆</div>
                <div class="empty-state-text">ยังไม่มีคะแนน</div>
            </div>
        `;
        return;
    }

    // Sort by total score (descending), then by time (ascending)
    const sortedScores = [...scores].sort((a, b) => {
        if (b.totalScore !== a.totalScore) {
            return b.totalScore - a.totalScore;
        }
        return a.timeInSeconds - b.timeInSeconds;
    });

    container.innerHTML = sortedScores.map((score, index) => {
        const rank = index + 1;
        let rankClass = 'rank-other';
        if (rank === 1) rankClass = 'rank-1';
        else if (rank === 2) rankClass = 'rank-2';
        else if (rank === 3) rankClass = 'rank-3';

        const minutes = Math.floor(score.timeInSeconds / 60);
        const seconds = score.timeInSeconds % 60;
        const timeDisplay = score.timeInSeconds > 0 ?
            `${minutes}:${String(seconds).padStart(2, '0')}` : '-';

        const vpCount = Object.values(score.vpDetails).filter(vp => vp.found).length;

        return `
            <div class="leaderboard-item">
                <div class="leaderboard-rank ${rankClass}">${rank}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-team">${score.dogName}</div>
                    <div class="leaderboard-details">
                        🐕 ${score.dogName} (${score.dogBreed || '-'}) | 👤 ${score.handlerName} |
                        🎯 พบ ${vpCount}/3 VP | ⏱️ ${timeDisplay}
                    </div>
                </div>
                <div class="leaderboard-score">
                    <div class="leaderboard-total">${score.totalScore.toFixed(1)}</div>
                    <div class="leaderboard-bonus">+${score.bonusScore} โบนัส</div>
                </div>
                <div class="leaderboard-actions-btn">
                    <button class="edit-btn" onclick="editScore(${score.id})">✏️ แก้ไข</button>
                    <button class="delete-btn" onclick="deleteScore(${score.id})">🗑️ ลบ</button>
                </div>
            </div>
        `;
    }).join('');
}

function deleteScore(id) {
    if (confirm('ยืนยันการลบคะแนน?')) {
        scores = scores.filter(s => s.id !== id);
        saveScores();
        renderLeaderboard();
        updateDogSelect();
        updateHeaderStats();
        showToast('ลบคะแนนเรียบร้อย', 'success');
    }
}

// ============================================
// EDIT SCORE
// ============================================
function editScore(id) {
    const score = scores.find(s => s.id === id);
    if (!score) return;

    editingScoreId = id;

    const modal = document.getElementById('edit-modal');
    const modalBody = document.getElementById('edit-modal-body');

    modalBody.innerHTML = `
        <div class="edit-form">
            <div class="input-group">
                <label>สุนัข</label>
                <input type="text" value="${score.dogName}" disabled>
            </div>
            <div class="input-group">
                <label>ผู้ควบคุม</label>
                <input type="text" value="${score.handlerName}" disabled>
            </div>
            <div class="input-group">
                <label>คะแนน VP</label>
                <input type="number" id="edit-vp-score" value="${score.vpScore}" step="0.1" min="0">
            </div>
            <div class="input-group">
                <label>คะแนนการแต่งกาย</label>
                <input type="number" id="edit-attire-score" value="${score.attireScore}" step="0.1" min="0" max="${settings.attireMax}">
            </div>
            <div class="input-group">
                <label>คะแนนโบนัส</label>
                <input type="number" id="edit-bonus-score" value="${score.bonusScore}" step="0.1" min="0">
            </div>
            <div class="input-group">
                <label>เวลา (วินาที)</label>
                <input type="number" id="edit-time" value="${score.timeInSeconds}" min="0">
            </div>
            <div class="input-group">
                <label>หมายเหตุ</label>
                <textarea id="edit-notes">${score.notes || ''}</textarea>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeEditModal() {
    document.getElementById('edit-modal').classList.remove('active');
    editingScoreId = null;
}

function saveEditedScore() {
    if (!editingScoreId) return;

    const scoreIndex = scores.findIndex(s => s.id === editingScoreId);
    if (scoreIndex === -1) return;

    const vpScore = parseFloat(document.getElementById('edit-vp-score').value) || 0;
    const attireScore = parseFloat(document.getElementById('edit-attire-score').value) || 0;
    const bonusScore = parseFloat(document.getElementById('edit-bonus-score').value) || 0;
    const timeInSeconds = parseInt(document.getElementById('edit-time').value) || 0;
    const notes = document.getElementById('edit-notes').value;

    scores[scoreIndex] = {
        ...scores[scoreIndex],
        vpScore: vpScore,
        attireScore: attireScore,
        bonusScore: bonusScore,
        totalScore: vpScore + attireScore + bonusScore,
        timeInSeconds: timeInSeconds,
        notes: notes
    };

    saveScores();
    renderLeaderboard();
    closeEditModal();
    showToast('แก้ไขคะแนนสำเร็จ!', 'success');
}

// ============================================
// SETTINGS
// ============================================
function loadSettings() {
    document.getElementById('vp1-points').value = settings.vp1Points;
    document.getElementById('vp2-points').value = settings.vp2Points;
    document.getElementById('vp3-points').value = settings.vp3Points;
    document.getElementById('grade-v').value = settings.gradeV;
    document.getElementById('grade-sg').value = settings.gradeSG;
    document.getElementById('grade-g').value = settings.gradeG;
    document.getElementById('grade-b').value = settings.gradeB;
    document.getElementById('grade-m').value = settings.gradeM;
    document.getElementById('attire-required').value = settings.attireRequired;
    document.getElementById('attire-bonus').value = settings.attireBonus;
    document.getElementById('attire-max').value = settings.attireMax;
    document.getElementById('bonus-vp1').value = settings.bonusVp1;
    document.getElementById('bonus-vp2').value = settings.bonusVp2;
    document.getElementById('bonus-all').value = settings.bonusAll;
    document.getElementById('bonus-down').value = settings.bonusDown;
}

function saveSettings() {
    settings = {
        vp1Points: parseInt(document.getElementById('vp1-points').value) || 20,
        vp2Points: parseInt(document.getElementById('vp2-points').value) || 30,
        vp3Points: parseInt(document.getElementById('vp3-points').value) || 40,
        gradeV: parseInt(document.getElementById('grade-v').value) || 100,
        gradeSG: parseInt(document.getElementById('grade-sg').value) || 92,
        gradeG: parseInt(document.getElementById('grade-g').value) || 84,
        gradeB: parseInt(document.getElementById('grade-b').value) || 74,
        gradeM: parseInt(document.getElementById('grade-m').value) || 0,
        attireRequired: parseInt(document.getElementById('attire-required').value) || 2,
        attireBonus: parseInt(document.getElementById('attire-bonus').value) || 2,
        attireMax: parseInt(document.getElementById('attire-max').value) || 10,
        bonusVp1: parseInt(document.getElementById('bonus-vp1').value) || 10,
        bonusVp2: parseInt(document.getElementById('bonus-vp2').value) || 10,
        bonusAll: parseInt(document.getElementById('bonus-all').value) || 10,
        bonusDown: parseInt(document.getElementById('bonus-down').value) || 5
    };

    localStorage.setItem('k9_settings', JSON.stringify(settings));
    showToast('บันทึกตั้งค่าสำเร็จ!', 'success');
}

function resetSettings() {
    if (confirm('คืนค่าตั้งค่าเดิม?')) {
        settings = {
            vp1Points: 20,
            vp2Points: 30,
            vp3Points: 40,
            gradeV: 100,
            gradeSG: 92,
            gradeG: 84,
            gradeB: 74,
            gradeM: 0,
            attireRequired: 2,
            attireBonus: 2,
            attireMax: 10,
            bonusVp1: 10,
            bonusVp2: 10,
            bonusAll: 10,
            bonusDown: 5
        };

        loadSettings();
        localStorage.setItem('k9_settings', JSON.stringify(settings));
        showToast('คืนค่าเดิมสำเร็จ', 'success');
    }
}

// ============================================
// EXPORT
// ============================================
function exportCSV() {
    if (scores.length === 0) {
        showToast('ไม่มีข้อมูลสำหรับส่งออก', 'error');
        return;
    }

    const sortedScores = [...scores].sort((a, b) => {
        if (b.totalScore !== a.totalScore) {
            return b.totalScore - a.totalScore;
        }
        return a.timeInSeconds - b.timeInSeconds;
    });

    let csv = '﻿ลำดับ,สุนัข,สายพันธุ์,ผู้ควบคุม,VP1,VP2,VP3,การแต่งกาย,โบนัส,รวม,เวลา(นาที),หมายเหตุ\n';

    sortedScores.forEach((score, index) => {
        const minutes = (score.timeInSeconds / 60).toFixed(2);
        csv += `${index + 1},"${score.dogName}","${score.dogBreed || '-'}","${score.handlerName}",` +
               `${score.vpDetails[1].score.toFixed(1)},${score.vpDetails[2].score.toFixed(1)},` +
               `${score.vpDetails[3].score.toFixed(1)},${score.attireScore},${score.bonusScore},` +
               `${score.totalScore.toFixed(1)},${minutes},"${score.notes || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `k9_scores_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    showToast('ส่งออก CSV สำเร็จ!', 'success');
}

function confirmClearAll() {
    if (confirm('⚠️ คำเตือน: การกระทำนี้จะลบข้อมูลทั้งหมด')) {
        if (confirm('ยืนยันที่จะลบข้อมูลทั้งหมด? ไม่สามารถย้อนกลับได้')) {
            dogs = [];
            scores = [];
            saveDogs();
            saveScores();
            renderDogsList();
            renderLeaderboard();
            updateDogSelect();
            updateHeaderStats();
            showToast('ลบข้อมูลทั้งหมดเรียบร้อย', 'success');
        }
    }
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} active`;

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('edit-modal');
    if (event.target === modal) {
        closeEditModal();
    }
}

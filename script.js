class Pomodoro {
    constructor() {
        this.timeRemaining = 25 * 60; // 25 minutes in seconds
        this.isRunning = false;
        this.interval = null;
        
        this.timerDisplay = document.getElementById('timer');
        this.statusDisplay = document.getElementById('status');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        this.bindEvents();
        this.updateDisplay();
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
    }
    
    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }
    
    startTimer() {
        this.isRunning = true;
        this.startBtn.textContent = 'Pause';
        this.statusDisplay.textContent = 'Focus time! 🎯';
        
        this.interval = setInterval(() => {
            this.timeRemaining--;
            this.updateDisplay();
            
            if (this.timeRemaining <= 0) {
                this.timerComplete();
            }
        }, 1000);
    }
    
    pauseTimer() {
        this.isRunning = false;
        this.startBtn.textContent = 'Start';
        this.statusDisplay.textContent = 'Paused';
        clearInterval(this.interval);
    }
    
    resetTimer() {
        this.isRunning = false;
        this.timeRemaining = 25 * 60;
        this.startBtn.textContent = 'Start';
        this.statusDisplay.textContent = 'Ready to focus';
        clearInterval(this.interval);
        this.updateDisplay();
    }
    
    timerComplete() {
        this.isRunning = false;
        this.startBtn.textContent = 'Start';
        this.statusDisplay.textContent = 'Time\'s up! Take a break 🎉';
        clearInterval(this.interval);
        
        // Play notification sound
        this.playNotification();
        // Reset timer for next session
        this.timeRemaining = 25 * 60; // Reset to 25 minutes
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        this.timerDisplay.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    playNotification() {
        // Simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
            console.log('Audio notification not available');
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Pomodoro();
});

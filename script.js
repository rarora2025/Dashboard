// Personal Dashboard JavaScript
class Dashboard {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.notes = localStorage.getItem('notes') || '';
        this.userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        this.theme = localStorage.getItem('theme') || 'light';
        this.quotes = [
            {
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                text: "Innovation distinguishes between a leader and a follower.",
                author: "Steve Jobs"
            },
            {
                text: "Life is what happens to you while you're busy making other plans.",
                author: "John Lennon"
            },
            {
                text: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt"
            },
            {
                text: "It is during our darkest moments that we must focus to see the light.",
                author: "Aristotle"
            },
            {
                text: "The way to get started is to quit talking and begin doing.",
                author: "Walt Disney"
            },
            {
                text: "Don't be afraid to give up the good to go for the great.",
                author: "John D. Rockefeller"
            },
            {
                text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
                author: "Winston Churchill"
            },
            {
                text: "The only impossible journey is the one you never begin.",
                author: "Tony Robbins"
            },
            {
                text: "In the middle of difficulty lies opportunity.",
                author: "Albert Einstein"
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        this.loadUserProfile();
        this.loadNotes();
        this.loadTodos();
        this.loadQuote();
        this.setTheme(this.theme);
        this.getWeather();
        
        // Update clock every second
        setInterval(() => this.updateClock(), 1000);
    }

    setupEventListeners() {
        // Profile modal
        document.getElementById('profileAvatar').addEventListener('click', () => {
            this.showProfileModal();
        });

        document.getElementById('closeProfileModal').addEventListener('click', () => {
            this.hideProfileModal();
        });

        document.getElementById('saveProfileBtn').addEventListener('click', () => {
            this.saveProfile();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Search toggle
        document.getElementById('searchToggle').addEventListener('click', () => {
            this.toggleSearch();
        });

        document.getElementById('searchBtn').addEventListener('click', () => {
            this.performSearch();
        });

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Todo functionality
        document.getElementById('addTodoBtn').addEventListener('click', () => {
            this.toggleTodoInput();
        });

        document.getElementById('saveTodoBtn').addEventListener('click', () => {
            this.addTodo();
        });

        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Notes functionality
        document.getElementById('saveNotesBtn').addEventListener('click', () => {
            this.saveNotes();
        });

        document.getElementById('notesTextarea').addEventListener('input', () => {
            this.autoSaveNotes();
        });

        // Quote functionality
        document.getElementById('refreshQuoteBtn').addEventListener('click', () => {
            this.loadQuote();
        });

        // Close modal when clicking outside
        document.getElementById('profileModal').addEventListener('click', (e) => {
            if (e.target.id === 'profileModal') {
                this.hideProfileModal();
            }
        });
    }

    // Clock functionality
    updateClock() {
        const now = new Date();
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        };
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };

        document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);
        
        // Update greeting based on time
        this.updateGreeting(now.getHours());
    }

    updateGreeting(hour) {
        let greeting = 'Good morning';
        if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon';
        } else if (hour >= 17) {
            greeting = 'Good evening';
        }
        document.getElementById('userGreeting').textContent = greeting;
    }

    // Weather functionality
    async getWeather() {
        try {
            if (!navigator.geolocation) {
                this.setDefaultWeather();
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    await this.fetchWeatherData(latitude, longitude);
                },
                () => {
                    this.setDefaultWeather();
                }
            );
        } catch (error) {
            console.error('Error getting weather:', error);
            this.setDefaultWeather();
        }
    }

    async fetchWeatherData(lat, lon) {
        try {
            // Using OpenWeatherMap API (you'll need to get a free API key)
            const API_KEY = 'your_api_key_here'; // Replace with actual API key
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
            );
            
            if (!response.ok) {
                throw new Error('Weather API request failed');
            }
            
            const data = await response.json();
            this.updateWeatherDisplay(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.setDefaultWeather();
        }
    }

    updateWeatherDisplay(data) {
        const icon = this.getWeatherIcon(data.weather[0].main);
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const location = data.name;

        document.getElementById('weatherIcon').innerHTML = `<i class="fas fa-${icon}"></i>`;
        document.getElementById('temperature').textContent = `${temp}°F`;
        document.getElementById('weatherDesc').textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
        document.getElementById('location').textContent = location;
    }

    getWeatherIcon(condition) {
        const iconMap = {
            'Clear': 'sun',
            'Clouds': 'cloud',
            'Rain': 'cloud-rain',
            'Snow': 'snowflake',
            'Thunderstorm': 'bolt',
            'Drizzle': 'cloud-drizzle',
            'Mist': 'smog',
            'Fog': 'smog'
        };
        return iconMap[condition] || 'sun';
    }

    setDefaultWeather() {
        document.getElementById('weatherIcon').innerHTML = '<i class="fas fa-sun"></i>';
        document.getElementById('temperature').textContent = '72°F';
        document.getElementById('weatherDesc').textContent = 'Sunny';
        document.getElementById('location').textContent = 'New York, NY';
    }

    // User profile functionality
    showProfileModal() {
        document.getElementById('profileModal').classList.add('active');
        document.getElementById('nameInput').value = this.userProfile.name || '';
        document.getElementById('locationInput').value = this.userProfile.location || '';
    }

    hideProfileModal() {
        document.getElementById('profileModal').classList.remove('active');
    }

    saveProfile() {
        const name = document.getElementById('nameInput').value.trim();
        const location = document.getElementById('locationInput').value.trim();

        if (name) {
            this.userProfile.name = name;
            this.userProfile.location = location;
            localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
            
            document.getElementById('userName').textContent = name;
            this.hideProfileModal();
            
            // Show success message
            this.showNotification('Profile saved successfully!', 'success');
        }
    }

    loadUserProfile() {
        if (this.userProfile.name) {
            document.getElementById('userName').textContent = this.userProfile.name;
        }
    }

    // Theme functionality
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(this.theme);
        localStorage.setItem('theme', this.theme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Search functionality
    toggleSearch() {
        const searchContainer = document.getElementById('searchContainer');
        searchContainer.classList.toggle('active');
        
        if (searchContainer.classList.contains('active')) {
            document.getElementById('searchInput').focus();
        }
    }

    performSearch() {
        const query = document.getElementById('searchInput').value.trim();
        if (query) {
            // You can choose between Google and DuckDuckGo
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        }
    }

    // Todo functionality
    toggleTodoInput() {
        const inputContainer = document.getElementById('todoInputContainer');
        inputContainer.classList.toggle('active');
        
        if (inputContainer.classList.contains('active')) {
            document.getElementById('todoInput').focus();
        }
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (text) {
            const todo = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            this.todos.push(todo);
            this.saveTodos();
            this.renderTodos();
            
            input.value = '';
            this.toggleTodoInput();
            this.showNotification('Task added!', 'success');
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.renderTodos();
        this.showNotification('Task deleted!', 'success');
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';

        if (this.todos.length === 0) {
            todoList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">No tasks yet. Add one above!</p>';
            return;
        }

        this.todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            todoItem.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="dashboard.toggleTodo(${todo.id})">
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="todo-delete" onclick="dashboard.deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            todoList.appendChild(todoItem);
        });
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        this.renderTodos();
    }

    // Notes functionality
    saveNotes() {
        this.notes = document.getElementById('notesTextarea').value;
        localStorage.setItem('notes', this.notes);
        this.showNotification('Notes saved!', 'success');
    }

    autoSaveNotes() {
        this.notes = document.getElementById('notesTextarea').value;
        localStorage.setItem('notes', this.notes);
    }

    loadNotes() {
        document.getElementById('notesTextarea').value = this.notes;
    }

    // Quote functionality
    loadQuote() {
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        document.getElementById('quoteText').textContent = `"${randomQuote.text}"`;
        document.getElementById('quoteAuthor').textContent = `- ${randomQuote.author}`;
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '6px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
        });

        // Add animation keyframes
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});

// Add some additional utility functions
window.addEventListener('beforeunload', () => {
    // Auto-save notes before leaving
    if (window.dashboard) {
        window.dashboard.autoSaveNotes();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (window.dashboard) {
            window.dashboard.toggleSearch();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        if (window.dashboard) {
            window.dashboard.hideProfileModal();
        }
    }
});

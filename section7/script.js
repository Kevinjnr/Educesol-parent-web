// Calendar variables
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Sample events data
const events = {
    '2025-01-01': { text: 'National Day Holiday', type: 'holiday' },
    '2025-01-06': { text: 'School Resumption', type: 'school' },
    '2025-01-20': { text: 'Personal Written', type: 'personal' },
    '2025-01-25': { text: 'PTA Meeting', type: 'meeting' }
};

const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDay.getDay() || 7) + 1);
    
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = date.getDate();
        
        if (date.getMonth() !== month) {
            dayElement.classList.add('other-month');
        }
        
        if (date.toDateString() === new Date().toDateString()) {
            dayElement.classList.add('today');
        }
        
        const dateString = date.toISOString().split('T')[0];
        if (events[dateString]) {
            dayElement.classList.add('has-event', events[dateString].type);
            const eventText = document.createElement('div');
            eventText.className = 'event-text';
            eventText.textContent = events[dateString].text;
            dayElement.appendChild(eventText);
        }
        
        calendarDays.appendChild(dayElement);
    }
    
    document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

function showEventForm() {
    document.getElementById('eventForm').classList.add('show');
}

function hideEventForm() {
    document.getElementById('eventForm').classList.remove('show');
}

function showManageEvents() {
    document.getElementById('manageEvents').classList.add('show');
}

function hideManageEvents() {
    document.getElementById('manageEvents').classList.remove('show');
}

// Initialize the calendar
generateCalendar(currentMonth, currentYear);

// Form submission handler
document.getElementById('createEventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Event created successfully!');
    hideEventForm();
});

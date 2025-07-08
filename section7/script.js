// Calendar functionality
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

// Sample events data
const events = {
    '2025-01-01': { name: 'National Day holiday', type: 'holiday' },
    '2025-01-06': { name: 'School Resumption', type: 'school' },
    '2025-01-20': { name: 'Personal written', type: 'regular' },
    '2025-01-25': { name: 'PTA Meeting', type: 'holiday' }
};

function generateCalendar() {
    const monthYearElement = document.getElementById('monthYear');
    monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Adjust for Monday start
    const startDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    // Previous month days
    const prevMonth = new Date(currentYear, currentMonth, 0);
    for (let i = startDay - 1; i >= 0; i--) {
        const day = prevMonth.getDate() - i;
        const dayElement = document.createElement('div');
        dayElement.className = 'day other-month';
        dayElement.textContent = day;
        calendarDays.appendChild(dayElement);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;

        // Check if today
        const today = new Date();
        if (currentYear === today.getFullYear() && 
            currentMonth === today.getMonth() && 
            day === today.getDate()) {
            dayElement.classList.add('today');
        }

        // Check for events
        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (events[dateKey]) {
            dayElement.classList.add('has-event');
            if (events[dateKey].type === 'holiday') {
                dayElement.classList.add('holiday');
            }
            const eventText = document.createElement('div');
            eventText.className = 'event-text';
            eventText.textContent = events[dateKey].name;
            dayElement.appendChild(eventText);
        }

        calendarDays.appendChild(dayElement);
    }

    // Next month days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day other-month';
        dayElement.textContent = day;
        calendarDays.appendChild(dayElement);
    }
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
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

// Initialize calendar
generateCalendar();
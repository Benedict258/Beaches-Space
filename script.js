// Data structures
let schedule = {};
let tasks = [];
let notifications = [];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const categories = ['Programming', 'Mechatronics & Technology', 'Schoolwork', 'Business Learning'];

// Initialize schedule
daysOfWeek.forEach(day => {
    schedule[day] = [];
});

// DOM Elements
const scheduleContent = document.getElementById('schedule-content');
const taskInput = document.getElementById('task-input');
const categorySelect = document.getElementById('category-select');
const daySelect = document.getElementById('day-select');
const addTaskButton = document.getElementById('add-task');
const progressContent = document.getElementById('progress-content');
const nextTaskElement = document.getElementById('next-task');
const notificationList = document.getElementById('notification-list');

// Event Listeners
addTaskButton.addEventListener('click', addTask);

// Functions
function renderSchedule() {
    scheduleContent.innerHTML = '';
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day-schedule';
        dayElement.innerHTML = `
            <h3>${day}</h3>
            <div id="${day}-tasks"></div>
        `;
        scheduleContent.appendChild(dayElement);
        renderDayTasks(day);
    });
}

function renderDayTasks(day) {
    const dayTasksElement = document.getElementById(`${day}-tasks`);
    dayTasksElement.innerHTML = '';
    schedule[day].forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete('${day}', ${index})">
            <span class="task-content ${task.completed ? 'completed-task' : ''}">${task.name} (${task.category})</span>
            <button class="remove-task" onclick="removeTask('${day}', ${index})">×</button>
        `;
        dayTasksElement.appendChild(taskElement);
    });
}

function addTask() {
    const taskName = taskInput.value.trim();
    const category = categorySelect.value;
    const day = daySelect.value;

    if (taskName && category && day) {
        const newTask = {
            id: Date.now(),
            name: taskName,
            category: category,
            completed: false
        };
        tasks.push(newTask);
        schedule[day].push(newTask);
        taskInput.value = '';
        categorySelect.value = '';
        daySelect.value = '';
        renderDayTasks(day);
        renderProgress();
        updateNextTask();
    }
}

function removeTask(day, index) {
    const removedTask = schedule[day].splice(index, 1)[0];
    tasks = tasks.filter(task => task.id !== removedTask.id);
    renderDayTasks(day);
    renderProgress();
    updateNextTask();
}

function toggleTaskComplete(day, index) {
    const task = schedule[day][index];
    task.completed = !task.completed;
    const taskInMainArray = tasks.find(t => t.id === task.id);
    if (taskInMainArray) {
        taskInMainArray.completed = task.completed;
    }
    renderDayTasks(day);
    renderProgress();
    updateNextTask();
    if (task.completed) {
        addNotification(`Congratulations! You've completed the task: ${task.name}`);
    }
}

function renderProgress() {
    progressContent.innerHTML = '';
    categories.forEach(category => {
        const categoryTasks = tasks.filter(task => task.category === category);
        const totalTasks = categoryTasks.length;
        const completedTasks = categoryTasks.filter(task => task.completed).length;
        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        const progressElement = document.createElement('div');
        progressElement.innerHTML = `
            <p>${category}</p>
            <div class="progress-bar">
                <span class="progress-bar-fill" style="width: ${progress}%;"></span>
            </div>
        `;
        progressContent.appendChild(progressElement);
    });
}

function updateNextTask() {
    const nextTask = tasks.find(task => !task.completed);
    if (nextTask) {
        nextTaskElement.textContent = `Next task: ${nextTask.name} (${nextTask.category})`;
    } else {
        nextTaskElement.textContent = 'No pending tasks';
    }
}

function addNotification(message) {
    notifications.push({ id: Date.now(), message });
    renderNotifications();
}

function renderNotifications() {
    notificationList.innerHTML = '';
    notifications.slice(-5).forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification.message;
        notificationList.appendChild(li);
    });
}

// Initialize the application
renderSchedule();
renderProgress();
updateNextTask();

// Update progress and next task every 5 seconds (for demonstration purposes)
setInterval(() => {
    renderProgress();
    updateNextTask();
}, 5000);


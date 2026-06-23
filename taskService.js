const { loadTasks, saveTasks } = require('./taskStore');

const VALID_STATUSES = ['todo', 'in-progress', 'done'];

function addTask(description) {
  const tasks = loadTasks();
  const newId = tasks.length === 0
    ? 1
    : Math.max(...tasks.map(task => task.id)) + 1;
  const now = new Date().toISOString();

  const newTask = {
    id: newId,
    description,
    status: 'todo',
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);
  saveTasks(tasks);

  return newTask;
}

function updateTask(id, newDescription) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    throw new Error(`No task found with ID ${id}`);
  }

  task.description = newDescription;
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);
  return task;
}

function deleteTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    throw new Error(`No task found with ID ${id}`);
  }

  tasks.splice(index, 1);
  saveTasks(tasks);
}

function markTask(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    throw new Error(`No task found with ID ${id}`);
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);
  return task;
}

function listTasks(filter) {
  const tasks = loadTasks();

  if (!filter) {
    return tasks;
  }

  if (!VALID_STATUSES.includes(filter)) {
    throw new Error(`Invalid filter: ${filter}`);
  }

  return tasks.filter(t => t.status === filter);
}

module.exports = { addTask, updateTask, deleteTask, markTask, listTasks, VALID_STATUSES };
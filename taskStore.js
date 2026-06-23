const fs = require('fs');
const FILE_PATH = 'tasks.json';

function loadTasks() {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }

  const rawData = fs.readFileSync(FILE_PATH, 'utf-8');

  if (rawData.trim() === '') {
    return [];
  }

  try {
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error: tasks.json is corrupted and could not be read.');
    process.exit(1);
  }
}

function saveTasks(tasks) {
  const jsonData = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(FILE_PATH, jsonData);
}

module.exports = { loadTasks, saveTasks };
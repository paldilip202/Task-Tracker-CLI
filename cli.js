const { addTask, updateTask, deleteTask, markTask, listTasks } = require('./taskService');

const args = process.argv.slice(2);
const command = args[0];
const options = args.slice(1);

switch (command) {
  case 'add': {
    const description = options[0];

    if (!description) {
      console.log('Error: Please provide a task description.');
      break;
    }

    const newTask = addTask(description);
    console.log(`Task added successfully (ID: ${newTask.id})`);
    break;
  }

  case 'update': {
    const id = Number(options[0]);
    const newDescription = options[1];

    if (!id || !newDescription) {
      console.log('Error: Usage: cli update <id> <description>');
      break;
    }

    try {
      updateTask(id, newDescription);
      console.log(`Task ${id} updated successfully`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    break;
  }

  case 'delete': {
    const id = Number(options[0]);

    if (!id) {
      console.log('Error: Usage: cli delete <id>');
      break;
    }

    try {
      deleteTask(id);
      console.log(`Task ${id} deleted successfully`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    break;
  }

  case 'mark-in-progress': {
    const id = Number(options[0]);

    try {
      markTask(id, 'in-progress');
      console.log(`Task ${id} marked as in-progress`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    break;
  }

  case 'mark-done': {
    const id = Number(options[0]);

    try {
      markTask(id, 'done');
      console.log(`Task ${id} marked as done`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    break;
  }

  case 'list': {
    const filter = options[0]; // undefined, 'done', 'todo', or 'in-progress'

    try {
      const tasks = listTasks(filter);

      if (tasks.length === 0) {
        console.log('No tasks found.');
        break;
      }

      tasks.forEach(task => {
        console.log(`[${task.id}] ${task.description} - ${task.status}`);
      });
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
    break;
  }

  default:
    console.log('Invalid command');
}
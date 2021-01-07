let tasks = [];

function create(task) {
  tasks = [task, ...tasks];
  console.log('tasks', tasks);
}

function read() {
  return tasks;
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
}

function convertCase(temporalityKebabCase) {
  let result;
  switch (temporalityKebabCase) {
    case 'short-term':
      result = 'court terme';
      break;
    case 'medium-term':
      result = 'moyen terme';
      break;
    case 'long-term':
      result = 'long terme';
      break;
    default:
      result = temporalityKebabCase;
      break;
  }
  return result;
}

export default {
  create,
  read,
  deleteTask,
  convertCase,
};

let tasks = [];
const storageKey = 'tasks-vue3-compo-api';

function create(task) {
  if(tasks === null) {
    tasks = [];
  }
  tasks = [task, ...tasks];
  console.log('tasks', tasks);
  save();
}

function read() {
  tasks = retrieveTasks();
  return tasks;
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
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

function save() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function retrieveTasks() {
  const fromLocalstorage = localStorage.getItem(storageKey)
  return JSON.parse(fromLocalstorage);
}

export default {
  create,
  read,
  deleteTask,
  convertCase,
};

let tasks = [];

function create(task) {
  tasks = [task, ...tasks];
  console.log('tasks', tasks);
}

function read() {
  return tasks;
}

export default {
  create,
  read,
};
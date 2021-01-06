<template>
  <div v-if="tasks.length > 0">
    <div class="task" v-for="task in tasks" :key="task.id">
      <h3>{{ task.name }}</h3>
      <p>{{ task.description }}</p>
      <p>Echéance : {{ convertCase(task.temporality) }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import tasksService from "@/services/tasks.js";
export default {
  setup() {
    const tasks = ref([]);
    tasks.value = tasksService.read();
    console.log("mounted | tasks", tasks.value);

    function convertCase(temporality) {
          return tasksService.convertCase(temporality);
      }

    return { tasks, convertCase };
  },
};
</script>

<style>
.task {
  margin: 10px 15px;
  border: 3px solid #42b983;
  border-radius: 5px;
}
</style> 
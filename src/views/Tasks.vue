<template>
  <input type="text" placeholder="filtrer" v-model="letters" @keyup="filter" />
  <div v-show="tasksFiltered.length > 0">
    <div class="task" v-for="task in tasksFiltered" :key="task.id">
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
    const letters = ref("");
    let tasksFiltered = ref([]);
    tasks.value = tasksService.read();
    filter();
    console.log("mounted | tasks", tasks.value);

    function convertCase(temporality) {
      return tasksService.convertCase(temporality);
    }

    function filter() {
      if (letters.value.length === 0) {
        tasksFiltered.value = tasks.value;
      } else {
        tasksFiltered.value = tasks.value.filter((t) =>
          t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
        );
      }
    }

    return { tasks, letters, tasksFiltered, convertCase, filter };
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
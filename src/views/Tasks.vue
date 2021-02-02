<template>
  <Modal
    v-if="isInEditMode"
    :task="taskToEdit"
    @updatetask="updateTask($event)"
    @cancel="cancelEdit"
  />
  <input type="text" placeholder="filtrer" v-model="letters" @keyup="filter" />
  <div class="radio-filters">
    <label for="all">
      <input type="radio" id="all" value="" v-model="selectedTemporality" />
      toutes
    </label>
    <label for="short-term">
      <input
        type="radio"
        id="short-term"
        value="short-term"
        v-model="selectedTemporality"
      />
      court terme
    </label>
    <label for="medium-term">
      <input
        type="radio"
        id="medium-term"
        value="medium-term"
        v-model="selectedTemporality"
      />
      moyen terme
    </label>
    <label for="long-term">
      <input
        type="radio"
        id="long-term"
        value="long-term"
        v-model="selectedTemporality"
      />
      long terme
    </label>
  </div>
  <div v-show="tasksFiltered && tasksFiltered.length > 0">
    <div class="task" v-for="task in tasksFiltered" :key="task.id">
      <h3>{{ task.name }}</h3>
      <p>{{ task.description }}</p>
      <p>Echéance : {{ convertCase(task.temporality) }}</p>
      <div>
        <button class="small" @click="() => deleteTask(task.id)">suppr</button>
        <button class="small" @click="() => toggle(task)">modif</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import tasksService from "@/services/tasks.js";
import Modal from "../components/Modal.vue";
export default {
  components: {
    Modal,
  },
  setup() {
    const tasks = ref([]);
    const letters = ref("");
    const selectedTemporality = ref("");
    let tasksFiltered = ref([]);
    let isInEditMode = ref(false);
    let taskToEdit = ref(null);
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
      if (selectedTemporality.value !== "") {
        tasksFiltered.value = tasksFiltered.value.filter(
          (t) => t.temporality === selectedTemporality.value
        );
      }
    }

    function toggle(task) {
      taskToEdit.value = task;
      isInEditMode.value = true;
    }

    function updateTask(task) {
      tasksService.updateTask(task);
      tasks.value = tasksService.read();
      filter();
      cancelEdit();
    }

    function cancelEdit() {
      isInEditMode.value = false;
      taskToEdit.value = null;
    }

    function deleteTask(id) {
      tasksService.deleteTask(id);
      tasks.value = tasksService.read();
      filter();
    }

    watch(selectedTemporality, (newValue, oldValue) => {
      console.log("newValue: ", newValue, "oldValue: ", oldValue);
      if (newValue !== "") {
        filter();
      } else {
        // take everything then filter
        tasksFiltered.value = tasks.value;
        filter();
      }
    });

    return {
      tasks,
      letters,
      selectedTemporality,
      tasksFiltered,
      convertCase,
      filter,
      deleteTask,
      isInEditMode,
      taskToEdit,
      toggle,
      updateTask,
      cancelEdit,
    };
  },
};
</script>

<style>
.task {
  margin: 10px 15px;
  border: 3px solid #42b983;
  border-radius: 5px;
}
.radio-filters {
  display: flex;
  justify-content: center;
}
.small {
  width: 45px;
}
</style> 
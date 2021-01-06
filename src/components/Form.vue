<template>
  <h3>Créer une tâche</h3>
  <form @submit.prevent="createTask">
    <input
      type="text"
      v-model="name"
      placeholder="Nom de la tâche"
      ref="txtName"
    /><br />
    <textarea
      cols="30"
      rows="10"
      v-model="description"
      placeholder="Description de la tâche"
    ></textarea
    ><br />
    <select v-model="temporality">
      <option
        v-for="tempo in temporalityTypes"
        :value="tempo.value"
        :key="tempo.id"
      >
        {{ tempo.name }}
      </option></select
    ><br />
    <button>créer</button>
  </form>
  <div></div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "Form",
  emits: ["createtask"],
  setup(props, context) {
    let txtName = ref(null);
    let name = ref("");
    let description = ref("");
    const temporalityTypes = ref([
      {
        id: 1,
        name: "court terme",
        value: "short-term",
      },
      {
        id: 2,
        name: "moyen terme",
        value: "medium-term",
      },
      {
        id: 3,
        name: "long terme",
        value: "long-term",
      },
    ]);
    let temporality = ref(null);

    function createTask() {
      const task = {
        id: Date.now(),
        name: name.value,
        description: description.value,
        temporality: temporality.value,
      };
      console.log("task", task);
      context.emit("createtask", task);
      resetForm();
    }

    function resetForm() {
      name.value = "";
      description.value = "";
      temporality.value = null;
      txtName.value.focus();
    }

    onMounted(() => {
      console.log("onMounted | txtName.value", txtName.value);
      txtName.value.focus();
    });

    return {
      name,
      description,
      temporalityTypes,
      temporality,
      createTask,
      resetForm,
      txtName,
    };
  },
};
</script>

<style>
input,
textarea,
select,
button {
  width: 90%;
  margin: 5px 10px;
}
</style> 
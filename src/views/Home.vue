<template>
  <div class="home">
    <HelloWorld msg="Progressor (compo API)" />
    <Form @createtask="addTask" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Form from "@/components/Form.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Form,
  },
  setup() {
    function addTask(data) {
      console.log("Home.vue | task to add", data);
    }

    return { addTask };
  },
};
</script>

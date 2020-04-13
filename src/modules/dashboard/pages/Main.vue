<template>
  <div>
    <widgets-icons />
  </div>
</template>

<script>
import WidgetsIcons from "../components/WidgetsIcons";
export default {
  name: "Main",
  components: { WidgetsIcons },
  mounted() {
    localStorage.removeItem("configData");
    localStorage.removeItem("sort");
    localStorage.removeItem("filter");
    localStorage.removeItem("paginate");
  }
};
</script>
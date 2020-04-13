<template>
  <div>
    <select
      class="selectpicker form-control form-control-sm"
      :multiple="multiple"
      :disabled="disabled"
      title="Informe"
      data-live-search="true"
      :id="id"
    >
      <option
        :value="list.value"
        v-for="(list, index) in selectData"
        :key="index"
      >{{ list.name.toUpperCase() }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "MultSelect",
  props: {
    id: {
      required: true,
      type: String
    },
    multiple: {
      required: false,
      default: true
    },
    selectData: {
      required: true,
      type: Array
    },
    setData: {
      required: false
    },
    disabled: {
      required: false,
      default: false
    }
  },
  data() {
    return {
      values_selected: [],
      disable: false
    };
  },
  methods: {
    refresh() {
      setTimeout(() => {
        $(`#${this.id}`).selectpicker("refresh");
      }, 2000);
    }
  },
  mounted() {
    $(".selectpicker").selectpicker({
      noneResultsText: "nada encontrado :("
    });

    $(`#${this.id}`).change(() => {
      this.values_selected = $(`#${this.id}`).val();
      this.$emit("values", this.values_selected);
    });

    this.refresh();
  },
  watch: {
    setData() {
      $(`#${this.id}`).selectpicker("val", this.setData.data);
      this.refresh();
    }
  }
};
</script>
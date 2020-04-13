<template>
  <div>
    <button
      :class="classButton"
      :disabled="disabled || loading"
      :style="styleButton"
      @click="$emit('click')"
    >
      <i :class="classButtonIcon" v-if="!loading" style="margin-right: 2px"></i>
      <span v-if="!loading">{{ textButton }}</span>
      <span v-if="loading">
        <div class="spinner" style="float: left;"></div>
        <span style="margin-left: 5px;" v-if="showTextLoading">{{ textLoading }}</span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "CButton",
  props: {
    textButton: {
      required: true
    },
    classButton: {
      required: false,
      type: String,
      default: "button btn btn-sm btn-default"
    },
    styleButton: {
      required: false,
      type: String
    },
    classButtonIcon: {
      required: false,
      type: String
    },
    disabled: {
      required: false,
      default: false,
      type: Boolean
    },
    loading: {
      required: false,
      default: false,
      type: Boolean
    },
    textLoading: {
      default: "processando ...",
      type: String,
      required: false
    },
    showTextLoading: {
      default: true,
      type: Boolean,
      required: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.spinner {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ffffff;
  border-top-color: #ffffff;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: spin 1.2s linear infinite;
}
</style>
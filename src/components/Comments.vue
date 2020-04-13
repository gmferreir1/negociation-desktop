<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="comment-frame">
          <textarea
            rows="2"
            class="form-control"
            @focus="focusText"
            @blur="focusText"
            style="border: none; !important"
            v-model="form.comment"
            :placeholder="placeholder"
            :disabled="disabled"
          ></textarea>
          <div v-show="focus_comment" class="v-fade">
            <button
              class="button btn btn-sm"
              :class="{'button-show': focus_comment, 'button-hide': !focus_comment, 'btn-success': form.comment, 'btn-default': !form.comment}"
              v-show="focus_comment"
              :disabled="!form.comment || loading"
              @click="save"
            >Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/util/dateTime";
export default {
  props: {
    placeholder: {
      required: false,
      type: String
    },
    saved: {
      required: false,
      type: Boolean
    },
    disabled: {
      required: false,
      type: Boolean
    }
  },
  name: "Comments",
  data() {
    return {
      focus_comment: false,
      loading: false,
      form: {}
    };
  },
  methods: {
    dateFormat,
    cleanForm() {
      this.form = {
        comment: ""
      };
    },
    focusText() {
      if (this.form.comment) return;
      this.focus_comment = !this.focus_comment;
    },
    save() {
      this.loading = true;
      this.$emit("saveComment", { comment: this.form.comment });
    }
  },
  watch: {
    saved() {
      this.focus_comment = false;
      this.loading = false;
      this.cleanForm();
    }
  },
  mounted() {
    this.cleanForm();
  }
};
</script>

<style scoped>
.comment-frame {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px -1px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  margin: 4px 4px 12px 0;
  overflow: hidden;
  position: relative;
  transition: box-shadow 85ms ease;
}

textarea {
  resize: none;
}

.v-fade {
  display: inherit !important; /* override v-show display: none */
  margin-left: 10px;
  transition: opacity 0.5s;
}

.v-fade[style*="display: none;"] {
  opacity: 0;
}

.button-show {
  margin-bottom: 5px;
}
.button-hide {
  margin: 0px;
}
</style>
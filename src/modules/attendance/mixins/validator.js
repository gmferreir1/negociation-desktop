export default {
  validators: {
    "form.contract": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.responsible_solicitation": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
  },
  methods: {
    submitForm() {
      const self = this;
      this.$validate().then(function (success) {
        if (success) {
          if (!self.form.id) {
            self.create();
          } else {
            self.update();
          }
        }
      });
    }
  }
};

export default {
  validators: {
    "form.email": function (value) {
      return Validator.value(value)
        .email("Inválido")
        .required("Obrigatório");
    }
  },
  methods: {
    submitForm() {
      const self = this;
      this.$validate().then(function (success) {
        if (success) {
          self.sendEmailRecovery();
        }
      });
    }
  }
};

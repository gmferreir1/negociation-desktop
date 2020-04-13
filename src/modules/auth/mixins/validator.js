export default {
  validators: {
    "form.login": function(value) {
      return Validator.value(value)
        .email("Inválido")
        .required("Obrigatório");
    },
    "form.password": function(value) {
      return Validator.value(value)
        .required("Obrigatório")
        .minLength(6, "Minímo 6 caracteres");
    }
  },
  methods: {
    submitForm() {
      const self = this;
      this.$validate().then(function(success) {
        if (success) {
          self.login();
        }
      });
    }
  }
};

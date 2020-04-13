<template>
  <div>
    <form-auth @openModalPasswordRecovery="data => data_modal_password_recovery = data" />

    <!-- modal password recovery -->
    <modal-password-recovery :dataModal="data_modal_password_recovery" />
    <!-- / modal password recovery -->
  </div>
</template>

<script>
import FormAuth from "../components/FormAuth";
import ModalPasswordRecovery from "../components/ModalPasswordRecovery";
export default {
  name: "Auth",
  components: { FormAuth, ModalPasswordRecovery },
  data() {
    return {
      data_modal_password_recovery: {}
    };
  }
};
</script>
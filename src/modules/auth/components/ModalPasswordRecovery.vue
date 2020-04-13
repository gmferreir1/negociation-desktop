<template>
  <div>
    <div id="modal_password_recovery" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <spinner style="position: fixed; top: 80px; left: 48%" v-if="loading_data" />

        <div class="modal-content">
          <div class="modal-header panel-modal">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h5 class="modal-title">
              <i class="fa fa-lock"></i>
              Recuperação de Senha
            </h5>
          </div>

          <div class="modal-body" :class="{'opacity-form': loading_data}">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Informe o email cadastrado</label>
                  <input
                    type="text"
                    class="form-control input-sm"
                    v-model="form.email"
                    @keypress.enter="submitForm"
                  />
                  <small class="error">{{ validation.firstError('form.email') }}</small>
                </div>
              </div>
            </div>
            <c-button
              classButton="btn btn-sm btn-default"
              textButton="Enviar email de recuperação"
              classButtonIcon="fa fa-check"
              :loading="loading"
              @click="submitForm"
              :disabled="loading"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import CButton from "@/components/CButton";
import Required from "@/components/Required";
import rulesValidator from "../mixins/validator_recovery_password";

export default {
  name: "ModalPasswordRecovery",
  props: ["dataModal"],
  mixins: [rulesValidator],
  components: {
    Spinner,
    CButton
  },
  data() {
    return {
      loading: false,
      loading_data: false,
      form: {}
    };
  },
  methods: {
    cleanForm() {
      this.form = {
        email: ""
      };

      this.validation.reset();
    },
    openModal() {
      $("#modal_password_recovery").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    sendEmailRecovery() {
      this.loading = true;
      this.loading_data = true;

      const queryParams = {
        params: {
          email: this.form.email
        }
      };

      http
        .get("login/send-email-recovery-password", queryParams)
        .then(result => {
          _notification.success(
            "Enviado email de recuperação, acesse o email informado para recuperar a senha."
          );
          this.closeModal();
          this.cleanForm();
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
            this.loading_data = false;
          }, 300);
        });
    },
    closeModal() {
      $("#modal_password_recovery").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.cleanForm();
      this.form.email = this.dataModal.data.email;
      this.openModal();
    }
  }
};
</script>

<style scoped>
.modal-title {
  text-transform: uppercase !important;
}

.modal-body {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}

label {
  font-weight: bold;
}
</style>
<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <spinner style="position: fixed; top: 30px; left: 25%" v-if="loading_data" />

        <!-- general form elements -->
        <div class="box box-default" :class="{'opacity-form': loading_data}">
          <div class="box-header with-border" v-if="!check_token && !error_message">
            <h3 class="box-title">
              <i class="fa fa-user"></i>
              Recuperação de Senha
            </h3>
          </div>
          <!-- /.box-header -->
          <!-- form start -->
          <div class="box-body">
            <div class="row" v-if="check_token">
              <div class="col-sm-12">verificando ...</div>
            </div>
            <div class="row" v-if="error_message">
              <div class="col-sm-12">
                <i class="fa fa-exclamation-triangle" style="color: red"></i>
                <span style="margin-left: 3px;">{{ error_message }}</span>
              </div>
            </div>

            <div class="row" v-if="password_changed">
              <div class="col-sm-12">
                <i class="fa fa-check" style="color: green"></i>
                <span style="color: green">Senha alterada com sucesso !!</span>

                <p style="margin-top: 10px;">
                  Clique &nbsp;
                  <router-link :to="{ name: 'auth' }" style="font-weight: bold; color: #000000">AQUI</router-link>&nbsp; para logar novamente
                </p>
              </div>
            </div>

            <div class="row" v-if="!check_token && !error_message && !password_changed">
              <div class="col-sm-6 col-md-6 col-lg-6">
                <div class="form group">
                  <label>Informe a Nova Senha</label>
                  <input type="password" class="form-control input-sm" v-model="form.password" />
                  <small class="error">{{ validation.firstError('form.password') }}</small>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6">
                <div class="form group">
                  <label>Repita a Nova Senha</label>
                  <input
                    type="password"
                    class="form-control input-sm"
                    v-model="form.password_confirm"
                    @keypress.enter="submitForm"
                  />
                  <small class="error">{{ validation.firstError('form.password_confirm') }}</small>
                </div>
              </div>
            </div>

            <div
              class="row"
              style="margin-top: 10px;"
              v-if="!check_token && !error_message && !password_changed"
            >
              <div class="col-sm-12">
                <c-button
                  classButton="btn btn-sm btn-danger"
                  textButton="Alterar senha"
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
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import CButton from "@/components/CButton";
import rulesValidator from "../mixins/validator_form_password_recovery";
export default {
  name: "FormPasswordRecovery",
  mixins: [rulesValidator],
  components: { Spinner, CButton },
  data() {
    return {
      loading_data: true,
      check_token: true,
      loading: false,
      form: {},
      error_message: "",
      token: "",
      password_changed: false
    };
  },
  methods: {
    cleanForm() {
      this.form = {
        password: "",
        password_confirm: ""
      };

      this.error_message = "";
      this.password_changed = false;

      this.validation.reset();
    },
    async checkToken() {
      const routeData = this.$route;
      this.token = routeData.query.token;

      const queryParams = {
        params: {
          token: routeData.query.token
        }
      };

      http
        .get("login/check-token", queryParams)
        .then(result => {})
        .catch(err => {
          const error_data = err.response.data;
          if (error_data.length) {
            setTimeout(() => {
              this.error_message = error_data[0].message;
            }, 300);
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.loading_data = false;
            this.check_token = false;
          }, 300);
        });
    },
    changePassword() {
      this.loading = true;
      this.loading_data = true;
      http
        .put(`login/change-password?token=${this.token}`, this.form)
        .then(result => {
          this.password_changed = true;
          _notification.success();
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
            this.loading_data = false;
          }, 300);
        });
    }
  },
  async mounted() {
    this.cleanForm();
    await this.checkToken();
  }
};
</script>
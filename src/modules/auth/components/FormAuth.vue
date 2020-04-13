<template>
  <div>
    <div class="container">
      <div
        id="loginbox"
        style="margin-top:50px;"
        class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
      >
        <div class="panel panel-info">
          <div class="panel-heading">
            <div class="panel-title">Login no Sistema</div>
            <!--
            <div style="float:right; font-size: 80%; position: relative; top:-10px">
              <a href="#">Esqueceu a senha ?</a>
            </div>
            -->
          </div>

          <div style="padding-top:30px" class="panel-body">
            <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>

            <form id="loginform" class="form-horizontal" role="form" @submit.prevent>
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="glyphicon glyphicon-user"></i>
                </span>
                <input
                  id="login-username"
                  type="text"
                  class="form-control"
                  v-model="form.login"
                  placeholder="Email"
                />
              </div>
              <small class="error">{{ validation.firstError('form.login') }}</small>

              <div class="input-group" style="margin-top: 25px;">
                <span class="input-group-addon">
                  <i class="glyphicon glyphicon-lock"></i>
                </span>
                <input
                  id="login-password"
                  type="password"
                  class="form-control"
                  v-model="form.password"
                  @keypress.enter="submitForm"
                  placeholder="Senha"
                />
              </div>
              <small class="error">{{ validation.firstError('form.password') }}</small>

              <div class="row">
                <div class="col-sm-12 error">{{error_login_message}}</div>
              </div>

              <!--
              <div class="input-group">
                <div class="checkbox">
                  <label>
                    <input id="login-remember" type="checkbox" name="remember" value="1" /> Remember me
                  </label>
                </div>
              </div>
              -->

              <div style="margin-top:20px" class="form-group">
                <!-- Button -->

                <div class="col-sm-12 controls">
                  <c-button
                    textButton="Efetuar Login"
                    :loading="loading"
                    classButton="btn btn-success"
                    @click="submitForm"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-12 control">
                  <div style="border-top: 1px solid#888; padding-top:15px; font-size:85%">
                    Esqueceu sua senha !
                    <a
                      href="#"
                      @click.prevent="$emit('openModalPasswordRecovery',  { data: { email: form.login } })"
                    >Clique aqui para recuperar</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CButton from "@/components/CButton";
import rulesValidation from "../mixins/validator";
export default {
  mixins: [rulesValidation],
  components: { CButton },
  name: "FormAuth",
  data() {
    return {
      loading: false,
      error_login_message: "",
      form: {}
    };
  },
  methods: {
    /** limpa o form */
    cleanForm() {
      this.form = {
        login: "",
        password: "",
        remember: false
      };
      this.error_login_message = "";
      this.validation.reset();
    },
    /** Efetua o login */
    login() {
      this.loading = true;

      http
        .post("login/authenticate", this.form)
        .then(result => {
          const dataUserToken = {
            token: result.data.token,
            type_token: result.data.type
          };

          localStorage.setItem("dataLogin", JSON.stringify(dataUserToken));

          this.getDataUserLogged();
        })
        .catch(err => {
          this.loading = false;
          if (err.response.status === 401) {
            this.error_login_message = "Erro: Usuário e/ou senha inválidos";
          }
          if (err.response.status === 400) {
            this.error_login_message = `Erro: ${err.response.data[0].message}`;
          }
        });
    },
    /** Pega os dados do usuário logado */
    getDataUserLogged() {
      http
        .get("login/get-data-user")
        .then(result => {
          const dataLocalStorage = JSON.parse(
            localStorage.getItem("dataLogin")
          );

          const data = result.data;

          dataLocalStorage.id = data.id;
          dataLocalStorage.name = data.name;
          dataLocalStorage.last_name = data.last_name;
          dataLocalStorage.admin = data.admin;
          dataLocalStorage.created_at = data.created_at;

          localStorage.setItem("dataLogin", JSON.stringify(dataLocalStorage));

          setTimeout(() => {
            this.$router.push({
              name: "dashboard_main"
            });
            //window.location.href = "/";
          }, 100);
        })
        .catch(() => {
          this.error_login_message = "Erro ao consultar dados do usuário";
          this.loading = false;
        });
    }
  },
  computed: {
    disabledButtonLogin() {
      if (!this.form.login || !this.form.password) {
        return true;
      }
      return false;
    }
  },
  watch: {
    "form.login"() {
      this.error_login_message = "";
    },
    "form.password"() {
      this.error_login_message = "";
    }
  },
  mounted() {
    this.cleanForm();
  }
};
</script>

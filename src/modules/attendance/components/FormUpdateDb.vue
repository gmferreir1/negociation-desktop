<template>
  <div>
    <div
      class="box box-warning no-border"
      style="margin-bottom: 5px;"
      :class="{'opacity-form': loading_data}"
    >
      <div class="box-header with-border">
        <h3 class="box-title">
          <i class="fa fa-database"></i>
          ATUALIZAÇÃO BASE CONTRATOS
        </h3>
      </div>
      <!-- /.box-header -->
      <!-- form start -->
      <div class="box-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label>Qual a atualização deseja fazer ?</label>
              <select class="form-control input-sm" v-model="form.type_update" disabled>
                <option value>Informe</option>
                <option
                  :value="list.value"
                  v-for="(list, index) in select.types_update"
                  :key="index"
                >{{ list.name.toUpperCase() }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row" v-if="form.type_update && form.type_update !== 'database_types_immobile'">
          <div class="col-md-12">
            <span>
              <span style="font-weight: bold; color: red">Atenção:</span> Permitido apenas arquivos
              <code>xlsx</code>
            </span>
          </div>
        </div>

        <!-- form send file -->
        <form
          @submit.prevent="attachmentFile"
          id="form_report"
          v-if="form.type_update && form.type_update !== 'database_types_immobile'"
        >
          <div class="row" style="margin-top: 10px;">
            <div class="col-md-12">
              <label style="font-size: 12px">Selecione o arquivo</label>
              <input type="file" id="file" name="file" />
            </div>
          </div>

          <div class="row" style="margin-top: 10px;">
            <div class="col-md-12">
              <button class="button btn btn-sm btn-default" :disabled="loading" type="submit">
                <div v-if="loading">
                  <spinner />
                  {{ message_send }}
                </div>

                <div v-if="!loading">
                  <i class="icon icon-check"></i>
                  Enviar Arquivo
                </div>
              </button>
            </div>
          </div>
        </form>
        <!-- / form send file -->
        <c-button
          v-if="form.type_update && form.type_update === 'database_types_immobile'"
          classButton="btn btn-sm btn-success"
          textButton="Atualizar Dados"
          classButtonIcon="fa fa-check"
          :loading="loading"
          :disabled="loading"
          @click="updateData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import CButton from "@/components/CButton";
export default {
  name: "FormUpload",
  components: { Spinner, CButton },
  props: ["typeUpdate"],
  data() {
    return {
      loading_data: false,
      loading: false,
      files: [],
      message_send: null,
      select: {
        types_update: [
          { value: "database_immobile", name: "base de imóveis" },
          { value: "database_clients", name: "base de clientes" },
          { value: "database_types_immobile", name: "base tipos de imóveis" },
          { value: "database_contracts", name: "base de contratos" }
        ]
      },
      form: {}
    };
  },
  methods: {
    cleanForm() {
      this.form = {
        type_update: "database_contracts"
      };
    },
    attachmentFile(e) {
      this.target_data = !e ? this.target_data : e.target[0];
      this.files = this.target_data.files;

      if (!this.files.length) return;
      this.loading = true;

      if (this.files.length > 0) {
        let form = new FormData();
        for (let i = 0; i < this.files.length; i++) {
          form.append("attachment", this.files[i]);

          const config = {
            onUploadProgress: progressEvent => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            }
          };

          http
            .post(
              `update-database/file-upload/?file_type=${this.form.type_update}`,
              form,
              config
            )
            .then(result => {
              _notification.success();
              $("#file").val("");
              this.cleanForm();
              setTimeout(() => (this.loading = false));
            })
            .catch(err => {})
            .finally(() => (this.loading = false));
        }
      }
    },
    updateData() {
      this.loading = true;

      const queryParams = {
        params: {
          type_update: this.form.type_update
        }
      };

      http
        .get("update-database", queryParams)
        .then(result => {
          _notification.success();
          this.cleanForm();
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
    }
  },
  mounted() {
    this.cleanForm();
  }
};
</script>

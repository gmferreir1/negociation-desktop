<template>
  <div>
    <div id="modal_show_client" class="modal" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <spinner style="position: absolute; top: 140px; left: 48%" v-if="loading_data" />

        <div class="modal-content">
          <div class="modal-header panel-modal">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h5 class="modal-title">
              <i class="fa fa-file"></i>
              Clientes no Sistema ({{ data_list.total }})
            </h5>
          </div>

          <div class="modal-body" :class="{'opacity-form': loading_data}" style="padding: 5px;">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control input-sm"
                    v-model="form.input_search"
                    placeholder="pesquise pelo código ou nome"
                    @keypress.enter="search"
                  />
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <c-button
                    classButton="btn btn-sm btn-primary"
                    textButton="Pesquisar Dados"
                    classButtonIcon="fa fa-search"
                    :loading="loading_search"
                    :disabled="loading_search"
                    @click="search"
                  />
                </div>
              </div>
            </div>

            <!-- not found component -->
            <div class="row" v-if="!data_list.data.length && !loading">
              <div class="col-ms-6 col-sm-offset-5">
                <not-found />
              </div>
            </div>
            <!-- / not found component -->

            <div class="row" style="padding-bottom: 10px;" v-if="loading">
              <div class="col-ms-6 col-sm-offset-5">
                <spinner />
              </div>
            </div>

            <div class="table-responsive tableFixHead" v-if="!loading && data_list.data.length">
              <table class="table table-hover">
                <tr>
                  <th class="text-left" style="width: 100px;">Código</th>
                  <th class="text-left">Nome</th>
                  <th class="text-center">-</th>
                </tr>
                <tr v-for="(list, index) in data_list.data" :key="index">
                  <td class="text-left">{{ list.code }}</td>
                  <td class="text-left">{{ list.name }}</td>
                  <td class="text-center">
                    <button class="btn btn-default btn-sm" @click.prevent="clientSelected(list)">
                      <i class="fa fa-check"></i>
                    </button>
                    <!--
                    <a href="#" @click.prevent="clientSelected(list)">
                      <i class="fa fa-check-circle green"></i>
                    </a>
                    -->
                  </td>
                </tr>
              </table>
            </div>
            <paginate
              v-show="data_list.data.length && !loading"
              v-model="data_list.page"
              :page-count="data_list.lastPage"
              :click-handler="paginate"
              :prev-text="'Anterior'"
              :next-text="'Proxima'"
              :container-class="'pagination'"
            ></paginate>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import NotFound from "@/components/NotFound";
import CButton from "@/components/CButton";

export default {
  name: "ModalShowClient",
  props: ["dataModal"],
  components: {
    Spinner,
    NotFound,
    CButton
  },
  data() {
    return {
      loading_search: false,
      loading_data: false,
      loading: false,
      form: {
        input_search: ""
      },
      pagination: {},
      data_list: {
        data: [],
        lastPage: 0,
        page: 0,
        total: 0
      }
    };
  },
  methods: {
    cleanForm() {
      this.form = {
        input_search: ""
      };
    },
    openModal() {
      $("#modal_show_client").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    getData() {
      const queryParams = {
        params: {
          paginate: this.pagination,
          filter: this.form
        }
      };

      http
        .get("api-query/show-clients", queryParams)
        .then(result => {
          this.data_list = result.data;
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
            this.loading_search = false;
          }, 300);
        });
    },
    clientSelected(data) {
      this.$emit("clientSelected", { data });
      this.closeModal();
    },
    paginate(page = 1) {
      this.pagination = {
        page,
        per_page: 20
      };
      this.getData();
    },
    search() {
      this.loading_search = true;
      this.paginate();
    },
    closeModal() {
      $("#modal_show_client").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.loading = true;
      this.cleanForm();
      this.openModal();
      this.paginate();
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
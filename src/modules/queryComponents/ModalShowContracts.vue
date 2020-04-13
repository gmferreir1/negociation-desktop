<template>
  <div>
    <div id="modal_show_contracts" class="modal" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <spinner style="position: absolute; top: 140px; left: 48%" v-if="loading_data" />

        <div class="modal-content">
          <div class="modal-header panel-modal">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h5 class="modal-title">
              <i class="fa fa-file"></i>
              Contratos no Sistema ({{ data_list.total }})
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
                    placeholder="pesquisa por contrato, código do imóvel ou nome do inquilino"
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
                  <th class="text-left" style="width: 100px;">Contrato</th>
                  <th class="text-left" style="width: 100px;">Cód Imóvel</th>
                  <th class="text-left">Endereço</th>
                  <th class="text-left">Inquilino</th>
                  <th class="text-left">Situação</th>
                  <th class="text-center" title="Inicio contrato">Ini.Contrato</th>
                  <th class="text-center" title="Fim contrato">Fim. Contrato</th>
                  <th>-</th>
                </tr>
                <tr v-for="(list, index) in data_list.data" :key="index">
                  <td class="text-left">{{ list.contract_crm }}</td>
                  <td class="text-left">{{ list.immobile_code }}</td>
                  <td class="text-left">{{ list.immobileData ? list.immobileData.address : " - " }}</td>
                  <td class="text-left">{{ list.tenant_name }}</td>
                  <td class="text-left">{{ list.situation }}</td>
                  <td class="text-center">{{ dateFormat(list.init_contract) }}</td>
                  <td class="text-center">{{ dateFormat(list.end_contract) }}</td>
                  <td>
                    <button class="btn btn-default btn-sm" @click.prevent="contractSelected(list)">
                      <i class="fa fa-check"></i>
                    </button>
                    <!--
                    <a href="#" @click.prevent="contractSelected(list)">
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
import { dateFormat } from "@/util/dateTime";

export default {
  name: "ModalShowContracts",
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
    dateFormat,
    cleanForm() {
      this.form = {
        input_search: ""
      };
    },
    openModal() {
      $("#modal_show_contracts").modal({
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
        .get("api-query/show-contracts", queryParams)
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
    contractSelected(data) {
      this.$emit("contractSelected", { data });
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
      this.paginate(1);
    },
    closeModal() {
      $("#modal_show_contracts").modal("hide");
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


.panel-modal {
  background: linear-gradient(to right, #41586e, #e0dcd8) !important;
}

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

td {
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
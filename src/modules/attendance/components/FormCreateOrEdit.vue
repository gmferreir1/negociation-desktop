<template>
  <div>
    <spinner style="position: fixed; top: 200px; left: 50%" v-if="loading_data" />

    <!-- general form elements -->
    <div class="box no-border" :class="{'opacity-form': loading_data}" style="margin-bottom: 5px;">
      <div class="box-header with-border">
        <h3 class="box-title">
          <i class="fa" :class="{'fa-list': !form.id, 'fa-edit': form.id}"></i>
          {{ title_form.toUpperCase() }}
        </h3>

        <router-link
          class="btn btm-sm btn-default"
          v-if="last_id_created && form.id !== last_id_created"
          style="position: absolute; right: 3px; top: 3px;"
          :to="{name: 'attendance_edit', params: {id: last_id_created } }"
        >
          <i class="fa fa-pencil"></i>
          Ultimo Registro
        </router-link>
      </div>
      <!-- /.box-header -->
      <!-- form start -->
      <div class="box-body">
        <!-- DADOS INICIAIS -->
        <div class="row">
          <div class="col-sm-8">
            <span style="font-weight: bold; text-transform: uppercase">Dados de Lançamento</span>
            <hr style="margin-top: 0px; border-top: 1px solid #cccccc" />
          </div>
        </div>

        <div class="row">
          <div class="col-sm-2 wd-150" style="width: 200px; padding-right: 0px;">
            <div class="form-group">
              <label>
                Contrato
                <small class="error">{{ validation.firstError('form.contract') }}</small>
              </label>
              <input
                type="text"
                class="form-control input-sm has-required"
                v-model="form.contract"
                @keypress.enter="getContractData"
                :disabled="form.id"
              />
            </div>
          </div>
          <div class="col-sm-2" style="width: 50px;">
            <button
              class="btn btn-default btn-sm"
              @click.prevent="$emit('openModalShowContracts', { data: '' })"
              style="margin-top: 20px;"
              :disabled="form.id"
            >
              <i class="fa fa-search"></i>
            </button>
          </div>
          <div class="col-sm-5 col-md-5">
            <div class="form-group">
              <label>Endereço</label>
              <input type="text" class="form-control input-sm" v-model="form.address" />
            </div>
          </div>
          <div class="col-sm-4 col-md-3">
            <div class="form-group">
              <label>Bairro</label>
              <input type="text" class="form-control input-sm" v-model="form.neighborhood" />
            </div>
          </div>
          <div class="col-sm-2 wd-150">
            <div class="form-group">
              <label>Inicio Contrato</label>
              <date-picker class="form-control input-sm" v-model="form.init_contract" />
            </div>
          </div>
          <div class="col-sm-2 wd-150">
            <div class="form-group">
              <label>Aluguel</label>
              <money class="form-control input-sm" v-model="form.value" />
            </div>
          </div>
          <div class="col-sm-2 wd-150">
            <div class="form-group">
              <label>Vencimento Aluguel</label>
              <input type="text" class="form-control input-sm" v-model="form.due_day" />
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label>Destinação</label>
              <input type="text" class="form-control input-sm" v-model="form.type_contract" />
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label>Ramo Atividade</label>
              <input type="text" class="form-control input-sm" v-model="form.type_activity" />
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label>Tipo Garantia</label>
              <input type="text" class="form-control input-sm" v-model="form.type_warranty" />
            </div>
          </div>
          <div class="col-sm-2 wd-150">
            <div class="form-group">
              <label>Garantia</label>
              <money class="form-control input-sm" v-model="form.value_warranty" />
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-4">
              <label>Inquilino</label>
              <input type="text" class="form-control input-sm" v-model="form.tenant_name" />
            </div>
          </div>
        </div>

        <div class="row" style="margin-top: 20px;">
          <div class="col-sm-8">
            <span style="font-weight: bold; text-transform: uppercase">Dados de Complementares</span>
            <hr style="margin-top: 0px; border-top: 1px solid #cccccc" />
          </div>
        </div>

        <div class="row">
          <div class="col-sm-5">
            <div class="form-group">
              <label>
                Responsável
                <small
                  class="error"
                >{{ validation.firstError('form.responsible_solicitation') }}</small>
              </label>
              <multi-select
                class="dropdown-toggle-required"
                id="responsible_solicitation"
                @values="values => form.responsible_solicitation = values"
                :selectData="select.users"
                :setData="{ data: form.responsible_solicitation }"
                :multiple="false"
              />
            </div>
          </div>

          <div class="col-sm-2 wd-150">
            <div class="form-group">
              <label>Data da Solicitação</label>
              <date-picker class="form-control input-sm" v-model="form.date_solicitation" />
            </div>
          </div>

          <div class="col-sm-2">
            <div class="form-group">
              <label>Situação Atendimento</label>
              <select class="form-control input-sm to-capitalize" v-model="form.situation">
                <option
                  :value="list.value"
                  v-for="(list, index) in select.situation"
                  :key="index"
                >{{ list.name }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row" v-if="!form.id">
          <div class="form-group">
            <div class="col-sm-6">
              <label>Observação</label>
              <textarea class="form-control" rows="5" v-model="form.observation"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="box-footer">
        <c-button
          classButton="btn btn-sm btn-success"
          :textButton="!form.id ? 'Salvar Dados' : 'Salvar Edição'"
          :classButtonIcon="!form.id ? 'fa fa-check' : 'fa fa-pencil'"
          :loading="loading"
          :disabled="loading"
          @click="submitForm"
        />
        <required />
      </div>
    </div>

    <!-- component historic -->
    <historic :dataAttendance="form" v-show="form.id" />
    <!-- / component historic -->
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import MultiSelect from "@/components/MultiSelect";
import CButton from "@/components/CButton";
import Required from "@/components/Required";
import DatePicker from "@/components/DatePicker";
import Historic from "./Historic";
import rulesValidator from "../mixins/validator";
import data from "../data";
import { toUpperCase } from "@/util/string";
import { dateFormat } from "@/util/dateTime";

export default {
  name: "FormCreateOrEdit",
  mixins: [rulesValidator],
  props: ["dataContractSelected"],
  components: { Spinner, MultiSelect, CButton, Required, DatePicker, Historic },
  data() {
    return {
      loading: false,
      loading_data: false,
      title_form: "",
      last_id_created: null,
      form: {},
      images: {
        search: require("@/assets/icons/search.png")
      },
      select: {
        users: [],
        situation: data.select.situation
      }
    };
  },
  methods: {
    toUpperCase,
    dateFormat,
    cleanForm() {
      this.form = {
        contract: "",
        init_contract: "",
        end_contract: "",
        address: "",
        neighborhood: "",
        value: 0,
        due_day: "",
        type_contract: "",
        type_activity: "",
        type_warranty: "",
        value_warranty: 0,
        tenant_name: "",
        responsible_solicitation: "",
        date_solicitation: moment().format("DD/MM/YYYY"),
        situation: "p",
        observation: ""
      };

      this.disabled_changes = false;

      this.validation.reset();
    },
    async getUsers() {
      return http
        .get("user/data-for-select")
        .then(result => {
          this.select.users = result.data;
          return result;
        })
        .catch(err => {})
        .finally(() => {});
    },
    checkRoute() {
      const route = this.$route;
      const id = route.params.id;

      if (route.name === "attendance_create") {
        this.title_form = "Novo Lançamento";
        this.setUserLogged();
        setTimeout(() => {
          this.loading_data = false;
        }, 300);
        return;
      }
      this.loading_data = true;
      this.title_form = "Edição de Lançamento";

      this.edit(id);
    },
    edit(id) {
      http
        .get(`attendance/${id}`)
        .then(result => {
          const data = result.data;
          data.init_contract = data.init_contract
            ? dateFormat(data.init_contract, "DD/MM/YYYY")
            : "";
          data.date_solicitation = data.date_solicitation
            ? dateFormat(data.date_solicitation, "DD/MM/YYYY")
            : "";
          this.form = toUpperCase(result.data, ["contract", "situation"]);
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading_data = false;
          }, 300);
        });
    },
    setUserLogged() {
      let localData = localStorage.getItem("dataLogin");
      localData = localData ? JSON.parse(localData) : null;
      this.form.responsible_solicitation = localData.id;
    },
    getContractData() {
      if (!this.form.contract) return;

      this.loading_data = true;

      const queryParams = {
        params: {
          contract: this.form.contract
        }
      };

      http
        .get("api-query/contract-data", queryParams)
        .then(result => {
          this.setContractData(result.data);
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading_data = false;
          }, 300);
        });
    },
    setContractData(contractData) {
      this.form.contract = contractData.contract_crm;
      this.form.init_contract = contractData.init_contract
        ? moment(contractData.init_contract).format("DD/MM/YYYY")
        : "";
      this.form.end_contract = contractData.end_contract
        ? moment(contractData.end_contract).format("DD/MM/YYYY")
        : "";
      this.form.value = contractData.value;
      this.form.address = contractData.immobileData.address.toUpperCase();
      this.form.neighborhood = contractData.immobileData.neighborhood.toUpperCase();
      this.form.due_day = contractData.due_day;
      this.form.type_contract = contractData.type_contract
        ? contractData.type_contract.toUpperCase()
        : null;
      this.form.type_activity = contractData.type_activity
        ? contractData.type_activity.toUpperCase()
        : null;
      this.form.type_warranty = contractData.type_warranty
        ? contractData.type_warranty.toUpperCase()
        : null;
      this.form.value_warranty = contractData.value_warranty
        ? contractData.value_warranty
        : 0;
      this.form.tenant_name = contractData.tenant_name.toUpperCase();
    },
    create() {
      this.loading = true;

      http
        .post("attendance", this.form)
        .then(result => {
          const responsible_solicitation = this.form.responsible_solicitation;
          _notification.success();
          this.cleanForm();
          this.form.responsible_solicitation = responsible_solicitation;
          this.last_id_created = result.data.id;
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
    },
    update() {}
  },
  watch: {
    "$route.name"() {
      this.checkRoute();
    },
    dataContractSelected() {
      const contractData = this.dataContractSelected.data;
      this.setContractData(contractData);
    }
  },
  async mounted() {
    this.loading_data = true;
    this.cleanForm();
    await this.getUsers();
    this.checkRoute();
  }
};
</script>
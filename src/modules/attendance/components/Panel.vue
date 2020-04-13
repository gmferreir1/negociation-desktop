<template>
  <div>
    <spinner style="position: absolute; top: 150px; left: 50%" v-if="loading_data" />
    <!-- general form elements -->
    <div class="box no-border" style="margin-bottom: 5px;" :class="{'opacity-form': loading_data}">
      <!-- form start -->
      <div class="box-body">
        <div class="row">
          <div class="col-sm-5">
            <div class="form-group">
              <label>Pesquisa de Dados</label>
              <input
                type="text"
                class="form-control input-sm"
                v-model="form.input"
                @keypress.enter="search"
                placeholder="Pesquisa por contrato ou nome"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2">
            <div class="form-group">
              <label>Situação</label>
              <multi-select
                id="situation"
                @values="values => form.situation = values"
                :selectData="select.situation"
                :setData="{ data: form.situation }"
                :multiple="true"
              />
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label>Tipo Solicitação</label>
              <multi-select
                id="type_solicitations"
                @values="values => form.type_solicitations = values"
                :selectData="select.type_solicitations"
                :setData="{ data: form.type_solicitations }"
                :multiple="true"
              />
            </div>
          </div>
          <div class="col-sm-3">
            <div class="form-group">
              <label>Responsável</label>
              <multi-select
                id="responsibles_solicitation"
                @values="values => form.responsibles_solicitation = values"
                :selectData="select.users"
                :setData="{ data: form.responsibles_solicitation }"
                :multiple="true"
              />
            </div>
          </div>
          <div class="col-sm-2" style="width: 120px;">
            <div class="form-group">
              <label>Inicio</label>
              <date-picker class="form-control input-sm" v-model="form.init_date" />
            </div>
          </div>
          <div class="col-sm-2" style="width: 120px;">
            <div class="form-group">
              <label>Final</label>
              <date-picker class="form-control input-sm" v-model="form.end_date" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <c-button
              classButton="btn btn-sm btn-primary"
              textButton="Pesquisar Dados"
              classButtonIcon="fa fa-search"
              :loading="loading"
              :disabled="loading"
              @click="search"
            />

            <router-link
              class="button btn btn-sm btn-success pull-left"
              style="position: absolute; left: 135px; top: 0px;"
              :to="{name: 'attendance_create'}"
            >
              <i class="fa fa-plus-circle"></i>
              Novo Lançamento
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import CButton from "@/components/CButton";
import MultiSelect from "@/components/MultiSelect";
import DatePicker from "@/components/DatePicker";
import data from "../data";

export default {
  name: "Panel",
  components: { Spinner, MultiSelect, CButton, DatePicker },
  data() {
    return {
      loading_data: false,
      loading: false,
      form: {},
      select: {
        situation: data.select.situation,
        type_solicitations: [
          { value: "delivery_immobile", name: "entrega imóvel" },
          { value: "negotiation", name: "negociação aluguel" },
          { value: "other", name: "outros" }
        ],
        users: []
      }
    };
  },
  methods: {
    cleanForm() {
      this.form = {
        input: "",
        situation: [],
        type_solicitations: [],
        responsibles_solicitation: [],
        init_date: "",
        end_date: ""
      };
    },
    async getUsers() {
      return http
        .get("user/data-for-select")
        .then(result => {
          this.select.users = result.data;
        })
        .catch(err => {})
        .finally(() => {});
    },
    setDefaultFilter() {
      this.form = {
        input: ""
      };
    },
    search() {
      this.$emit("search", this.form);
    }
  },
  async mounted() {
    this.loading_data = true;

    await this.getUsers();

    this.setDefaultFilter();

    setTimeout(() => {
      this.loading_data = false;
    }, 300);

    //this.search();
  }
};
</script>
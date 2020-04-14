<template>
  <div>
    <spinner style="position: fixed; top: 200px; left: 50%" v-if="loading_data" />

    <!-- panel component -->
    <panel @search="search" :class="{'opacity-form': loading_data}" />
    <!-- / panel component-->

    <!-- /.row -->
    <div class="row" :class="{'opacity-form': loading_data}">
      <div class="col-xs-12">
        <div class="box box-none">
          <div class="box-header" style="padding-bottom: 5px;">
            <h3 class="box-title">
              <i class="fa fa-phone-square"></i>
              ATENDIMENTOS NO SISTEMA ({{ data_list.total }})
            </h3>

            <!--
            <div>
              <span v-if="value_total">
                Valor total:
                <span
                  style="font-weight: bold; color: red"
                >R$ {{ moneyFormat(value_total) }}</span>
              </span>
            </div>
            -->
          </div>
          <!-- /.box-header -->

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
                <th class="text-left">
                  <a
                    href="#"
                    @click.prevent="sort('contract', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'contract' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'contract'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Contrato
                  </a>
                </th>
                <th class="text-left">Inquilino</th>
                <th class="text-right">Valor</th>
                <th class="text-center">Dia Vencimento</th>
                <th class="text-left">Destinação</th>
                <th class="text-left">Ramo Atividade</th>
                <th class="text-left">Forma Garantia</th>
                <th class="text-right">Valor Garantia</th>
                <th class="text-left">Responsável</th>

                <th class="text-center">-</th>
              </tr>
              <tr v-for="(list, index) in data_list.data" :key="index">
                <td class="text-left">{{ list.contract }}</td>
                <td class="text-left">{{ list.tenant_name }}</td>
                <td class="text-right">{{ moneyFormat(list.value) }}</td>
                <td class="text-center">{{ list.due_day }}</td>
                <td class="text-left">{{ !list.type_contract ? " - " : list.type_contract }}</td>
                <td class="text-left">{{!list.type_activity ? " - " : list.type_activity }}</td>
                <td class="text-left">{{!list.type_warranty ? " - " : list.type_warranty }}</td>
                <td
                  class="text-right"
                >{{!list.value_warranty ? " - " : moneyFormat(list.value_warranty) }}</td>
                <td class="text-left">{{ list.responsibleData ? list.responsibleData.name : " - " }}</td>
                <td class="text-center">
                  <router-link
                    v-if="list.id"
                    class="btn btn-sm btn-default"
                    :to="{name: 'attendance_edit', params: {id: list.id } }"
                  >
                    <i class="fa fa-pencil"></i>
                  </router-link>
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
        <!-- /.box -->
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "../components/Panel";
import CButton from "@/components/CButton";
import NotFound from "@/components/NotFound";
import Spinner from "@/components/Spinner";
import sort from "@/mixins/sort";
import { dateFormat } from "@/util/dateTime";
import { moneyFormat } from "@/util/string";

export default {
  name: "TableListAttendances",
  components: { Panel, CButton, NotFound, Spinner },
  mixins: [sort],
  data() {
    return {
      loading_data: false,
      loading: false,
      form: {},
      data_list: {
        data: [1, 2],
        lastPage: 0,
        page: 0,
        total: 0
      },
      value_total: 0,
      filter: {},
      pagination: {}
    };
  },
  methods: {
    dateFormat,
    moneyFormat,
    getData() {
      const queryParams = {
        params: {
          filter: this.filter,
          paginate: localStorage.getItem("paginate"),
          sort: localStorage.getItem("sort")
        }
      };

      http
        .get("attendance", queryParams)
        .then(result => {
          this.data_list = result.data.list;
          //this.value_total = result.data.value_total;
          this.sort("contract", "asc");
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
    },
    paginate(page = 1) {
      let paginate = {
        page,
        per_page: 100
      };

      localStorage.setItem(
        "paginate",
        JSON.stringify({ page: paginate.page, per_page: paginate.per_page })
      );

      this.getData();
    },
    search(filter) {
      this.loading = true;
      this.filter = filter;
      this.paginate();
    }
  }
};
</script>

<style scoped>
.pagination {
  margin-top: 5px !important;
}

td {
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pending {
  color: red;
}

.resolved {
  color: green;
}
</style>
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
                <th class="text-center">
                  <a href="#" @click.prevent="sort('id', toggle_sort === 'asc' ? 'desc' : 'asc' )">
                    <span v-if="data_sort.sort_by === 'id' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'id'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    #
                  </a>
                </th>

                <th>contrato</th>
                <th>Solictante</th>
                <th>Tipo Solicitação</th>
                <th>Atendimento</th>
                <th>Situação</th>
                <th>Responsável</th>

                <th class="text-center">-</th>
              </tr>
              <tr v-for="(list, index) in data_list.data" :key="index">
                <td class="text-center">{{ list.id }}</td>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-left"></td>
                <td class="text-center">
                  <router-link class="btn btn-sm btn-default" :to="{name: '', params: {id: 1 } }">
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
        .get("reserve", queryParams)
        .then(result => {
          this.data_list = result.data.list;
          this.value_total = result.data.value_total;
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
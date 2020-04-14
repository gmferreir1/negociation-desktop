<template>
  <div>
    <!-- general form elements -->
    <div class="box no-border">
      <div class="box-header with-border">
        <h3 class="box-title">
          <i class="fa fa-comment"></i>
          OBSERVAÇÃO DO LANÇAMENTO
        </h3>
      </div>
      <!-- /.box-header -->
      <!-- form start -->
      <div class="box-body">
        <div class="row">
          <div class="col-sm-10">
            <label>Informe aqui a observação</label>
            <textarea class="form-control" rows="3" v-model="historic"></textarea>
          </div>
        </div>
        <div class="row" style="margin-top: 5px;">
          <div class="col-sm-12">
            <c-button
              classButton="btn btn-sm btn-default"
              textButton="Salvar Dados"
              classButtonIcon="fa fa-check"
              :loading="loading"
              :disabled="loading"
              @click="created"
            />
          </div>
        </div>

        <div class="row" style="padding-bottom: 10px;" v-if="loading_data">
          <div class="col-ms-6 col-sm-offset-5">
            <spinner />
          </div>
        </div>

        <!-- not found component -->
        <div class="row" v-if="!data_list.data.length && !loading_data">
          <div class="col-ms-6 col-sm-offset-5">
            <not-found />
          </div>
        </div>
        <!-- / not found component -->

        <div class="row" style="margin-top: 5px;" v-if="!loading_data && data_list.data.length">
          <div class="col-sm-12">
            <table class="table table-condensed">
              <tbody>
                <tr>
                  <th class="text-left">Observação</th>
                  <th class="text-center" style="width: 200px;">Data/Hora</th>
                  <th class="text-left" style="width: 200px">Responsável</th>
                </tr>
                <tr v-for="(list, index) in data_list.data" :key="index">
                  <td class="text-left">{{ list.historic }}</td>
                  <td
                    class="text-center"
                    style="width: 200px"
                  >{{ dateFormat(list.created_at, "DD/MM/YYYY HH:mm") }}</td>
                  <td class="text-left" style="width: 200px;">
                    <span
                      class="to-capitalize"
                    >{{ list.responsibleHistoric ? list.responsibleHistoric.name : " - " }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <paginate
            v-show="data_list.data.length && !loading_data"
            v-model="data_list.page"
            :page-count="data_list.lastPage"
            :click-handler="paginate"
            :prev-text="'Anterior'"
            :next-text="'Proxima'"
            :container-class="'pagination'"
          ></paginate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CButton from "@/components/CButton";
import Spinner from "@/components/Spinner";
import NotFound from "@/components/NotFound";
import { dateFormat } from "@/util/dateTime";

export default {
  name: "Historic",
  props: ["dataAttendance"],
  components: { CButton, Spinner, NotFound },
  data() {
    return {
      loading: false,
      loading_data: false,
      historic: "",
      data_list: {
        data: [],
        lastPage: 0,
        page: 0,
        total: 0
      },
      pagination: {
        page: 1,
        per_page: 20
      }
    };
  },
  methods: {
    dateFormat,
    created() {
      this.loading = true;
      http
        .post("attendance/historic", {
          historic: this.historic,
          attendance_id: this.dataAttendance.id
        })
        .then(result => {
          this.historic = "";
          _notification.success();
          this.getData();
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
    },
    getData() {
      const queryParams = {
        params: {
          attendance_id: this.dataAttendance.id,
          paginate: this.pagination
        }
      };

      http
        .get("attendance/historic", queryParams)
        .then(result => {
          this.data_list = result.data;
        })
        .catch(() => {})
        .finally(() => {
          setTimeout(() => {
            this.loading_data = false;
          }, 300);
        });
    },
    paginate(page = 1) {
      this.pagination.page = page;

      this.getData();
    }
  },
  watch: {
    dataAttendance() {
      if (this.dataAttendance.id) {
        this.loading_data = true;
        this.getData();
      }
    }
  }
};
</script>
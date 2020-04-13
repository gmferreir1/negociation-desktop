<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-aqua">
            <i class="fa fa-phone"></i>
          </span>

          <div class="info-box-content">
            <router-link :to="{name: ''}" style="color: inherit">
              <span class="info-box-text">Solicitações Via Sistema</span>
              <span class="info-box-number">{{ total.attendance }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="info-box">
          <span class="info-box-icon bg-black">
            <i class="fa fa-file"></i>
          </span>

          <div class="info-box-content">
            <router-link :to="{name: ''}" style="color: inherit">
              <span class="info-box-text">Solicitações Cadastradas</span>
              <span class="info-box-number">{{ total.delivery_notification }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WidgetsIcons",
  data() {
    return {
      total: {
        attendance: 0,
        delivery_notification: 0,
        contract_distribution: 0
      }
    };
  },
  methods: {
    getTotal() {
      http
        .get("dashboard/total-for-panel")
        .then(result => {
          this.total = result.data;
        })
        .catch(err => {})
        .finally(() => {});
    }
  },
  mounted() {
    //this.getTotal();
  }
};
</script>
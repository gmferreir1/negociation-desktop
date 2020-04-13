import Vue from "vue";
window.$ = window.jQuery = require("jquery");
require("../node_modules/bootstrap/dist/js/bootstrap.min");
require("./assets/js/adminlte");

require("./assets/js/jquery-ui.min.js");

/** moment */
window.moment = require("moment");

/** Validação de formulários */
const SimpleVueValidation = require("simple-vue-validator");
window.Validator = SimpleVueValidation.Validator;
Vue.use(SimpleVueValidation);

/** Pagination */
const Paginate = require("vuejs-paginate");
Vue.component("paginate", Paginate);

/** Numeral */
window.numeral = require("numeral");
window.numeral.register("locale", "pt-br", {
  delimiters: {
    thousands: ".",
    decimal: ","
  },
  currency: {
    symbol: "R$"
  }
});
numeral.locale("pt-br");

/** Notification toastr */
window._notification = require("@/util/notification");

/** collect.js */
window.collect = require("collect.js");

/** Vue the mask */
import VueTheMask from "vue-the-mask";
Vue.use(VueTheMask);

/** Bootstrap multiselect */
require("../node_modules/bootstrap-select/dist/js/bootstrap-select");

/** lodash */
window._ = require("lodash");


/*** Highcharts */
window.Highcharts = require("highcharts");
require("highcharts/modules/exporting")(Highcharts);

/** v-money */
import money from "v-money";
Vue.use(money, {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  precision: 2,
  masked: false
});

require("../node_modules/@voerro/vue-tagsinput/dist/style.css")



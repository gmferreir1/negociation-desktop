<template>
  <div>
    <form-create-or-edit
      @openModalShowContracts="data => data_modal_show_contracts = data"
      :dataContractSelected="data_contract_selected"
    />

    <!-- modal show contracts -->
    <modal-show-contracts
      @contractSelected="data => data_contract_selected = data"
      :dataModal="data_modal_show_contracts"
    />
    <!-- / modal show contracts -->
  </div>
</template>

<script>
import ModalShowContracts from "@/modules/queryComponents/ModalShowContracts";
import FormCreateOrEdit from "../components/FormCreateOrEdit";

export default {
  name: "CreateOrEdit",
  components: { FormCreateOrEdit, ModalShowContracts },
  data() {
    return {
      data_modal_show_contracts: {},
      data_contract_selected: {}
    };
  }
};
</script>
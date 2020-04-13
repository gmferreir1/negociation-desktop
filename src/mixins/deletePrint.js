export default {
  methods: {
    deletePrint(fileAndPath, showMessageConfirm = false) {
      if (!fileAndPath) return;

      const queryParams = {
        params: {
          file_and_path: fileAndPath
        }
      };

      if (!showMessageConfirm) {
        setTimeout(() => {
          this.deleteFilePrint(queryParams);
        }, 15000);
        return;
      }

      swal({
        text: "Sua impressão foi feita corretamente ?",
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          cancel: {
            text: "Não",
            value: false,
            visible: true,
            className: "",
            closeModal: true
          },
          confirm: {
            text: "Sim",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      }).then(() => {
        this.deleteFilePrint(queryParams);
      });
    },
    /**
     * Chama a remoção do arquivo
     * @param {*} queryParams
     */
    deleteFilePrint(queryParams) {
      http
        .get("delete-file", queryParams)
        .then(_ => {})
        .catch(_ => {});
    }
  }
};

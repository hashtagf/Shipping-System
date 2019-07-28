<template>
  <div class="Login row justify-content-center"></div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      showData: []
    };
  },
  components: {
    CustomerName
  },
  methods: {
    login() {
      this.$vs.loading({
        type: "sound"
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(response => {
          this.$vs.loading.close();
        })
        .catch(error => {
          this.$swal({
            type: "danger",
            title: "เกิดข้อผิดพลาด",
            text: error
          });
        });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
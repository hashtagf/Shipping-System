<template>
  <div class="Login row justify-content-center">
    <div class="col-12 mt-5">
      <b-jumbotron header="Login" lead="Express Shipping" style="height: 50vh">
        <div class="row justify-content-center">
          <div class="col-8 col-md-6">
            <b-form-group id="rateTHBcost" label="Email" label-for="rateTHBcost">
              <b-form-input v-model="email" type="text" required placeholder="Email "></b-form-input>
            </b-form-group>
            <b-form-group id="rateTHBcost" label="Password" label-for="rateTHBcost">
              <b-form-input v-model="password" type="password" required placeholder="Password"></b-form-input>
            </b-form-group>
            <b-button variant="primary" @click="login()">Login</b-button>
          </div>
        </div>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      showData: []
    };
  },
  components: {},
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
          this.$swal({
            type: "success",
            title: "ยินดีต้อนรับ",
            text: "เข้าสู่ระบบ"
          });
          this.$router.push("/Main");
          this.$session.set("isLogin", true);
        })
        .catch(error => {
          this.$swal({
            type: "error",
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
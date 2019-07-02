<template>
  <div class="Shipping justify-content-center row"></div>
</template>

<script>
import firebase from "firebase";
import CustomerName from "../getdatabase/CustomerName.vue";
var billingFirestore = firebase.firestore().collection("Billings");
export default {
  name: "Shipping",
  data() {
    return {
      billing: []
    };
  },
  components: {
    CustomerName
  },
  methods: {},
  mounted() {
    this.$vs.loading({
      type: "sound"
    });
    billingFirestore
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.showData = doc.data();
        console.log(this.showData);
        this.$vs.loading.close();
      });
  }
};
</script>

<style lang="scss" scoped>
</style>
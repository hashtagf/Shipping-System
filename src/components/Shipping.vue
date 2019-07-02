<template>
<b-container class="Shipping">
  <!-- //<div class="Shipping justify-content-center row"> -->
     <b-row>
      <b-col cols="12">
        <h3>จัดส่งสินค้า</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-left">
        <h4>รายละเอียดการจัดส่ง</h4>
      </b-col>
    </b-row>




  <!-- </div> -->
</b-container>
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
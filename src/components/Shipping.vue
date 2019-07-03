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
    <b-row>
      <b-col cols="4">
        <b-form-group id="capacity" label="ปริมาตร" label-for="capacity">
          <b-form-input id="capacity"  type="number" required placeholder="ปริมาตร"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group id="Allweight" label="น้ำหนักรวม" label-for="Allweight">
          <b-form-input id="Allweight"  type="number" required placeholder="น้ำหนักรวม"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <br />
      </b-col>
      <!-- <b-col cols="12">
        <b-form-group id="address" label="ที่อยู่" label-for="address">
          <b-form-textarea id="address" v-model="ฟ" type="text" required placeholder="ที่อยู่"></b-form-textarea>
        </b-form-group>
      </b-col> -->
    </b-row>

    <!-- </div> -->
  </b-container>
</template>

<script>
import firebase from "firebase";
import CustomerName from "../getdatabase/CustomerName.vue";
var billingFirestore = firebase.firestore().collection("Billings");
var customerFirestore = firebase.firestore().collection("Customers");
export default {
  name: "Shipping",
  data() {
    return {
      test: "sss",
      billing: [],
      customer: null,
      optionCustomer: []
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
    customerFirestore.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.optionCustomer.push({
          text: doc.data().nickname,
          value: doc.id,
          data: doc.data()
        });
      });
      console.log(this.optionCustomer);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
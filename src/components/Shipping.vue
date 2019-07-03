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
      <b-col cols="2">
        <b-form-group id="amount" label="จำนวนกล่อง" label-for="amount">
          <b-form-input id="amount"  type="number" required placeholder="จำนวนกล่อง"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="2">
        <b-form-group id="" label="น้ำหนัก/กล่อง" label-for="" >
        <b-form-input id="hi"  type="number" required placeholder="น้ำหนักกล่องที่ 1">{{test}}</b-form-input>
        <b-form-input id=""  type="number" required placeholder="น้ำหนักกล่องที่ 2"></b-form-input>
        <b-form-input id=""  type="number" required placeholder="น้ำหนักกล่องที่ 3"></b-form-input>
        <b-form-input id=""  type="number" required placeholder="น้ำหนักกล่องที่ 4"></b-form-input>
        <b-form-input id=""  type="number" required placeholder="น้ำหนักกล่องที่ 5"></b-form-input>
        
        </b-form-group>
      </b-col>

      <b-col cols="10">
        <b-form-group id="aaa" label="AAA" label-for="address">
          <b-form-input id=""  type="text" required placeholder=""></b-form-input> 
        </b-form-group>
      </b-col>
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
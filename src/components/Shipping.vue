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
          <b-form-input 
            id="capacity"  
            type="number" 
            v-model="capacity"
            required placeholder="ปริมาตร">
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group id="Allweight" label="น้ำหนักรวม" label-for="Allweight">
          <b-form-input 
            id="Allweight"  
            type="number" 
            v-model="Allweight"
            required placeholder="น้ำหนักรวม">
        </b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="2">
        <b-form-group id="amount" label="จำนวนกล่อง" label-for="amount" >
          <b-form-input 
            id="amount" 
            v-model="amount" 
            type="number" 
            required placeholder="จำนวนกล่อง" 
            @change="createArray(amount)">
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="2">
        <b-form-group id="box" label="น้ำหนัก/กล่อง"  label-for="box" >
        <a v-for="(val) in boxes" :key="val.id">
        <b-form-input 
          id="box"  
          v-model="val.value" 
          type="number" 
          required placeholder="น้ำหนัก">
        </b-form-input><br>
        </a>       
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-button type="submit" variant="primary">ส่งสินค้า</b-button>
      </b-col>
      <b-col cols="6">
        <b-button type="reset" variant="danger">ยกเลิก</b-button>
      </b-col>

      <!-- <b-col cols="10">
        <b-form-group id="aaa" label="AAA" label-for="address">
          <b-form-input id="" v-model="aaa" type="text" required placeholder=""></b-form-input> 
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
      boxes: [],
      billing: [],
      customer: null,
      optionCustomer: []
    };
  },
  components: {
    CustomerName
  },
  methods: {
    onSubmit() {
      console.log("hello submit");
      billingFirestore.doc(this.$route.params.id).set({
        capacity: "a",
        Allweight: "b",
        amount: "c",
        box: "d"
      }).then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

      event.target.reset();
    },
    createArray(amount,boxes){
      this.boxes=[];
      console.log(amount);
      for (let index = 0; index < amount; index++) {
       console.log(index+1);
       this.boxes[index] = "";
      }
      console.log(this.boxes);
    }
  },
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
      console.log(this.$route.params.id);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
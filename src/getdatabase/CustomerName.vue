<template>
  <div class="CustomerName">
    <span v-if="name">{{showData.nickname}}</span>
    <span v-if="address">{{showData.address}}</span>
    <span v-if="fullname">{{showData.fullname}}</span>
    <span v-if="tel">{{showData.tel}}</span>
  </div>
</template>

<script>
import firebase from "firebase";
var customerFirestore = firebase.firestore().collection("Customers");
export default {
  name: "CustomerName",
  props: {
    idCustomer: String,
    name: false,
    address: false,
    fullname: false,
    tel: false
  },
  data() {
    return {
      showData: "Loading"
    };
  },
  mounted() {
    customerFirestore
      .doc(this.idCustomer)
      .get()
      .then(doc => {
        this.showData = doc.data();
      });
  }
};
</script>

<style lang="scss" scoped>
</style>
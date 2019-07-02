<template>
  <div class="CustomerName">{{showData.nickname}}</div>
</template>

<script>
import firebase from "firebase";
var customerFirestore = firebase.firestore().collection("Customers");
export default {
  name: "CustomerName",
  props: {
    idCustomer: String
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
        console.log(this.showData);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>
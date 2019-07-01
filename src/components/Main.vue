<template>
  <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">รายการ</th>
            <th scope="col">วันที่</th>
            <th scope="col">ลูกค้า</th>
            <th scope="col">รายการสินค้า</th>
            <th scope="col">คุณสมบัติ</th>
            <th scope="col">ราคาขาย</th>
            <th scope="col">ราคาต้นทุน</th>
            <th scope="col">รวม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val) in billing" :key="val.id">
            <td>{{val.data}}</td>
    
          </tr>
        </tbody>
      </table>

  </div>
  
</template>

<script>
import firebase from "firebase";
var billingFirestore = firebase.firestore().collection("Billings");
export default {
  name: "Billing",
  data() {
    return {
      billing: [],
 
    };
  },
  mounted() {
    billingFirestore.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.billing.push({
          id: doc.id,
          data: doc.data()
        });
      });
      console.log(this.billing);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
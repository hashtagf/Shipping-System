<template>
  <div class="Main justify-content-center row">
    <table class="table col-10 border table-hover table-bordered">
      <thead class="thead-light">
        <tr>
          <th scope="col">รายการ</th>
          <th scope="col">วันที่</th>
          <th scope="col">ลูกค้า</th>
          <th scope="col">รายการสินค้า</th>
          <th scope="col">คุณสมบัติ</th>
          <th scope="col">จำนวน</th>
          <th scope="col">ราคาขาย</th>
          <th scope="col">ราคาต้นทุน</th>
          <th scope="col">รวมราคาขาย</th>
          <th scope="col">รวมราคาต้นทุน</th>
          <th scope="col">จัดการบิล</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(val, index) in billing" :key="val.id">
          <th scope="row">{{index+1}}</th>
          <td>{{val.data.timestamp | moment("DD/MM/Y")}}</td>
          <td>{{val.data.customer}}</td>
          <td>
            <div
              class="border-bottom"
              v-for="(product,index) in val.data.billing"
              :key="index"
            >{{product.product.name}}</div>
          </td>
          <td>
            <div
              class="border-bottom"
              v-for="(product,index)  in val.data.billing"
              :key="index"
            >{{product.properties}}</div>
            <b class="text-primary">{{"รวม"}}</b>
          </td>
          <td>
            <div
              class="border-bottom"
              v-for="(product,index)  in val.data.billing"
              :key="index"
            >{{product.count}}</div>
            <b class="text-primary">{{val.data.total.count}}</b>
          </td>
          <td>
            <div
              class="border-bottom"
              v-for="(product,index)  in val.data.billing"
              :key="index"
            >{{product.product.price}}</div>
          </td>
          <td>
            <div
              class="border-bottom"
              v-for="(product,index)  in val.data.billing"
              :key="index"
            >{{product.product.cost}}</div>
          </td>
          <th>
            <div
              class="border-bottom"
              v-for="(product,index) in val.data.billing"
              :key="index"
            >{{product.product.price* product.count}}</div>
            <b class="text-primary">{{val.data.total.price}}</b>
          </th>
          <th>
            <div
              class="border-bottom"
              v-for="(product,index) in val.data.billing"
              :key="index"
            >{{product.product.cost* product.count}}</div>
            <b class="text-primary">{{val.data.total.cost}}</b>
          </th>
          <td>
            <b-button type="submit" size="sm" variant="primary" class="my-auto">จัดการค่าขนส่ง</b-button>
          </td>
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
      billing: []
    };
  },
  mounted() {
    billingFirestore.orderBy("timestamp", "desc").onSnapshot(querySnapshot => {
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
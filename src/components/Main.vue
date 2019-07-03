<template>
  <div class="Main justify-content-center row">
    <div class="col-7 text-left my-3">
      <h3>บิลลูกค้า</h3>
    </div>
    <div class="col-3 justify-content my-3">
      <router-link to="/Billing">
        <vs-button color="primary" type="filled" icon="add_circle">เปิดบิล</vs-button>
      </router-link>
    </div>
    <table class="table col-10 border table-hover table-bordered">
      <thead class="thead-light">
        <tr>
          <th scope="col">รายการ</th>
          <th scope="col">วันที่</th>
          <th scope="col">ลูกค้า</th>
          <th scope="col">รายการสินค้า</th>
          <th scope="col">คุณสมบัติ</th>
          <th scope="col">จำนวน</th>
          <th scope="col">ราคา</th>
          <th scope="col">รวมราคา</th>
          <th scope="col">รวมราคา (THB)</th>
          <th scope="col">จัดการบิล</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(val, index) in billing" :key="val.id">
          <th scope="row">{{index + 1}}</th>
          <td>{{val.data.timestamp | moment("DD/MM/Y")}}</td>
          <td>
            <customer-name :idCustomer="val.data.customer.id" />
          </td>
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
              v-for="(product,index) in val.data.billing"
              :key="index"
            >{{product.product.price * product.count}}</div>
            <b
              class="text-primary"
            >{{new Intl.NumberFormat({ style: 'currency'}).format(val.data.total.price)}}</b>
          </td>
          <td>
            <b
              class="text-success"
            >{{new Intl.NumberFormat({ style: 'currency'}).format(val.data.total.price * val.data.rateTHBprice)}}</b>
          </td>
          <td>
            <b-button
              type="submit"
              size="sm"
              variant="primary"
              class="my-auto"
              :to="'/Shipping/' + val.id"
            >จัดการค่าขนส่ง</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "firebase";
import CustomerName from "../getdatabase/CustomerName.vue";
var billingFirestore = firebase.firestore().collection("Billings");
export default {
  name: "Billing",
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

    billingFirestore.orderBy("timestamp", "desc").onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.billing.push({
          id: doc.id,
          data: doc.data()
        });
      });
      this.$vs.loading.close();
    });
    console.log(this.billing);
  }
};
</script>

<style lang="scss" scoped>
</style>
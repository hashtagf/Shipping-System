<template>
  <div class="ShippingData row justify-content-center">
    <h4>ตารางค่าขนส่งของลูกค้า</h4>
    <div class="col-10 table-responsive">
      <table class="table border table-hover table-bordered">
        <thead class="thead-light">
          <th scope="col">#</th>
          <th scope="col">รายการ</th>
          <th scope="col">ต่ำกว่า 100 KG</th>
          <th scope="col">มากกว่า 100 KG</th>
          <th scope="col">ต่ำกว่า 1 CBM</th>
          <th scope="col">มากกว่า 1 CBM</th>
        </thead>
        <tbody>
          <tr>
            <td colspan="6">ขนส่งทางรถ 5 - 7 วัน</td>
          </tr>
          <tr v-for="(val ,index) in showData" :key="index">
            <td>{{index + 1}}</td>
            <td>{{val.data.name}}</td>
            <td>{{val.data.car[0]}}</td>
            <td>{{val.data.car[1]}}</td>
            <td>{{val.data.car[2]}}</td>
            <td>{{val.data.car[3]}}</td>
          </tr>

          <tr>
            <td colspan="6">ขนส่งทางเรือ 25-35 วัน</td>
          </tr>
          <tr v-for="(val ,index) in showData" :key="index + 10">
            <td>{{index + 1}}</td>
            <td>{{val.data.name}}</td>
            <td>{{val.data.ship[0]}}</td>
            <td>{{val.data.ship[1]}}</td>
            <td>{{val.data.ship[2]}}</td>
            <td>{{val.data.ship[3]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 class>ตารางค่าขนส่งของต้นทุน</h4>
    <div class="col-10 table-responsive">
      <table class="table border table-hover table-bordered">
        <thead class="thead-light">
          <th scope="col">#</th>
          <th scope="col">รายการ</th>
          <th scope="col">ต่ำกว่า 100 KG</th>
          <th scope="col">มากกว่า 100 KG</th>
          <th scope="col">ต่ำกว่า 1 CBM</th>
          <th scope="col">มากกว่า 1 CBM</th>
        </thead>

        <tbody>
          <tr>
            <td colspan="6">ขนส่งทางรถ 5 - 7 วัน</td>
          </tr>
          <tr v-for="(val ,index) in showData" :key="index">
            <td>{{index + 1}}</td>
            <td>{{val.data.name}}</td>
            <td>{{val.data.costcar[0]}}</td>
            <td>{{val.data.costcar[1]}}</td>
            <td>{{val.data.costcar[2]}}</td>
            <td>{{val.data.costcar[3]}}</td>
          </tr>

          <tr>
            <td colspan="6">ขนส่งทางเรือ 25-35 วัน</td>
          </tr>
          <tr v-for="(val ,index) in showData" :key="index + 10">
            <td>{{index + 1}}</td>
            <td>{{val.data.name}}</td>
            <td>{{val.data.costship[0]}}</td>
            <td>{{val.data.costship[1]}}</td>
            <td>{{val.data.costship[2]}}</td>
            <td>{{val.data.costship[3]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import CustomerName from "../getdatabase/CustomerName.vue";
var shippingDataFirestore = firebase.firestore().collection("ShippingData");
export default {
  name: "Shipping",
  data() {
    return {
      showData: []
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
    shippingDataFirestore.orderBy("priority").onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.showData.push({
          id: doc.id,
          data: doc.data()
        });
      });
      this.$vs.loading.close();
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
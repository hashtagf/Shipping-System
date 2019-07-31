<template>
  <div class="Main justify-content-center row" v-if="checkData">
    <div class="col-10 table-responsive">
      <div class="Main justify-content-center row">
        <div class="col-7 text-center my-3">
          <h3>สรุปผลกำไรวันนี้</h3>
        </div>
        <div class="col-10 table-responsive">
          <table class="table border table-hover table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col">ชนิด</th>
                <th scope="col">ยอดขาย</th>
                <th scope="col">ต้นทุน</th>
                <th scope="col">กำไร</th>
              </tr>
            </thead>
            <tbody class="thead-light">
              <tr>
                <td class="h5">จากสินค้า</td>
                <td class="h5">{{new Intl.NumberFormat({ style: 'currency'}).format(nowTotal)}}</td>
                <td class="h5 text-success">
                  <b>{{new Intl.NumberFormat({ style: 'currency'}).format(nowCost)}}</b>
                </td>
                <td class="h5 text-info">
                  <b>{{new Intl.NumberFormat({ style: 'currency'}).format(nowTotal-nowCost)}}</b>
                </td>
              </tr>
              <!-- <tr>
                <td class="h5">จากค่าขนส่ง</td>
                <td class="h5">{{new Intl.NumberFormat({ style: 'currency'}).format(nowShipping)}}</td>
                <td class="h5 text-success">
                  <b>{{new Intl.NumberFormat({ style: 'currency'}).format(nowShippingCost)}}</b>
                </td>
                <td class="h5 text-info">
                  <b>{{new Intl.NumberFormat({ style: 'currency'}).format(nowShipping-nowShippingCost)}}</b>
                </td>
              </tr>-->
            </tbody>
          </table>
        </div>
      </div>
      <div class="Main justify-content-center row">
        <div class="col-7 text-center my-3">
          <h3>สรุปผลกำไรค่าสินค้าแต่ละเดือน</h3>
        </div>
        <div class="col-10 table-responsive">
          <table class="table border table-hover table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col">เดือนปี</th>
                <th scope="col">รวมยอดขาย</th>
                <th scope="col">รวมต้นทุน</th>
                <th scope="col">กำไร</th>
              </tr>
            </thead>
            <tbody class="thead-light">
              <tr class v-for="(val, key) in total" :key="key">
                <td>{{key}}</td>
                <td>{{new Intl.NumberFormat({ style: 'currency'}).format(total[key])}}</td>
                <td>{{new Intl.NumberFormat({ style: 'currency'}).format(totalcost[key])}}</td>
                <td>{{new Intl.NumberFormat({ style: 'currency'}).format(total[key] - totalcost[key])}}</td>
              </tr>
              <tr>
                <td class="h5">รวม</td>
                <td class="h5">{{new Intl.NumberFormat({ style: 'currency'}).format(All)}}</td>
                <td class="h5">{{new Intl.NumberFormat({ style: 'currency'}).format(AllCost)}}</td>
                <td
                  class="h5 text-success"
                >{{new Intl.NumberFormat({ style: 'currency'}).format(All - AllCost)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="Main justify-content-center row mb-5">
        <div class="col-7 text-center my-3">
          <h3>สรุปผลกำไรจากค่าขนส่งแต่ละเดือน</h3>
        </div>
        <div class="col-10 table-responsive">
          <table class="table border table-hover table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col">เดือนปี</th>
                <th scope="col">รวมค่าขนส่ง</th>
                <th scope="col">รวมต้นทุนค่าขนส่ง</th>
                <th scope="col">กำไร</th>
              </tr>
            </thead>
            <tbody class="thead-light">
              <tr class v-for="(val, key) in reportShipping" :key="key">
                <td>{{key}}</td>
                <td>{{new Intl.NumberFormat({ style: 'currency'}).format(reportShipping[key])}}</td>
                <td
                  class
                >{{new Intl.NumberFormat({ style: 'currency'}).format(reportShippingCost[key])}}</td>
                <td
                  class
                >{{new Intl.NumberFormat({ style: 'currency'}).format(reportShippingProfit[key])}}</td>
              </tr>
              <tr>
                <td class="h5">รวม</td>
                <td class="h5">{{new Intl.NumberFormat({ style: 'currency'}).format(shippingAll)}}</td>
                <td class="h5">{{new Intl.NumberFormat({ style: 'currency'}).format(shippingCost)}}</td>
                <td
                  class="h5 text-success"
                >{{new Intl.NumberFormat({ style: 'currency'}).format(shippingAll - shippingCost)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { FireSQL } from "firesql";
import "firesql/rx";
const fireSQL = new FireSQL(firebase.firestore());
import CustomerName from "../getdatabase/CustomerName.vue";
var billingFirestore = firebase.firestore().collection("Billings");
var shippingFirestore = firebase.firestore().collection("Shippings");
import momentjs from "moment";
export default {
  name: "Billing",
  data() {
    return {
      profit: {},
      total: {},
      totalcost: {},
      reportShipping: {},
      reportShippingCost: {},
      reportShippingProfit: {},
      checkData: false,
      nowTotal: 0,
      nowCost: 0,
      nowShipping: 0,
      nowShippingCost: 0,
      All: 0,
      AllCost: 0,
      shippingAll: 0,
      shippingCost: 0
    };
  },
  components: {
    CustomerName
  },
  methods: {},
  mounted() {
    this.isLogin = this.$session.get("isLogin");
    if (this.isLogin) {
      this.$vs.loading({
        type: "sound"
      });
      fireSQL
        .rxQuery("SELECT * FROM Billings ORDER BY timestamp DESC", {
          includeId: "id"
        })
        .subscribe(documents => {
          this.$vs.loading.close();
          documents.forEach(val => {
            this.All +=
              (parseFloat(val.total.price) + parseFloat(val.shipping)) *
              parseFloat(val.rateTHBprice);
            this.AllCost +=
              (parseFloat(val.total.cost) + parseFloat(val.shipping)) *
              parseFloat(val.rateTHBcost);
            if (!this.totalcost[momentjs(val.timestamp).format("MM/Y")])
              this.totalcost[momentjs(val.timestamp).format("MM/Y")] = 0;
            if (!this.total[momentjs(val.timestamp).format("MM/Y")])
              this.total[momentjs(val.timestamp).format("MM/Y")] = 0;
            if (!this.profit[momentjs(val.timestamp).format("MM/Y")])
              this.profit[momentjs(val.timestamp).format("MM/Y")] = 0;

            this.totalcost[momentjs(val.timestamp).format("MM/Y")] +=
              (parseFloat(val.total.cost) + parseFloat(val.shipping)) *
              parseFloat(val.rateTHBcost);

            this.total[momentjs(val.timestamp).format("MM/Y")] +=
              (parseFloat(val.total.price) + parseFloat(val.shipping)) *
              parseFloat(val.rateTHBprice);

            this.profit[momentjs(val.timestamp).format("MM/Y")] +=
              (parseFloat(val.total.price) + parseFloat(val.shipping)) *
              parseFloat(val.rateTHBprice);
            -(parseFloat(val.total.cost) + parseFloat(val.shipping)) *
              parseFloat(val.rateTHBcost);

            if (
              momentjs(val.timestamp).format("DD/MM/Y") ===
              momentjs(Date.now()).format("DD/MM/Y")
            ) {
              this.nowTotal +=
                (parseFloat(val.total.price) + parseFloat(val.shipping)) *
                parseFloat(val.rateTHBprice);
              this.nowCost +=
                (parseFloat(val.total.cost) + parseFloat(val.shipping)) *
                parseFloat(val.rateTHBcost);
            }
          });
        });

      fireSQL
        .rxQuery("SELECT * FROM Shippings ORDER BY timestamp DESC")
        .subscribe(documents => {
          this.$vs.loading.close();
          this.shippings = documents;
          documents.forEach(val => {
            this.shippingAll += parseFloat(val.totalAllShip);
            this.shippingCost += parseFloat(val.totalAllShipCost);
            if (!this.reportShipping[momentjs(val.timestamp).format("MM/Y")])
              this.reportShipping[momentjs(val.timestamp).format("MM/Y")] = 0;
            if (
              !this.reportShippingCost[momentjs(val.timestamp).format("MM/Y")]
            )
              this.reportShippingCost[
                momentjs(val.timestamp).format("MM/Y")
              ] = 0;
            if (
              !this.reportShippingProfit[momentjs(val.timestamp).format("MM/Y")]
            )
              this.reportShippingProfit[
                momentjs(val.timestamp).format("MM/Y")
              ] = 0;

            this.reportShipping[
              momentjs(val.timestamp).format("MM/Y")
            ] += parseFloat(val.totalAllShip);

            this.reportShippingCost[
              momentjs(val.timestamp).format("MM/Y")
            ] += parseFloat(val.totalAllShipCost);

            this.reportShippingProfit[momentjs(val.timestamp).format("MM/Y")] +=
              parseFloat(val.totalAllShip) - parseFloat(val.totalAllShipCost);

            if (
              momentjs(val.timestamp).format("DD/MM/Y") ===
              momentjs(Date.now()).format("DD/MM/Y")
            ) {
              this.nowShipping += parseFloat(val.totalAllShip);
              this.nowShippingCost += parseFloat(val.totalAllShipCost);
            }
          });
          this.checkData = true;
        });
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
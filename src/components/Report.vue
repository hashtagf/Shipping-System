<template>
  <div class="Main justify-content-center row">
    <div class="col-7 text-left my-3">
      <h3>รายงานสรุปแต่ละรายการ</h3>
    </div>
    <div class="col-10 table-responsive">
      <table class="table border table-hover table-bordered">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">วันที่</th>
            <th scope="col">ลูกค้า</th>
            <th scope="col">รายการสินค้า</th>
            <th scope="col">คุณสมบัติ</th>
            <th scope="col">จำนวน</th>
            <th scope="col">ราคา</th>
            <th scope="col">รวมราคา</th>
            <th scope="col">รวมราคา (THB)</th>
            <th scope="col">ส่วนต่าง (THB)</th>
            <th scope="col">สถานะ</th>
            <th scope="col">สถานะการชำระเงิน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, index) in billing" :key="val.id">
            <th scope="row">{{index + 1}}</th>
            <td>{{val.timestamp | moment("DD/MM/Y")}}</td>
            <td>
              <customer-name :idCustomer="val.customer" name="true"></customer-name>
            </td>
            <td>
              <div
                class="border-bottom"
                v-for="(product,index) in val.billing"
                :key="index"
              >{{product.product.name}}</div>
            </td>
            <td>
              <div
                class="border-bottom"
                v-for="(product,index)  in val.billing"
                :key="index"
              >{{product.properties}}</div>
              <b class="text-primary">{{"รวม"}}</b>
            </td>
            <td>
              <div
                class="border-bottom"
                v-for="(product,index)  in val.billing"
                :key="index"
              >{{product.count}}</div>
              <b class="text-primary">{{val.total.count}}</b>
            </td>
            <td>
              <div
                class="border-bottom"
                v-for="(product,index)  in val.billing"
                :key="index"
              >{{product.product.cost}}</div>
            </td>
            <td>
              <div
                class="border-bottom"
                v-for="(product,index) in val.billing"
                :key="index"
              >{{product.product.cost * product.count}}</div>
              <b
                class="text-primary"
              >{{new Intl.NumberFormat({ style: 'currency'}).format(val.total.cost)}}</b>
            </td>
            <td>
              <b
                class="text-success"
              >{{new Intl.NumberFormat({ style: 'currency'}).format(val.total.cost * val.rateTHBcost)}}</b>
            </td>
            <td>
              <b
                class="text-info"
              >{{new Intl.NumberFormat({ style: 'currency'}).format(((parseFloat(val.total.price) + parseFloat(val.shipping)) * val.rateTHBprice) - (val.total.cost * val.rateTHBcost))}}</b>
            </td>
            <td>
              <b-badge
                variant="success"
                v-if="val.status === 'รับสินค้าแล้ว'"
                :to="'/TimeShipping/' + val.id"
              >{{val.status}}</b-badge>
              <b-badge variant="info" :to="'/TimeShipping/' + val.id" v-else>{{val.status}}</b-badge>
            </td>
            <td>
              <b-badge variant="success" v-if="val.status_money === 'ชำระแล้ว'">{{val.status_money}}</b-badge>
              <b-badge class="btn btn-warning" variant="warning" v-else>{{val.status_money}}</b-badge>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
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
      TotalPrice: 0,
      customerFullname: "",
      billing: [],
      customer: [],
      billingReport: [],
      customerIndex: [],
      output: null,
      profit: {},
      total: {},
      shippings: [],
      profitShipping: 0,
      totalcost: {},
      reportShipping: {},
      reportShippingCost: {},
      reportShippingProfit: {}
    };
  },
  components: {
    CustomerName
  },
  methods: {
    billingDetail(index, val, customer) {
      this.billingReport = [];
      this.customerIndex = [];
      //val.customer current ID customer
      for (var cust in customer) {
        if (val.customer == customer[cust].id) {
          this.customerFullname = customer[cust].nickname;
          this.customerIndex.push({
            nickname: customer[cust].nickname,
            fullname: customer[cust].fullname,
            tel: customer[cust].tel,
            address: customer[cust].address
          });
        }
      }
      console.log(this.customerIndex);

      this.billingReport.push({
        index: index,
        time: val.timestamp,
        name: val.customer,
        product: val.billing,
        customer: customer
      });
      this.TotalPrice =
        val.total.price * val.rateTHBprice - val.total.cost * val.rateTHBcost;

      this.customerFullname = customer.fullname;
    },
    print() {
      // Pass the element id here
      this.$htmlToPaper("printMe", () => {
        console.log("Printing done or got cancelled!");
      });
    }
  },
  async mounted() {
    this.isLogin = this.$session.get("isLogin");
    if (this.isLogin) {
      fireSQL
        .rxQuery("SELECT * FROM Billings ORDER BY timestamp DESC", {
          includeId: "id"
        })
        .subscribe(documents => {
          this.$vs.loading.close();
          this.billing = documents;

          documents.forEach(val => {
            if (!this.totalcost[momentjs(val.timestamp).format("MM/Y")])
              this.totalcost[momentjs(val.timestamp).format("MM/Y")] = 0;
            if (!this.total[momentjs(val.timestamp).format("MM/Y")])
              this.total[momentjs(val.timestamp).format("MM/Y")] = 0;
            if (!this.profit[momentjs(val.timestamp).format("MM/Y")])
              this.profit[momentjs(val.timestamp).format("MM/Y")] = 0;

            this.totalcost[momentjs(val.timestamp).format("MM/Y")] +=
              parseFloat(val.total.cost) * parseFloat(val.rateTHBcost);

            this.total[momentjs(val.timestamp).format("MM/Y")] +=
              parseFloat(val.total.price) * parseFloat(val.rateTHBprice);

            this.profit[momentjs(val.timestamp).format("MM/Y")] +=
              parseFloat(val.total.price) * parseFloat(val.rateTHBprice) -
              parseFloat(val.total.cost) * parseFloat(val.rateTHBcost);
          });
        });

      fireSQL
        .rxQuery("SELECT * FROM Shippings ORDER BY timestamp DESC")
        .subscribe(documents => {
          this.$vs.loading.close();
          this.shippings = documents;
          documents.forEach(val => {
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
          });
          console.log(this.reportShipping);
        });
    } else {
      this.$router.push("/");
    }
    this.$vs.loading({
      type: "sound"
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
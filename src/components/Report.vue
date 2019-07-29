<template>
  <div class="Main justify-content-center row">
    <div class="col-7 text-left my-3">
      <h3>รายงานสรุป</h3>
    </div>
    <div class="col-3 justify-content my-3">
      <router-link to="/Billing">
        <vs-button color="primary" type="filled" icon="add_circle">เปิดบิล</vs-button>
      </router-link>
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
            <!-- <td>
              <vs-button
                color="warning"
                :to="'/Shipping/' + val.id"
                type="filled"
                icon="settings"
                class="mr-2"
              ></vs-button>
              <vs-button
                v-b-modal.billingDetail
                color="primary"
                type="filled"
                icon="zoom_in"
                @click="billingDetail(index ,val,customer)"
              ></vs-button>
            </td>-->
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <br />

      <div class="Main justify-content-center row">
        <div class="col-7 text-center my-3">
          <h3>สรุปยอดกำไร</h3>
        </div>
        <div class="col-10 table-responsive">
          <table class="table border table-hover table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col" width="2.5%">#</th>
                <th scope="col">วันที่</th>
                <th scope="col">ลูกค้า</th>
                <th scope="col">ราคารวม(จากบิล)</th>
                <th scope="col">ส่วนต่าง(จากบิล)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(val , index) in billing" :key="val.id">
                <th scope="row">{{index + 1}}</th>
                <td>{{val.timestamp | moment("DD/MM/Y")}}</td>
                <td>
                  <customer-name :idCustomer="val.customer" name="true"></customer-name>
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
              </tr>
            </tbody>
            <tfoot class="thead-light">
              <tr class>
                <td class="h5" colspan="3">ยอดรวม</td>
                <td class="h5 text-success">
                  <b>{{new Intl.NumberFormat({ style: 'currency'}).format(total)}}</b>
                </td>
                <td class="h5 text-info">
                  <b>{{new Intl.NumberFormat({ style: 'currency'}).format(profit)}}</b>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div class="Main justify-content-center row">
        <div class="col-7 text-center my-3">
          <h3>สรุปยอดกำไรจากค่าขนส่ง</h3>
        </div>
        <div class="col-10 table-responsive">
          <table class="table border table-hover table-bordered">
            <thead class="thead-light">
              <tr>
                <th scope="col" width="2.5%">#</th>
                <th scope="col">Tracking Number</th>
                <th scope="col">ลูกค้า</th>
                <th scope="col">ค่าขนส่งระหว่างประเทศ</th>
                <th scope="col">ค่าขนส่งภายในประเทศ</th>
                <th scope="col">ผลรวม</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(val , index) in shippings" :key="val.id">
                <th scope="row">{{index + 1}}</th>
                <td>{{billing[index].tracking}}</td>
                <td>
                  <customer-name :idCustomer="billing[index].customer" name="true"></customer-name>
                </td>
                <td>
                  <b
                    class="text-info"
                  >ต้นทุน : {{new Intl.NumberFormat({ style: 'currency'}).format(val.totalShippingCost)}}</b>
                  <br />
                  <b
                    class="text-info"
                  >จ่ายจริง : {{new Intl.NumberFormat({ style: 'currency'}).format(val.totalShipping)}}</b>
                </td>
                <td>
                  <b
                    class="text-success"
                  >{{new Intl.NumberFormat({ style: 'currency'}).format(val.totalInTH)}}</b>
                </td>
                <td>
                  <b
                    class="text-primary"
                  >{{new Intl.NumberFormat({ style: 'currency'}).format(val.totalAllShip -val.totalAllShipCost)}}</b>
                </td>
              </tr>
            </tbody>
            <tfoot class="thead-light">
              <tr class>
                <td class="h5" colspan="4">ยอดรวมกำไรจากค่าขนส่ง</td>
                <td colspan="3">
                  <b
                    class="text-info"
                  >{{new Intl.NumberFormat({ style: 'currency'}).format(profitShipping)}}</b>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <b-modal id="billingDetail" title="ข้อมูลการขนส่ง" size="xl">
        <div id="printMe">
          <b-row>
            <b-col cols="12">
              <br />
            </b-col>
            <b-col cols="4">
              <label v-for="(val) in customerIndex" :key="val.id">ชื่อเล่น : {{val.nickname}}</label>
            </b-col>

            <b-col cols="4">
              <label v-for="(val) in customerIndex" :key="val.id">ชื่อ-นามสกุล : {{val.fullname}}</label>
            </b-col>

            <b-col cols="4">
              <label v-for="(val) in customerIndex" :key="val.id">เบอร์โทร : {{val.tel}}</label>
            </b-col>

            <b-col cols="12">
              <br />
            </b-col>

            <b-col cols="12">
              <label v-for="(val) in customerIndex" :key="val.id">ที่อยู่ : {{val.address}}</label>
            </b-col>

            <b-col cols="12">
              <br />
            </b-col>

            <b-col cols="12">
              <br />
            </b-col>
            <b-col cols="12">
              <div class="col-11 text-center my-1">
                <h5>รายละเอียดสินค้า</h5>
              </div>
            </b-col>

            <b-col cols="12" class="table-responsive" style="height:700px;">
              <table class="table">
                <thead>
                  <th>รายการ</th>
                  <th>คุณสมบัติ</th>
                  <th>จำนวน</th>
                  <th>ราคาต่อชิ้น</th>
                  <th>จำนวนเงิน</th>
                </thead>
                <tbody v-for="(val) in billingReport" :key="val.id">
                  <tr v-for="(prod) in val.product" :key="prod.id">
                    <td>{{prod.product.name}}</td>
                    <td>{{prod.properties}}</td>
                    <td>{{prod.count}}</td>
                    <td>{{prod.product.price}}</td>
                    <td>{{prod.count * prod.product.price}}</td>
                  </tr>
                </tbody>
                <tfoot v-for="(val) in billingReport" :key="val.id">
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <label>
                      <h5>รวมเงิน(หักส่วนต่าง)</h5>
                    </label>
                  </th>
                  <th>
                    <label>
                      <h5>{{TotalPrice}} บาท</h5>
                    </label>
                  </th>
                </tfoot>
              </table>
              <vs-button color="primary" type="filled" icon="print" @click="print()">Print</vs-button>
            </b-col>
          </b-row>
        </div>
      </b-modal>
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
      profit: 0,
      total: 0,
      shippings: [],
      profitShipping: 0
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
  mounted() {
    this.isLogin = this.$session.get("isLogin");
    if (this.isLogin) {
      fireSQL
        .rxQuery("SELECT * FROM Billings ORDER BY timestamp DESC", {
          includeId: "id"
        })
        .subscribe(documents => {
          this.$vs.loading.close();
          this.billing = documents;
          this.billing.forEach(val => {
            this.total += val.total.cost * val.rateTHBcost;
            this.profit +=
              val.total.price * val.rateTHBprice -
              val.total.cost * val.rateTHBcost;
          });
        });
      fireSQL.rxQuery("SELECT * FROM Shippings").subscribe(documents => {
        this.$vs.loading.close();
        this.shippings = documents;
        this.shippings.forEach(val => {
          this.profitShipping += val.totalAllShip - val.totalAllShipCost;
        });
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
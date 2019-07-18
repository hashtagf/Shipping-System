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
            <th scope="col">สถานะ</th>
            <th scope="col" width="10%">จัดการบิล</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, index) in billing" :key="val.id">
            <th scope="row">{{index + 1}}</th>
            <td>{{val.timestamp | moment("DD/MM/Y")}}</td>
            <td>
              <customer-name :idCustomer="val.customer" name="true" v-model="customer"></customer-name>
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
              >{{product.product.price}}</div>
            </td>
            <td>
              <div
                class="border-bottom"
                v-for="(product,index) in val.billing"
                :key="index"
              >{{product.product.price * product.count}}</div>
              <b
                class="text-primary"
              >{{new Intl.NumberFormat({ style: 'currency'}).format(val.total.price)}}</b>
            </td>
            <td>
              <b
                class="text-success"
              >{{new Intl.NumberFormat({ style: 'currency'}).format(val.total.price * val.rateTHBprice)}}</b>
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
                icon="local_printshop"
                @click="billingDetail(index ,val,customer)"
              ></vs-button>
              <vs-button
                v-b-modal.billingShipping
                color="success"
                type="filled"
                icon="local_shipping"
                @click="billingShippingSelect(val.id)"
              ></vs-button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id="billingDetail" title="ข้อมูลบิลลูกค้า" size="xl">
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

            <b-col cols="12" class="table-responsive" style="height:450px;">
              <table class="table">
                <thead>
                  <th>รายการ</th>
                  <th>คุณสมบัติ</th>
                  <th>จำนวน</th>
                  <th>ราคาต่อชิ้น(บาท)</th>
                  <th>จำนวนเงิน(บาท)</th>
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
                      <h5>รวมเงิน</h5>
                    </label>
                  </th>
                  <th>
                    <label>
                      <h5>{{TotalPrice}} บาท</h5>
                    </label>
                  </th>
                </tfoot>
              </table>
            </b-col>
          </b-row>
        </div>
        <div class="col-12 justify-content-end">
          <vs-button color="primary" type="filled" icon="print" @click="print()">Print</vs-button>
        </div>
      </b-modal>
      <b-modal id="billingShipping" title="ข้อมูลการขนส่ง" size="xl">
        <div id="printShipping">
          <b-row v-if="billingShipping">
            <b-col cols="12 h5">รหัสบิลลูกค้า : {{billingShipping.id}}</b-col>
            <b-col cols="6" v-if="billingShipping.shipping === 'CAR'">
              การขนส่งระหว่างประเทศ :
              <b>ขนส่งทางรถ</b>
            </b-col>
            <b-col cols="6" v-if="billingShipping.shipping === 'SHIP'">
              การขนส่งระหว่างประเทศ :
              <b>ขนส่งทางเรือ</b>
            </b-col>
            <b-col cols="6">
              ประเภทสินค้า :
              <b>{{shippingData[billingShipping.productType].name}}</b>
            </b-col>
            <b-col cols="6">
              การขนส่งภายในประเทศ :
              <b>{{billingShipping.shippingTH}}</b>
            </b-col>
            <b-col cols="6" v-if="billingShipping.area === 0">
              ภูมิภาค :
              <b>ภาคกลาง ตะวันออก ตะวันตก</b>
            </b-col>
            <b-col cols="6" v-if="billingShipping.area === 1">
              ภูมิภาค :
              <b>ภาคเหนือ อีสาน ใต้</b>
            </b-col>
            <b-col cols="6">
              ปริมาตร :
              <b>{{billingShipping.capacity}}</b> ลูกบาศก์เมตร
            </b-col>
            <b-col cols="6">
              น้ำหนัก :
              <b>{{billingShipping.weight}}</b> กิโลกรัม
            </b-col>
            <b-col cols="6">
              อัตราต่อหน่วย :
              <b>{{billingShipping.rateunit}}</b> บาท
            </b-col>
            <b-col cols="6"></b-col>
            <b-col cols="6">
              ค่าขนส่งระหว่างประเทศ :
              <b class="text-warning">{{billingShipping.totalShipping}}</b> บาท
            </b-col>
            <b-col cols="6">
              ค่าขนส่งภายในประเทศ :
              <b class="text-warning">{{billingShipping.totalInTH}}</b> บาท
            </b-col>
            <b-col cols="12 my-3 h5">
              ราคารวม :
              <b
                class="text-info"
              >{{parseFloat(billingShipping.totalInTH) + billingShipping.totalShipping}}</b> บาท
            </b-col>
            <b-col cols="12">
              <table class="table table-bordered">
                <tr>
                  <th>กล่อง</th>
                  <th>น้ำหนัก</th>
                  <th>ปริมาตร</th>
                </tr>
                <tr v-for="(val, index) in billingShipping.boxes" :key="val">
                  <td>{{index + 1}}</td>
                  <td>{{val}}</td>
                  <td>{{billingShipping.value[index]}}</td>
                </tr>
              </table>
            </b-col>
          </b-row>
        </div>
        <b-row>
          <vs-button color="primary" type="filled" icon="print" @click="printShipping()">Print</vs-button>
        </b-row>
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
var shippingFirestore = firebase.firestore().collection("Shippings");
var billingFirestore = firebase.firestore().collection("Billings");
var shippingDataFirestore = firebase.firestore().collection("ShippingData");
var shippingDataTHFirestore = firebase.firestore().collection("ShippingDataTH");

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
      shippingData: [],
      billingShipping: null
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
      this.TotalPrice = val.total.price * val.rateTHBprice;
      this.customerFullname = customer.fullname;
    },
    print() {
      // Pass the element id here
      this.$htmlToPaper("printMe", () => {
        console.log("Printing done or got cancelled!");
      });
    },
    printShipping() {
      // Pass the element id here
      this.$htmlToPaper("printShipping", () => {
        console.log("Printing done or got cancelled!");
      });
    },
    billingShippingSelect(id) {
      this.$vs.loading({
        type: "sound"
      });

      shippingFirestore
        .doc(id)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.billingShipping = doc.data();
            this.billingShipping.id = doc.id;
          }
          this.$vs.loading.close();
        });
    }
  },
  mounted() {
    this.$vs.loading({
      type: "sound"
    });
    shippingDataFirestore
      .orderBy("priority")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.shippingData.push(doc.data());
        });
      });
    fireSQL
      .rxQuery("SELECT * FROM Billings ORDER BY timestamp DESC", {
        includeId: "id"
      })
      .subscribe(documents => {
        this.$vs.loading.close();
        this.billing = documents;
      });
    fireSQL
      .rxQuery("SELECT * FROM Customers", { includeId: "id" })
      .subscribe(documents => {
        this.$vs.loading.close();
        this.customer = documents;
      });
  }
};
</script>

<style lang="scss" scoped>
</style>
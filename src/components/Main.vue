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
              <vs-button v-b-modal.billingDetail color="primary" type="filled" icon="zoom_in" @click="billingDetail(index ,val,customer)"></vs-button>
            </td>
         </tr>
        </tbody>
      </table>
             <b-modal id="billingDetail" title="ข้อมูลการขนส่ง" size="xl">
              <b-row>
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
                        <td >
                          {{prod.product.name}}
                          </td>
                        <td >
                          {{prod.properties}}
                        </td>
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
                        <label for>รวมเงิน</label>
                      </th>
                      <th>
                        <label for>{{TotalPrice}} บาท</label>
                      </th>
                    </tfoot>
                  </table>
                </b-col>
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
var billingFirestore = firebase.firestore().collection("Billings");
export default {
  name: "Billing",
  data() {
    return {
      TotalPrice :  0,
      customerFullname:"",
      billing: [],
      customer: [],
      billingReport: [],
      customerIndex: []
     
    };
  },
  components: {
    CustomerName
  },
  methods: {
    
    billingDetail(index ,val, customer) {
      this.billingReport= [];
      this.customerIndex= [];
      //val.customer current ID customer 
      for(var cust in customer){
        if(val.customer == customer[cust].id){
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

    }
  },
  mounted() {
    this.$vs.loading({
      type: "sound"
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
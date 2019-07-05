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
            <th scope="col">จัดการบิล</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, index) in billing" :key="val.id">
            <th scope="row">{{index + 1}}</th>
            <td>{{val.data.timestamp | moment("DD/MM/Y")}}</td>
            <td v-if="customer[index]">{{customer[index].nickname}}</td>
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
              >จัดการค่าขนส่ง</b-button><br><br>
               <b-button 
                variant="primary"
                size="sm" 
                v-b-modal.billingDetail  
                style="bottom: 0;">
               ข้อมูลจัดส่ง</b-button>
            </td>
            
      <b-modal id="billingDetail" title="ข้อมูลการขนส่ง" size="xl" >
          <b-row>
            <b-col cols="4">
              <label for="">วันที่ :</label>  
            </b-col>       
            <b-col cols="4">
              <label for="">ชื่อ-นามสกุล : </label>
            </b-col>
            <b-col cols="12"><br></b-col>

            <b-col cols="12">
              <label for="">ที่อยู่ : </label>
            </b-col>
            <b-col cols="12"><br></b-col>

            <b-col cols="4">
              <label for="">การส่งระหว่างประเทศ :</label> 
            </b-col>     
            <b-col cols="4"></b-col>
            <b-col cols="4">
              <label for="">ค่าขนส่งระหว่างประเทศ : </label>
            </b-col>
            <b-col cols="12"><br></b-col>
            
            <b-col cols="4">
              <label for="">การส่งภายในประเทศ : </label>
            </b-col>     
            <b-col cols="4">
              <label for="">ภูมิภาค : </label>
            </b-col>     
            <b-col cols="4">
              <label for="">ค่าส่งภายในประเทศ : </label>
            </b-col>  
            <b-col cols="12"><br></b-col>

            <b-col cols="3">
              <label for="">ประเภทสินค้า :</label> 
            </b-col> 
            <b-col cols="3">
              <label for="">ปริมาตรรวม :</label> 
            </b-col>   
            <b-col cols="3">
              <label for="">น้ำหนักรวม :</label> 
            </b-col> 
            <b-col cols="3">
              <label for="">อัตราต่อหน่วย/บาท :</label> 
            </b-col> 
            <b-col cols="12"><br></b-col>
            <b-col cols="12"><br></b-col>

            <!-- <b-col cols="12">
              <label for="">...</label> 
            </b-col> 
            <b-col cols="12">
              <label for="">..</label> 
            </b-col> 
            <b-col cols="12">
              <label for="">...</label> 
            </b-col>  -->
            <b-col cols="12" class="table-responsive" style="height:700px;">
              <table class="table">
                <thead>
                  <th>รายการ</th>
                  <th>คุณสมบัติ</th>
                  <th>จำนวน</th>
                  <th>ราคาต่อชิ้น</th>
                  <th>จำนวนเงิน</th>
                </thead>
                <tbody>
                  <tr >
                    <td>เสื้อ</td>
                    <td>ฟรุ้งฟริ้ง</td>
                    <td>5000000</td>
                    <td>20</td>
                    <td>5000000*20</td> 
                  </tr>
                </tbody>
                <tfoot>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>
                    <label for="">รวมเงิน</label>
                  </th>
                  <th>
                    <label for="">100000000 บาท</label>
                  </th>
                </tfoot>
              </table>
            </b-col>
          </b-row>
        </b-modal>


          </tr>
        </tbody>
      </table>
    </div>
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
      billing: [],
      customer: []
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
        doc
          .data()
          .customer.get()
          .then(response => {
            this.customer.push(response.data());
          });
      });
      this.$vs.loading.close();
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <b-container class="Billing">
    <b-row class="mb-5">
      <b-col cols="12">
        <h3>เปิดบิล</h3>
      </b-col>
    </b-row>
    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col cols="12">
          <b-form-group id="customer" label label-for="customer">
            <b-form-select v-model="customer" :options="optionCustomer" required>
              <option :value="null" slot="first">เลือกลูกค้า</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-input id="noteBill" v-model="form.noteBill" type="text" placeholder="หมายเหตุ"></b-form-input>
          <br />
        </b-col>
        <b-col cols="12" class="my-auto" style="height:550px;">
          <b-row style="height: 500px" class="table-responsive mb-2">
            <b-col cols="12">
              <table class="table table-hover table-bordered">
                <thead>
                  <th scope="col">#</th>
                  <th scope="col">รายการสินค้า</th>
                  <th scope="col">คุณสมบัติ</th>
                  <th scope="col">จำนวน</th>
                  <th scope="col">ราคา(CNY)</th>
                  <th scope="col">ราคารวม(CNY)</th>
                  <th scope="col">จัดการ</th>
                </thead>
                <tbody>
                  <tr v-for="(val , index) in cart" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{val.product.name}}</td>
                    <td>{{val.properties}}</td>
                    <td>{{val.count}}</td>
                    <td>{{val.product.price}}</td>
                    <td>
                      <strong>{{val.count * val.product.price}}</strong>
                    </td>
                    <td width="5%">
                      <vs-button color="danger" type="filled" icon="delete" @click="delCart(index)"></vs-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
          <b-button variant="info" v-b-modal.addProduct block style="bottom: 0;">เพิ่มสินค้า</b-button>
        </b-col>
        <b-modal id="addProduct" title="เพิ่มสินค้า" size="xl">
          <b-row>
            <b-col cols="12" class="table-responsive" style="height:700px;">
              <table class="table">
                <thead>
                  <th>ชือสินค้า</th>
                  <th>คุณสมบัติ</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>เลือกสินค้า</th>
                </thead>
                <tbody>
                  <tr v-for="(val, index) in product" :key="val.id">
                    <td>{{val.data.name}}</td>
                    <td>
                      <b-form-select v-model="properties[index]" required>
                        <option :value="undefined" selected slot="first">เลือกคุณสมบัติ</option>
                        <option
                          v-for="prop in val.data.properties"
                          :key="prop.name"
                          :value="prop.name"
                        >{{prop.name}}</option>
                      </b-form-select>
                    </td>
                    <td>
                      ราคาขาย
                      <b>{{val.data.price}}</b> CNY
                      <br />ราคาต้นทุน
                      <b>{{val.data.cost}}</b> CNY
                    </td>
                    <td>
                      <b-form-input
                        id="count"
                        v-model="count[index]"
                        type="number"
                        required
                        placeholder="จำนวน"
                      ></b-form-input>
                    </td>
                    <td>
                      <b-button variant="primary" @click="addCart(val.data, index)">เลือกสินค้า</b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
        </b-modal>
        <b-col cols="4">
          <b-form-group id="shipping" label="ค่าขนส่งในจีน(CNY)" label-for="shipping">
            <b-form-input
              id="shipping"
              v-model="form.shipping"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="ค่าขนส่งในจีน(CNY)"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group
            id="rateTHBprice"
            label="ค่าเงินไทยฝั่งลูกค้า(THB)"
            label-for="rateTHBprice"
          >
            <b-form-input
              id="rateTHBprice"
              v-model="form.rateTHBprice"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="ค่าเงินไทย"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="rateTHBcost" label="ค่าเงินไทยฝั่งต้นทุน(THB)" label-for="rateTHBcost">
            <b-form-input
              id="rateTHBcost"
              v-model="form.rateTHBcost"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="ค่าเงินไทย"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-button type="submit" variant="primary" block>เพิ่มบิล</b-button>
        </b-col>
        <b-col cols="6">
          <b-button type="reset" variant="danger" block>ยกเลิก</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import firebase from "firebase";
var billingFirestore = firebase.firestore().collection("Billings");
var productFirestore = firebase.firestore().collection("Products");
var customerFirestore = firebase.firestore().collection("Customers");
import { FireSQL } from "firesql";
import "firesql/rx";
const fireSQL = new FireSQL(firebase.firestore());
export default {
  name: "Billing",
  data() {
    return {
      showData: [],
      form: [],
      customer: null,
      optionCustomer: [],
      product: [],
      optionProperties: [],
      cart: [],
      properties: [],
      count: [],
      total: {
        count: 0,
        price: 0,
        cost: 0
      }
    };
  },
  watch: {
    product() {}
  },
  methods: {
    onSubmit() {
      //console.log(this.form);
      billingFirestore.add({
        billing: this.cart,
        timestamp: Date.now(),
        customer: this.customer,
        shipping: this.form.shipping,
        rateTHBprice: this.form.rateTHBprice,
        rateTHBcost: this.form.rateTHBcost,
        total: this.total,
        status: "รอการจัดส่ง",
        status_money: "ยังไม่ชำระ",
        tracking: "-"
      });
      this.$swal({
        title: "สำเร็จ",
        text: "เพิ่มบิลเรียบร้อย",
        type: "success",
        timer: 2000
      });
      this.cart = [];
      this.form = [];
      this.customer = null;
      event.target.reset();
    },
    addCart(data, index) {
      this.cart.push({
        count: this.count[index],
        properties: this.properties[index],
        product: data
      });
      this.total.count += parseInt(this.count[index]);
      this.total.price += parseFloat(data.price) * parseInt(this.count[index]);
      this.total.cost += parseFloat(data.cost) * parseInt(this.count[index]);
      console.log(this.cart);
      this.count[index] = null;
      this.properties[index] = null;
      this.$swal({
        title: "สำเร็จ",
        text: "เพิ่มลงตระกร้าสินค้าแล้ว",
        type: "success",
        timer: 2000
      });
    },
    delCart(index) {
      this.$swal({
        title: "ต้องการลบสินค้าออกจากบิล ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบออกจากบิล!"
      }).then(result => {
        if (result.value) {
          this.cart.splice(index, 1);
          this.$swal({
            title: "สำเร็จ",
            text: "ลบออกจารบิลสำเร็จ",
            type: "success",
            timer: 2000
          });
        }
      });
    }
  },
  mounted() {
    productFirestore.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.product.push({
          id: doc.id,
          data: doc.data()
        });
      });
      console.log(this.optionProduct);
    });
    customerFirestore.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.optionCustomer.push({
          text: doc.data().nickname,
          value: doc.id,
          data: doc.data()
        });
      });
      console.log(this.optionCustomer);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
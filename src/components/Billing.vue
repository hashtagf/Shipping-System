<template>
  <b-container class="Billing">
    <b-row>
      <b-col cols="12">
        <h3>จัดการบิล</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-left">
        <h4>ออกบิล</h4>
      </b-col>
    </b-row>

    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col cols="12">
          <b-form-group id="customer" label="ลูกค้า" label-for="customer">
            <b-form-select v-model="customer" :options="optionCustomer" required>
              <option :value="null" slot="first">เลือกลูกค้า</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="my-auto" style="height:500px;">
          <b-row style="height: 450px" class="table-responsive mb-2">
            <b-col cols="12">
              <table class="table">
                <thead>
                  <th>รายการสินค้า</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>
                  <th>จัดการสินค้า</th>
                </thead>
                <tbody>
                  <tr v-for="(val , index) in cart" :key="index">
                    <td>{{val.product.name}}</td>
                    <td>{{val.count}}</td>
                    <td>{{val.count * val.product.price}}</td>
                    <td>
                      <b-button variant="danger" block @click="delCart(index)">ลบสินค้า</b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
          <b-button variant="primary" v-b-modal.addProduct block style="bottom: 0;">เพิ่มสินค้า</b-button>
        </b-col>
        <b-modal id="addProduct" title="เพิ่มสินค้า" size="xl">
          <b-row>
            <b-col cols="9" class="table-responsive">
              <table class="table">
                <thead>
                  <th>ชือสินค้า</th>
                  <th>คุณสมบัติ</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>เลือกสินค้า</th>
                </thead>
                <tbody>
                  <tr v-for="(val) in product" :key="val.id">
                    <td>{{val.data.name}}</td>
                    <td>
                      <b-form-select v-model="form.properties" required>
                        <option :value="null" selected slot="first">เลือกคุณสมบัติ</option>
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
                      <br>ราคาต้นทุน
                      <b>{{val.data.cost}}</b> CNY
                    </td>
                    <td>
                      <b-form-input
                        id="count"
                        v-model="form.count"
                        type="number"
                        required
                        placeholder="จำนวน"
                      ></b-form-input>
                    </td>
                    <td>
                      <b-button
                        variant="primary"
                        @click="addCart(form, val.id, val.data)"
                      >เพิ่มสินค้า</b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
            <b-col cols="3"></b-col>
          </b-row>
        </b-modal>

        <b-col cols="12">
          <b-form-group id="rateTHB" label="ค่าเงินไทย" label-for="rateTHB">
            <b-form-input
              id="rateTHB"
              v-model="form.rateTHB"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="ค่าเงินไทย"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-button type="submit" variant="primary">เพิ่มสินค้า</b-button>
        </b-col>
        <b-col cols="6">
          <b-button type="reset" variant="danger">ยกเลิก</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import firebase from "firebase";
var productFirestore = firebase.firestore().collection("Products");
var customerFirestore = firebase.firestore().collection("Customers");
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
      cart: []
    };
  },
  watch: {
    product() {}
  },
  methods: {
    onSubmit() {
      //console.log(this.form);
      productFirestore.add({
        name: this.form.name,
        price: this.form.price,
        cost: this.form.cost,
        type: this.form.type,
        export: this.form.export,
        sign: this.form.sign,
        import: this.form.import
      });
      event.target.reset();
    },
    addCart(payload, key, data) {
      this.cart.push({
        count: payload.count,
        properties: payload.properties,
        id: key,
        product: data
      });
      console.log(this.cart);
    },
    delCart(index) {
      this.cart.splice(index, 1);
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
          text: doc.data().name,
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
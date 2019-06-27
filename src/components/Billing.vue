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
        <b-col cols="6">
          <b-form-group id="customer" label="ลูกค้า" label-for="customer">
            <b-form-select v-model="customer" :options="optionCustomer" required>
              <option :value="null" slot="first">เลือกลูกค้า</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" class="my-auto">
          <b-button variant="primary" v-b-modal.addProduct block>เพิ่มสินค้า</b-button>
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
                  <tr v-for="(val, index) in product" :key="val.id">
                    <td>{{val.data.name}}</td>
                    <td></td>
                    <td>
                      ราคาขาย
                      <b>{{val.data.price}}</b> CNY
                      <br>ราคาต้นทุน
                      <b>{{val.data.price}}</b> CNY
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
                      <b-button variant="primary">เพิ่มสินค้า</b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
            <b-col cols="3"></b-col>
          </b-row>
        </b-modal>

        <b-col cols="3">
          <b-form-group id="count" label="จำนวน" label-for="count">
            <b-form-input
              id="count"
              v-model="form.count"
              type="number"
              required
              placeholder="จำนวน"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
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
          <b-form-group id="sign" label="เซ็นรับ" label-for="sign">
            <b-form-input id="sign" v-model="form.sign" type="text" required placeholder="เซ็นรับ"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group id="import" label="เข้าโกดังไทย" label-for="import">
            <b-form-input
              id="import"
              v-model="form.import"
              type="text"
              required
              placeholder="เข้าโกดังไทย"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6"></b-col>
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
      form: {},
      customer: null,
      optionCustomer: [],
      product: [],
      properties: null,
      optionProperties: []
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
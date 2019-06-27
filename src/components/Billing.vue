<template>
  <b-container class="Product">
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
            <b-form-select v-model="customer" :options="optionCustomer"></b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group id="product" label="สินค้า" label-for="product">
            <b-form-select v-model="product" :options="optionProduct"></b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group id="cost" label="ราคาต้นทุน" label-for="cost">
            <b-form-input id="cost" v-model="form.cost" type="text" required placeholder="ราคาทุน"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group id="type" label="ประเภทสินค้า" label-for="type">
            <b-form-input
              id="type"
              v-model="form.type"
              type="text"
              required
              placeholder="ประเภทสินค้า"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group id="export" label="ร้านส่งออก" label-for="export">
            <b-form-input
              id="export"
              v-model="form.export"
              type="text"
              required
              placeholder="ร้านส่งออก"
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
  name: "Product",
  data() {
    return {
      showData: [],
      form: {},
      customer: null,
      optionCustomer: [],
      product: null,
      optionProduct: []
    };
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
        this.optionProduct.push({
          text: doc.data().name,
          value: doc.id,
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
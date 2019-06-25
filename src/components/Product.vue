<template>
  <b-container class="Product">
    <b-row>
      <b-col cols="12">
        <h3>จัดการสินค้า</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-left">
        <h4>เพิ่มข้อมูลสินค้า</h4>
      </b-col>
    </b-row>
    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col cols="6">
          <b-form-group id="name" label="ชื่อสินค้า" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="ชือสินค้า"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group id="name" label="ชื่อสินค้า" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="ชือสินค้า"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group id="name" label="ชื่อสินค้า" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="ชือสินค้า"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group id="name" label="ชื่อสินค้า" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="ชือสินค้า"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6"></b-col>
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
export default {
  name: "Product",
  data() {
    return {
      showData: [],
      form: {}
    };
  },
  methods: {
    onSubmit() {
      console.log("object");
      productFirestore.add({
        name: "test"
      });
    }
  },
  mounted() {
    productFirestore.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.showData.push({ data: doc.data(), id: doc.id });
      });
      console.log(this.showData);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
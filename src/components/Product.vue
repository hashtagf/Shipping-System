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
    <b-form @submit="onSubmit" @reset="onReset">
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
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-col>
        <b-col cols="6">
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import firebase from "firebase";
var productFirebase = firebase.database().ref("Products");
export default {
  name: "Product",
  data() {
    return {
      showData: null,
      form: {}
    };
  },
  methods: {},
  mounted() {
    productFirebase.on("value", snap => {
      this.showData = snap.val();
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
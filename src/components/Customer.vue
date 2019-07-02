<template>
  <b-container class="Product">
    <b-row>
      <b-col cols="12">
        <h3>จัดการข้อมูลลูกค้า</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-left">
        <h4>เพิ่มข้อมูลลูกค้า</h4>
      </b-col>
    </b-row>
    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col cols="12">
          <br />
        </b-col>
        <b-col cols="4">
          <b-form-group id="nickname" label="ชื่อเล่น" label-for="nickname">
            <b-form-input
              id="nickname"
              v-model="form.nickname"
              type="text"
              required
              placeholder="ชื่อเล่น"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="4">
          <b-form-group id="fullname" label="ชื่อ-นามสกุล" label-for="fullname">
            <b-form-input
              id="fullname"
              v-model="form.fullname"
              type="text"
              required
              placeholder="ชื่อ-นามสกุล"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="tel" label="เบอร์โทรศัพท์" label-for="tel">
            <b-form-input
              id="tel"
              v-model="form.tel"
              type="tel"
              required
              placeholder="เบอร์โทรศัพท์"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <br />
        </b-col>
        <b-col cols="12">
          <b-form-group id="address" label="ที่อยู่" label-for="address">
            <b-form-textarea
              id="address"
              v-model="form.address"
              type="text"
              required
              placeholder="ที่อยู่"
            ></b-form-textarea>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <br />
        </b-col>
        <b-col cols="6">
          <b-button type="submit" variant="primary">เพิ่มสินค้า</b-button>
        </b-col>
        <b-col cols="6">
          <b-button type="reset" variant="danger">ยกเลิก</b-button>
        </b-col>
      </b-row>
      <b-col cols="12">
        <br />
      </b-col>

      <b-col cols="12">
        <h3>รายชื่อลูกค้า</h3>
      </b-col>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ชื่อเล่น</th>
            <th scope="col">ชื่อ-นามสกุล</th>
            <th scope="col">โทรศัพท์</th>
            <th scope="col">คุณสมบัติ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val) in showData" :key="val.id">
            <td>{{val.data.nickname}}</td>
            <td>{{val.data.fullname}}</td>
            <td>{{val.data.tel}}</td>
            <td>{{val.data.address}}</td>
          </tr>
        </tbody>
      </table>
    </b-form>
  </b-container>
</template>

<script>
import firebase from "firebase";
var customerFirestore = firebase.firestore().collection("Customers");

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
      this.showData = [];
      console.log(this.form);
      customerFirestore.add({
        nickname: this.form.nickname,
        fullname: this.form.fullname,
        tel: this.form.tel,
        address: this.form.address
      });
    }
  },
  mounted() {
    customerFirestore.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.showData.push({
          data: doc.data(),
          id: doc.id
        });
      });
      console.log(this.showData);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
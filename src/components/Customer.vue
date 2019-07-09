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
          <b-button type="submit" variant="primary" block>เพิ่มข้อมูลลูกค้า</b-button>
        </b-col>
        <b-col cols="6">
          <b-button type="reset" variant="danger" block>ยกเลิก</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-row class="mt-5">
      <b-col cols="7">
        <h3>รายชื่อลูกค้า</h3>
      </b-col>
      <b-col cols="5">
        <b-form-input id="search" v-model="search" type="text" required placeholder="ค้นหา"></b-form-input>
      </b-col>
      <table class="table border table-hover table-bordered">
        <thead class="thead-light">
          <tr>
            <th scope="col" class="text-center">รหัสลูกค้า</th>
            <th scope="col" class="text-center">ชื่อเล่น</th>
            <th scope="col" class="text-center">ชื่อ-นามสกุล</th>
            <th scope="col" class="text-center">โทรศัพท์</th>
            <th scope="col" class="text-center" width="40%">ที่อยู่</th>
            <th scope="col" class="text-center" width="5%">ลบ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val) in showData" :key="val.id">
            <td>{{val.customerID}}</td>
            <td>{{val.nickname}}</td>
            <td>{{val.fullname}}</td>
            <td>{{val.tel}}</td>
            <td>{{val.address}}</td>
            <td>
              
              <vs-button
                v-b-modal.billingDetail
                color="danger"
                type="filled"
                icon="delete"
                @click="delCustomer(val)"
              ></vs-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-row>
  </b-container>
</template>

<script>
import firebase from "firebase";
import { FireSQL } from "firesql";
import "firesql/rx";
const fireSQL = new FireSQL(firebase.firestore());
const customerFirestore = firebase.firestore().collection("Customers");
export default {
  name: "Product",
  data() {
    return {
      showData: [],
      form: {},
      search: null
    };
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        fireSQL
          .rxQuery(
            "SELECT * FROM Customers WHERE nickname LIKE '" +
              this.search +
              "%'",
            { includeId: "id" }
          )
          .subscribe(documents => {
            this.showData = documents;
          });
        console.log(this.showData);
      } else {
        fireSQL
          .rxQuery("SELECT * FROM Customers", { includeId: "id" })
          .subscribe(documents => {
            this.$vs.loading.close();
            this.showData = documents;
            console.log(this.showData);
          });
      }
    }
  },
  methods: {
    onSubmit() {
      this.showData = [];
      console.log(this.form);
      customerFirestore.add({
        nickname: this.form.nickname,
        fullname: this.form.fullname,
        tel: this.form.tel,
        address: this.form.address,

      });
      this.$swal({
        title: "สำเร็จ",
        text: "เพิ่มรายชื่อลูกค้าเรียบร้อย",
        type: "success",
        timer: 2000
      });
    },
    delCustomer(val) {
      console.log(val.id);
      this.$swal({
        title: "ต้องการลบข้อมูลลูกค้าคนนี้ ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบออกข้อมูล!"
      }).then(result => {
        if (result.value) {
          this.showData = [];
          customerFirestore.doc(val.id).delete();
          this.$swal({
            title: "สำเร็จ",
            text: "ลบออกข้อมูลสำเร็จ",
            type: "success",
            timer: 2000
          });
        }
      });
      //productFirestore.child(val.id).remove();
    }
  },
  mounted() {
    this.$vs.loading({
      type: "sound"
    });
    fireSQL
      .rxQuery("SELECT * FROM Customers", { includeId: "id" })
      .subscribe(documents => {
        this.$vs.loading.close();
        this.showData = documents;
        console.log(this.showData);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>
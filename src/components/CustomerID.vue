<template>
  <b-container class="Product">
    <b-row>
      <b-col cols="12">
        <h3>จัดการข้อมูลรหัสลูกค้า</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-left">
        <h4>เพิ่มข้อมูลรหัสลูกค้า</h4>
      </b-col>
    </b-row>
    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col cols="12">
          <br />
        </b-col>
        <b-col cols="3"></b-col>
        <b-col cols="6">
          <b-form-group id="customerID" label="รหัสลูกค้า" label-for="customerID">
            <b-form-input
              id="customerID"
              v-model="form.customerID"
              type="text"
              required
              placeholder="รหัสลูกค้า"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3"></b-col>


        <b-col cols="12">
          <br />
        </b-col>
        <b-col cols="3"></b-col>
        <b-col cols="3">
          <b-button type="submit" variant="primary" block>เพิ่มข้อมูลลูกค้า</b-button>
        </b-col>
        <b-col cols="3">
          <b-button type="reset" variant="danger" block>ยกเลิก</b-button>
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
    </b-form>
    <b-row class="mt-5">
      <b-col cols="12">
        <h3>รายการรหัสลูกค้า</h3>
      </b-col>
        <b-col cols="2"></b-col>
        <b-col cols="8">
        <table class="table border table-hover table-bordered">
            <thead class="thead-light">
            <tr>
                <th scope="col" class="text-center">#</th>
                <th scope="col" class="text-center">รหัสลูกค้า</th>
                <th scope="col" class="text-center"> </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(val, index) in showData" :key="val.id">
                <td>{{index+1}}</td>
                <td>{{val.id}}</td>

                <td>
                <vs-button
                    v-b-modal.billingDetail
                    color="danger"
                    type="filled"
                    icon="delete"
                    @click="delCustomerID(val)"
                ></vs-button>
                </td>
            </tr>
            </tbody>
        </table>
        </b-col>
        <b-col cols="2"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from "firebase";
import { FireSQL } from "firesql";
import "firesql/rx";
const fireSQL = new FireSQL(firebase.firestore());
const customerIDFirestore = firebase.firestore().collection("CustomerID");
export default {
  name: "Product",
  data() {
    return {
      showData: [],
      form: {},
      search: null
    };
  },
//   watch: {
//     search() {
//       if (this.search.length > 0) {
//         fireSQL
//           .rxQuery(
//             "SELECT * FROM Customers WHERE nickname LIKE '" +
//               this.search +
//               "%'",
//             { includeId: "id" }
//           )
//           .subscribe(documents => {
//             this.showData = documents;
//           });
//         console.log(this.showData);
//       } else {
//         fireSQL
//           .rxQuery("SELECT * FROM Customers", { includeId: "id" })
//           .subscribe(documents => {
//             this.$vs.loading.close();
//             this.showData = documents;
//             console.log(this.showData);
//           });
//       }
//     }
//   },
  methods: {
    onSubmit() {
      this.showData = [];
      console.log(this.form);
      customerIDFirestore.add({
        id: this.form.customerID
      });
      this.$swal({
        title: "สำเร็จ",
        text: "เพิ่มรายชื่อลูกค้าเรียบร้อย",
        type: "success",
        timer: 2000
      });
    },
    delCustomerID(val) {
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
          customerIDFirestore.doc(val.id).delete();
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
      .rxQuery("SELECT * FROM CustomerID", { includeId: "id" })
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
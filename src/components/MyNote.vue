<template>
  <b-container class="Product">
    <b-row>
      <b-col cols="12">
        <h3>บันทึกส่วนตัว</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-left">
        <h4></h4>
      </b-col>
    </b-row>
    <b-form @submit.prevent="onSubmit">
      <b-row>
        <b-col cols="12">
          <br />
        </b-col>
        <b-col cols="3"></b-col>
        <b-col cols="6">
          <b-form-group id="MyNote" label="รายการโน้ต" label-for="MyNote">
            <b-form-textarea
              id="MyNote"
              v-model="form.note"
              type="text"
              required
              placeholder="คุณกำลังคิดอะไรอยู่ ?"
            ></b-form-textarea>
          </b-form-group>

  

        </b-col>
        <b-col cols="3"></b-col>

        <b-col cols="12">
          <br />
        </b-col>
        <b-col cols="3"></b-col>
        <b-col cols="3">
          <b-button type="submit" variant="primary" block>บันทึกข้อมูล</b-button>
        </b-col>
        <b-col cols="3">
          <b-button type="reset" variant="danger" block>ยกเลิก</b-button>
        </b-col>
        <b-col cols="3"></b-col>
      </b-row>
    </b-form>
    <b-row class="mt-5">
      <b-col cols="12">
        <h3>โน้ตของฉัน</h3>
      </b-col>
      <b-col cols="2"></b-col>
      <b-col cols="8">
      <table class="table border table-hover table-bordered">
        <thead class="thead-light">
            <tr>
              <th scope="col" class="text-center" width="5%">#</th>
              <th scope="col" class="text-center" width="50%">รายการโน้ต</th>
              <th scope="col" class="text-center" width="5%"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(val, index) in showData" :key="val.id">
              <td>{{index+1}}</td>
              <td>{{val.note}}</td>
              <td>
                <vs-button
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
    </b-row>
  </b-container>
</template>
<script>
import firebase from "firebase";
import { FireSQL } from "firesql";
import "firesql/rx";
const fireSQL = new FireSQL(firebase.firestore());
const mynoteFirestore = firebase.firestore().collection("MyNote");
export default {
  name: "MyNote",
  data() {
    return {
      showData: [],
      form: {},
    };
  },
  methods: {
    onSubmit() {
      this.showData = [];
      console.log(this.form.note);
      mynoteFirestore.add({
        note: this.form.note
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
          mynoteFirestore.doc(val.id).delete();
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
    this.isLogin = this.$session.get("isLogin");
    if (this.isLogin) {
      this.$vs.loading({
        type: "sound"
      });
      fireSQL
        .rxQuery("SELECT * FROM MyNote", { includeId: "id" })
        .subscribe(documents => {
          this.$vs.loading.close();
          this.showData = documents;
          console.log(this.showData);
        });
    } else {
      this.$router.push("/");
    }
  }

}

</script>
<style >
    
</style>
<template>
  <b-container class="TimeShipping">
    <b-row>
      <b-col cols="12">
        <h3>เวลาการจัดส่งสินค้า</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="8" class="text-left my-3">
        <h5>รายละเอียดการจัดส่ง - หมายเลขบิล : {{$route.params.id}}</h5>
      </b-col>
      <b-col cols="4">
        <b-form-group id="statusPrice" label="สถานะค่าส่ง" label-for="statusPrice">
          <b-badge variant="success" v-if="showData.statusPrice">{{showData.statusPrice}}</b-badge>
          <b-badge variant="info" v-else @click="updateStatusPrice()">
            <a href="#" class="text-white">{{"รอการชำระค่าขนส่ง"}}</a>
          </b-badge>
        </b-form-group>
      </b-col>
   
    </b-row>
    <b-row>
      <b-col cols="4">
        <b-form-group id="tracking" label="เลขที่บิล" label-for="tracking">
          <b-form-input
            id="tracking"
            v-model="showData.tracking"
            type="text"
            required
            placeholder="เลขที่บิล"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group id="trackingTH" label="เลขที่บิล (TH)" label-for="trackingTH">
          <b-form-input
            id="trackingTH"
            v-model="showData.trackingTH"
            type="text"
            required
            placeholder="เลขที่บิล (TH)"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group id="idCustomer" label="รหัสลูกค้า" label-for="idCustomer">
          <b-form-select v-model="showData.idCustomer" :options="optionCustomer" required>
            <option :value="undefined" slot="first">เลือกรหัสลูกค้า</option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <table class="table border table-bordered">
          <thead class="thead-light">
            <th>วันที่สั่ง</th>
            <th>ร้านส่งออก</th>
            <th>เซ็นรับ</th>
            <th>เข้าระบบ</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <date-picker v-model="showData.timestamp" format="DD-MM-YYYY" lang="en"></date-picker>
              </td>
              <td>
                <date-picker v-model="showData.exportStore" format="DD-MM-YYYY" lang="en"></date-picker>
              </td>
              <td>
                <date-picker v-model="showData.signature" format="DD-MM-YYYY" lang="en"></date-picker>
              </td>
              <td>
                <date-picker v-model="showData.signin" format="DD-MM-YYYY" lang="en"></date-picker>
              </td>
            </tr>
          </tbody>
          <thead class="thead-light">
            <th>ส่งออกจีน</th>
            <th>เข้าโกดังไทย</th>
            <th>ส่งไปบ้าน</th>
            <th>รับสินค้า</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <date-picker v-model="showData.exportCN" format="DD-MM-YYYY" lang="en"></date-picker>
              </td>
              <td>
                <date-picker v-model="showData.toTH" format="DD-MM-YYYY" lang="en"></date-picker>
              </td>
              <td>
                <date-picker v-model="showData.toCustomer" format="DD-MM-YYYY" lang="en"></date-picker>
              </td>
              <td>
                <date-picker v-model="showData.success" format="DD-MM-YYYY" lang="en"></date-picker>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-button type="submit" variant="primary" block @click="updateStatus()">อัพเดทการขนส่ง</b-button>
      </b-col>
      <b-col cols="6">
        <b-button variant="danger" to="/Time" block>ย้อนกลับ</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from "firebase";
var billingFirestore = firebase.firestore().collection("Billings");
var customerIDFirestore = firebase.firestore().collection("CustomerID");
import momentjs from "moment";
import DatePicker from "vue2-datepicker";
export default {
  name: "TimeShipping",
  data() {
    return {
      showData: {
        timestamp: null
      },
      optionCustomer: []
    };
  },
  components: {
    DatePicker
  },
  watch: {},
  methods: {
    updateStatus() {
      let status = "รอการจัดส่ง";
      console.log(this.showData);
      if (this.showData.exportStore) {
        status = "ร้านส่งออก";
        this.showData.exportStore = parseInt(
          momentjs(this.showData.exportStore).format("x")
        );
      }
      if (this.showData.signature) {
        status = "เซ็นรับ";
        this.showData.signature = parseInt(
          momentjs(this.showData.signature).format("x")
        );
      }
      if (this.showData.signin) {
        status = "เข้าระบบ";
        this.showData.signin = parseInt(
          momentjs(this.showData.signin).format("x")
        );
      }
      if (this.showData.exportCN) {
        status = "ส่งออกจากจีน";
        this.showData.exportCN = parseInt(
          momentjs(this.showData.exportCN).format("x")
        );
      }
      if (this.showData.toTH) {
        status = "เข้าโกดังไทย";
        this.showData.toTH = parseInt(momentjs(this.showData.toTH).format("x"));
      }
      if (this.showData.toCustomer) {
        status = "ส่งให้ลูกค้า";
        this.showData.toCustomer = parseInt(
          momentjs(this.showData.toCustomer).format("x")
        );
      }
      if (this.showData.success) {
        status = "รับสินค้าแล้ว";
        this.showData.success = parseInt(
          momentjs(this.showData.success).format("x")
        );
      }
      billingFirestore.doc(this.$route.params.id).update({
        tracking: this.showData.tracking | "-",
        trackingTH: this.showData.trackingTH | "-",
        timeShipping: this.showData,
        status: status
      });
      this.$swal({
        title: "สำเร็จ",
        text: "อัพเดทเรียบร้อย",
        type: "success",
        timer: 2000
      });
    },
    updateStatusPrice() {
      console.log(this.showData);
      this.showData.statusPrice = "ชำระแล้ว";
      billingFirestore.doc(this.$route.params.id).update({
        timeShipping: this.showData
      });
    }
  },
  mounted() {
    this.isLogin = this.$session.get("isLogin");
    if (this.isLogin) {
      this.$vs.loading({
        type: "sound"
      });
      customerIDFirestore.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.optionCustomer.push({
            text: doc.data().id,
            value: doc.id,
            data: doc.data()
          });
        });
      });
      billingFirestore.doc(this.$route.params.id).onSnapshot(doc => {
        this.showData.timestamp = doc.data().timestamp;
        if (doc.data().timeShipping) this.showData = doc.data().timeShipping;
        else {
          this.showData.timestamp = doc.data().timestamp;
        }
        this.$vs.loading.close();
      });
      console.log(this.showData);
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style>
.mx-calendar-icon {
  height: auto !important;
}
</style>
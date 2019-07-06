<template>
  <b-container class="TimeShipping">
    <b-row>
      <b-col cols="12">
        <h3>เวลาการจัดส่งสินค้า</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="text-left my-3">
        <h5>รายละเอียดการจัดส่ง - หมายเลขบิล : {{$route.params.id}}</h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4">
        <b-form-group id="tracking" label="Tracking Number" label-for="tracking">
          <b-form-input
            id="tracking"
            v-model="showData.tracking"
            type="text"
            required
            placeholder="Tracking Number"
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
      <b-col cols="4">
        <b-form-group id="statusPrice" label="สถานะค่าส่ง" label-for="statusPrice">
          <b-form-input
            id="statusPrice"
            v-model="showData.statusPrice"
            type="text"
            required
            placeholder="สถานะค่าส่ง"
          ></b-form-input>
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
  watch: {
    showData() {
      console.log(this.showData);
      billingFirestore.doc(this.$route.params.id).update({
        timeShipping: this.showData
      });
    }
  },
  methods: {
    updateStatus(status) {
      billingFirestore.doc(this.$route.params.id).update({
        status: status
      });
    }
  },
  mounted() {
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
    billingFirestore
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        if (doc.data().timeShipping) this.showData = doc.data().timeShipping;
        else {
          this.showData.timestamp = doc.data().timestamp;
        }
        this.$vs.loading.close();
      });
    console.log(this.showData);
  }
};
</script>

<style>
.mx-calendar-icon {
  height: auto !important;
}
</style>
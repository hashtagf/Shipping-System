<template>
  <b-container class="Shipping">
    <b-form @submit.prevent="onSubmit">
      <!-- //<b-col class="Shipping justify-content-center row"> -->
      <b-row>
        <b-col cols="12">
          <h3>จัดส่งสินค้า</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="text-left my-3">
          <h5>รายละเอียดการจัดส่ง - หมายเลขบิล : {{$route.params.id}}</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3">
          <b-form-group id="shippingType" label="การขนส่งระหว่างประเทศ" label-for="shippingType">
            <b-form-select v-model="shipping" required>
              <option :value="null" slot="first">เลือกประเภทการขนส่งระหว่างประเทศ</option>
              <option value="CAR">ทางรถ</option>
              <option value="SHIP">ทางเรือ</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group id="shippingType" label="ประเภทสินค้า" label-for="shippingType">
            <b-form-select v-model="productType" required>
              <option :value="null" slot="first">เลือกประเภทการขนส่งระหว่างประเทศ</option>
              <option value="0">สินค้าทั่วไป</option>
              <option value="1">สินค้าเฉพาะทาง มอก.</option>
              <option value="2">สินค้าควบคุม อย.</option>
              <option value="3">สินค้าลิขสิทธิ์</option>
              <option value="4">สินค้าชนิดพิเศษ (1)</option>
              <option value="5">สินค้าชนิดพิเศษ (2)</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group id="shippingType" label="การขนส่งภายในประเทศ" label-for="shippingType">
            <b-form-select v-model="shippingTH" required>
              <option :value="null" slot="first">เลือกประเภทการขนส่งภายในประเทศ</option>
              <option value="ทางรถกระบะ">ทางรถกระบะ</option>
              <option value="KERRY EXPRESS">KERRY EXPRESS</option>
              <option value="NIM EXPRESS">NIM EXPRESS</option>
              <option value="ไอที ทรานสปอร์ต">ไอที ทรานสปอร์ต</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group
            id="totalInTH"
            label="จำนวนเงิน(การขนส่งภายในประเทศ)"
            label-for="totalInTH"
            v-if="shippingTH === 'อื่นๆ'"
          >
            <b-form-input
              id="totalInTH"
              v-model="totalInTH"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="ค่าเงินไทย"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="totalInTH"
            label="เกิบเงินปลายทาง"
            label-for="totalInTH"
            v-else-if="shippingTH === 'ไอที ทรานสปอร์ต'"
          >
            <b-form-input
              id="totalInTH"
              v-model="totalInTH"
              type="number"
              value="0"
              step="0.01"
              min="0"
              required
              placeholder
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group id="area" label="ภูมิภาค" label-for="area" v-else>
            <b-form-select v-model="area" required>
              <option :value="null" slot="first">เลือกภูมิภาค</option>
              <option :value="0">ภาคกลาง ตะวันออก ตะวันตก</option>
              <option :value="1">ภาคเหนือ อีสาน ใต้</option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="4">
          <b-form-group id="capacity" label="ปริมาตร" label-for="capacity">
            <b-form-input
              id="capacity"
              type="number"
              v-model="capacity"
              required
              step="0.001"
              placeholder="ปริมาตร"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="weight" label="น้ำหนักรวม" label-for="weight">
            <b-form-input
              id="weight"
              type="number"
              v-model="weight"
              required
              step="0.01"
              placeholder="น้ำหนักรวม"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="rateunit" label="อัตราต่อหน่วย(THB)" label-for="rateunit">
            <b-form-input
              id="rateunit"
              type="number"
              v-model="rateunit"
              readonly
              placeholder="อัตราต่อหน่วย(THB)"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group
            id="totalShipping"
            label="ค่าขนส่งระหว่างประเทศ(THB)"
            label-for="totalShipping"
          >
            <b-form-input
              id="totalShipping"
              type="number"
              v-model="totalShipping"
              readonly
              placeholder="ค่าขนส่งระหว่างประเทศ"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group id="totalInTH" label="ค่าขนส่งภายในประเทศ(THB)" label-for="totalInTH">
            <b-form-input
              id="totalInTH"
              type="number"
              v-model="totalInTH"
              readonly
              placeholder="ค่าขนส่งภายในประเทศ"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group id="totalService" label="ค่าบริการ" label-for="totalService">
            <b-form-input id="totalService" type="number" readonly placeholder="50"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group id="totalAllShip" label="รวมค่าขนส่ง" label-for="totalAllShip">
            <b-form-input
              id="totalAllShip"
              type="number"
              v-model="totalAllShip"
              readonly
              placeholder="รวมค่าขนส่ง"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="8">
          <b-form-group id="noteShipping" label="หมายเหตุ" label-for="noteShipping">
            <b-form-input
              id="noteShipping"
              type="text"
              v-model="noteShipping"
              placeholder="หมายเหตุ"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group id="amount" label="จำนวนกล่อง" label-for="amount">
            <b-form-input
              id="amount"
              v-model="amount"
              type="number"
              required
              placeholder="จำนวนกล่อง"
              @change="createArray(amount)"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="4" v-for="(val, index) in boxes" :key="val.id" class="card my-1">
          <b-row>
            <b-form-group
              id="box"
              :label="'น้ำหนัก : กล่อง ' + (index + 1)"
              label-for="box"
              class="col-6"
            >
              <b-form-input
                id="box"
                v-model="boxes[index]"
                type="number"
                step="0.001"
                required
                placeholder="น้ำหนัก"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="value"
              :label="'ปริมาตร : กล่อง ' + (index + 1)"
              label-for="value"
              class="col-6"
            >
              <b-form-input
                id="value"
                v-model="value[index]"
                type="number"
                step="0.001"
                required
                placeholder="ปริมาตร"
              ></b-form-input>
            </b-form-group>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-button type="submit" variant="primary" block>ส่งสินค้า</b-button>
        </b-col>
        <b-col cols="6">
          <b-button type="reset" variant="danger" block>ยกเลิก</b-button>
        </b-col>
      </b-row>
      <!-- <b-col cols="10">
        <b-form-group id="aaa" label="AAA" label-for="address">
          <b-form-input id="" v-model="aaa" type="text" required placeholder=""></b-form-input> 
        </b-form-group>
      </b-col>-->

      <!-- </div> -->
    </b-form>
  </b-container>
</template>

<script>
import firebase from "firebase";
import CustomerName from "../getdatabase/CustomerName.vue";
var shippingFirestore = firebase.firestore().collection("Shippings");
var shippingDataFirestore = firebase.firestore().collection("ShippingData");
var shippingDataTHFirestore = firebase.firestore().collection("ShippingDataTH");
var billingFirestore = firebase.firestore().collection("Billings");
export default {
  name: "Shipping",
  data() {
    return {
      boxes: [],
      value: [],
      amount: null,
      capacity: null,
      weight: null,
      showData: null,
      shippingTH: null,
      shipping: null,
      rateunit: null,
      totalShipping: null,
      totalInTH: null,
      totalService: 50,
      totalAllShip: null,
      productType: 0,
      area: 0,
      shippingData: [],
      shippingDataTH: [],
      charge: 50,
      totalAllShipCost: 0,
      totalShippingCost: 0,
      rateunitcost: null,
      timestamp: null,
      noteShipping: null
    };
  },
  watch: {
    weight() {
      this.calculate();
    },
    capacity() {
      this.calculate();
    },
    shippingTH() {
      this.calculate();
    },
    shipping() {
      this.calculate();
    },
    productType() {
      this.calculate();
    },
    area() {
      this.calculate();
    }
  },
  components: {
    CustomerName
  },
  methods: {
    onSubmit() {
      this.$vs.loading({
        type: "sound"
      });
      shippingFirestore
        .doc(this.$route.params.id)
        .set({
          timestamp: this.timestamp,
          boxes: this.boxes,
          value: this.value,
          amount: this.amount,
          capacity: this.capacity,
          weight: this.weight,
          shippingTH: this.shippingTH,
          shipping: this.shipping,
          rateunit: this.rateunit,
          totalShipping: this.totalShipping,
          totalInTH: this.totalInTH,
          productType: this.productType,
          area: this.area,
          totalAllShip: this.totalAllShip,
          charge: 50,
          totalAllShipCost: this.totalAllShipCost,
          totalShippingCost: this.totalShippingCost,
          noteShipping: this.noteShipping
        })
        .then(() => {
          this.$vs.loading.close();
          this.$swal({
            title: "สำเร็จ",
            text: "เพิ่มข้อมูลค่าขนส่งเรียบร้อย",
            type: "success",
            timer: 2000
          });
          this.$router.push("/Main");
        })
        .catch(error => {
          this.$vs.loading.close();
          this.$swal({
            title: "ผิดพลาด",
            text: "ไม่สามารถเพิ่มข้อมูลได้",
            type: "error",
            timer: 2000
          });
        });

      event.target.reset();
    },
    createArray(amount, boxes) {
      this.boxes = [];
      for (let index = 0; index < amount; index++) {
        this.boxes[index] = (this.weight / amount).toFixed(2);
        this.value[index] = (this.capacity / amount).toFixed(2);
      }
    },
    calculate() {
      // IN_THAI
      if (this.shippingTH === "ทางรถกระบะ") {
        this.totalInTH = 2800;
      } else if (this.shippingTH === "KERRY EXPRESS") {
        if (this.weight <= 2) {
          this.totalInTH = this.shippingDataTH[0].shipping[this.area + 2];
        } else if (this.weight <= 5) {
          this.totalInTH = this.shippingDataTH[1].shipping[this.area + 2];
        } else if (this.weight <= 10) {
          this.totalInTH = this.shippingDataTH[2].shipping[this.area + 2];
        } else if (this.weight <= 20) {
          this.totalInTH = this.shippingDataTH[3].shipping[this.area + 2];
        } else if (this.weight <= 30) {
          this.totalInTH = this.shippingDataTH[4].shipping[this.area + 2];
        } else if (this.weight <= 40) {
          this.totalInTH = this.shippingDataTH[5].shipping[this.area + 2];
        } else if (this.weight <= 50) {
          this.totalInTH = this.shippingDataTH[6].shipping[this.area + 2];
        } else if (this.weight <= 60) {
          this.totalInTH = this.shippingDataTH[7].shipping[this.area + 2];
        } else if (this.weight <= 70) {
          this.totalInTH = this.shippingDataTH[8].shipping[this.area + 2];
        } else if (this.weight <= 80) {
          this.totalInTH = this.shippingDataTH[9].shipping[this.area + 2];
        } else if (this.weight <= 90) {
          this.totalInTH = this.shippingDataTH[10].shipping[this.area + 2];
        } else if (this.weight <= 100) {
          this.totalInTH = this.shippingDataTH[11].shipping[this.area + 2];
        } else if (this.weight > 100) {
          this.totalInTH =
            this.shippingDataTH[12].shipping[this.area + 2] * this.weight;
        }
      } else if (this.shippingTH === "NIM EXPRESS") {
        if (this.weight <= 2) {
          this.totalInTH = this.shippingDataTH[0].shipping[this.area];
        } else if (this.weight <= 5) {
          this.totalInTH = this.shippingDataTH[1].shipping[this.area];
        } else if (this.weight <= 10) {
          this.totalInTH = this.shippingDataTH[2].shipping[this.area];
        } else if (this.weight <= 20) {
          this.totalInTH = this.shippingDataTH[3].shipping[this.area];
        } else if (this.weight <= 30) {
          this.totalInTH = this.shippingDataTH[4].shipping[this.area];
        } else if (this.weight <= 40) {
          this.totalInTH = this.shippingDataTH[5].shipping[this.area];
        } else if (this.weight <= 50) {
          this.totalInTH = this.shippingDataTH[6].shipping[this.area];
        } else if (this.weight <= 60) {
          this.totalInTH = this.shippingDataTH[7].shipping[this.area];
        } else if (this.weight <= 70) {
          this.totalInTH = this.shippingDataTH[8].shipping[this.area];
        } else if (this.weight <= 80) {
          this.totalInTH = this.shippingDataTH[9].shipping[this.area];
        } else if (this.weight <= 90) {
          this.totalInTH = this.shippingDataTH[10].shipping[this.area];
        } else if (this.weight <= 100) {
          this.totalInTH = this.shippingDataTH[11].shipping[this.area];
        } else if (this.weight > 100) {
          this.totalInTH =
            this.shippingDataTH[12].shipping[this.area] * this.weight;
        }
      } else if (this.shippingTH === "ไอที ทรานสปอร์ต") {
        this.totalInTH = 0;
      }

      //OUT_THAI
      let totalWeight = 0;
      let totalCapicity = 0;
      let positionWeight;
      let positionCapicity;
      let totalWeightCost = 0;
      let totalCapicityCost = 0;
      if (this.shipping === "CAR") {
        if (this.weight <= 100) {
          positionWeight = 0;
          totalWeight =
            this.shippingData[this.productType].car[0] * this.weight;
          totalWeightCost =
            this.shippingData[this.productType].costcar[0] * this.weight;
        } else {
          positionWeight = 1;
          totalWeight =
            this.shippingData[this.productType].car[1] * this.weight;
          totalWeightCost =
            this.shippingData[this.productType].costcar[1] * this.weight;
        }
        if (this.capacity <= 1) {
          positionCapicity = 2;
          totalCapicity =
            this.shippingData[this.productType].car[2] * this.capacity;
          totalCapicityCost =
            this.shippingData[this.productType].costcar[2] * this.capacity;
        } else {
          positionCapicity = 3;
          totalCapicity =
            this.shippingData[this.productType].car[3] * this.capacity;
          totalCapicityCost =
            this.shippingData[this.productType].costcar[3] * this.capacity;
        }

        if (totalWeight > totalCapicity) {
          this.totalShipping = totalWeight;
          this.totalShippingCost = totalWeightCost;
          this.rateunit = this.shippingData[this.productType].car[
            positionWeight
          ];
          this.rateunitcost = this.shippingData[this.productType].costcar[
            positionWeight
          ];
        } else {
          this.totalShipping = totalCapicity;
          this.totalShippingCost = totalCapicityCost;
          this.rateunit = this.shippingData[this.productType].car[
            positionCapicity
          ];
          this.rateunitcost = this.shippingData[this.productType].costcar[
            positionCapicity
          ];
        }
      } else {
        if (this.weight <= 100) {
          positionWeight = 0;
          totalWeight =
            this.shippingData[this.productType].ship[0] * this.weight;
        } else {
          positionWeight = 1;
          totalWeight =
            this.shippingData[this.productType].ship[1] * this.weight;
        }
        if (this.capacity <= 1) {
          positionCapicity = 2;
          totalCapicity =
            this.shippingData[this.productType].ship[2] * this.capacity;
        } else {
          positionCapicity = 3;
          totalCapicity =
            this.shippingData[this.productType].ship[3] * this.capacity;
        }

        if (totalWeight > totalCapicity) {
          this.totalShipping = totalWeight;
          this.rateunit = this.shippingData[this.productType].ship[
            positionWeight
          ];
          this.rateunitcost = this.shippingData[this.productType].costship[
            positionWeight
          ];
        } else {
          this.totalShipping = totalCapicity;
          this.rateunit = this.shippingData[this.productType].ship[
            positionCapicity
          ];
          this.rateunitcost = this.shippingData[this.productType].costship[
            positionCapicity
          ];
        }
      }
      this.totalAllShipCost = (this.totalInTH + this.totalShippingCost).toFixed(
        2
      );
      this.totalAllShip = (
        this.totalShipping +
        this.totalInTH +
        this.charge
      ).toFixed(2);
    }
  },
  mounted() {
    this.isLogin = this.$session.get("isLogin");
    if (this.isLogin) {
      billingFirestore
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          this.timestamp = doc.data().timestamp;
        });
      shippingDataFirestore
        .orderBy("priority")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.shippingData.push(doc.data());
          });
        });
      shippingDataTHFirestore
        .orderBy("kg")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.shippingDataTH.push(doc.data());
          });
        });
      shippingFirestore
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.boxes = doc.data().boxes;
            this.value = doc.data().value;
            this.amount = doc.data().amount;
            this.capacity = doc.data().capacity;
            this.weight = doc.data().weight;
            this.showData = doc.data().showData;
            this.shippingTH = doc.data().shippingTH;
            this.shipping = doc.data().shipping;
            this.rateunit = doc.data().rateunit;
            this.totalShipping = doc.data().totalShipping;
            this.totalInTH = doc.data().totalInTH;
            this.productType = doc.data().productType;
            this.area = doc.data().area;
            this.totalInTh = doc.data().totalInTh;
            this.noteShipping = doc.data().noteShipping;
          }
          this.$vs.loading.close();
        });
    } else {
      this.$router.push("/");
    }
    this.$vs.loading({
      type: "sound"
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
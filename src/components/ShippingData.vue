<template>
  <div class="ShippingData row justify-content-center">
    <h4 class="col-12"><br>ตารางค่าขนส่งของลูกค้า</h4>
    <div class="col-10 table-responsive">
      <table class="table border table-hover table-bordered">
        <thead class="thead-light">
          <th scope="col">#</th>
          <th scope="col">รายการ</th>
          <th scope="col">ต่ำกว่า 100 KG</th>
          <th scope="col">มากกว่า 100 KG</th>
          <th scope="col">ต่ำกว่า 1 CBM</th>
          <th scope="col">มากกว่า 1 CBM</th>
        </thead>
        <tbody>
          <tr>
            <td colspan="6">ขนส่งทางรถ 5 - 7 วัน</td>
          </tr>
          <tr v-for="(val ,index) in showData" :key="index">
            <td>{{index + 1}}</td>
            <td>
              <div v-if="val!=editCar">{{val.data.name}}</div>
                <b-form-input v-else
                  id="export"
                  type="text"
                  v-model="editCarName"
                  required
                  placeholder="ชื่อ"
                ></b-form-input>   
            </td>
            <td>
              <div v-if="val!=editCar">{{val.data.car[0]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCarLessKg"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>   
            </td>
            <td>
              <div v-if="val!=editCar">{{val.data.car[1]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCarMoreKg"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>   
            </td>
            <td>
              <div v-if="val!=editCar">{{val.data.car[2]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCarLessCbm"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>       
            </td>
            <td>
              <div v-if="val!=editCar">{{val.data.car[3]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCarMoreCbm"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>     
            </td>
            <td>
              <div  v-if="val!=editCar">
              <vs-button color="primary" type="filled" icon="edit" @click="editCarShow(val)"></vs-button>
              </div>
              <div v-else>
                <vs-button color="danger" type="filled" icon="cancel" @click="editHide(val)"></vs-button>
                <vs-button color="primary" type="filled" icon="check" @click="editUpdate(val)"></vs-button>

              </div>
            </td>
          </tr>

          <tr>
            <td colspan="6">ขนส่งทางเรือ 25-35 วัน</td>
          </tr>
          <tr v-for="(val ,index) in showData" :key="index + 10">
            <td>{{index + 1}}</td>
            <td>
              <div v-if="val!=editShip">{{val.data.name}}</div>
                <b-form-input v-else
                  id="export"
                  type="text"
                  v-model="editShipName"
                  required
                  placeholder="ชื่อ"
                ></b-form-input>   
            </td>
            <td>
              <div v-if="val!=editShip">{{val.data.ship[0]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editShipLessKg"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>   
            </td>
            <td>
              <div v-if="val!=editShip">{{val.data.ship[1]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editShipMoreKg"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>   
            </td>
            <td>
              <div v-if="val!=editShip">{{val.data.ship[2]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editShipLessCbm"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>   
            </td>
            <td>
              <div v-if="val!=editShip">{{val.data.ship[3]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editShipMoreCbm"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>   
            </td>
            <td>
              <div  v-if="val!=editShip">
              <vs-button color="primary" type="filled" icon="edit" @click="editShipShow(val)"></vs-button>
              </div>
              <div v-else>
                <vs-button color="danger" type="filled" icon="cancel" @click="editHide(val)"></vs-button>
                <vs-button color="primary" type="filled" icon="check" @click="editUpdate(val)"></vs-button>

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 class="col-12"><br>ตารางค่าขนส่งของต้นทุน</h4>
    <div class="col-10 table-responsive">
      <table class="table border table-hover table-bordered">
        <thead class="thead-light">
          <th scope="col">#</th>
          <th scope="col">รายการ</th>
          <th scope="col">ต่ำกว่า 100 KG</th>
          <th scope="col">มากกว่า 100 KG</th>
          <th scope="col">ต่ำกว่า 1 CBM</th>
          <th scope="col">มากกว่า 1 CBM</th>
        </thead>

        <tbody>
          <tr>
            <td colspan="6">ขนส่งทางรถ 5 - 7 วัน</td>
          </tr>
          <tr v-for="(val ,index) in showData" :key="index">
            <td>{{index + 1}}</td>
            <td>
              <div v-if="val!=editCostCar">{{val.data.name}}</div>
                <b-form-input v-else
                  id="export"
                  type="text"
                  v-model="editCostCarName"
                  required
                  placeholder="ชื่อ"
                ></b-form-input>  
            </td>
            <td>
              <div v-if="val!=editCostCar">{{val.data.costcar[0]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCostCarLessKg"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>   
            </td>
            <td>
              <div v-if="val!=editCostCar">{{val.data.costcar[1]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCostCarMoreKg"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>   
            </td>
            <td>
              <div v-if="val!=editCostCar">{{val.data.costcar[2]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCostCarLessCbm"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>  
            </td>
            <td>
              <div v-if="val!=editCostCar">{{val.data.costcar[3]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCostCarMoreCbm"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>   
            </td>
            <td>
              <div  v-if="val!=editCostCar">
              <vs-button color="primary" type="filled" icon="edit" @click="editCostCarShow(val)"></vs-button>
              </div>
              <div v-else>
                <vs-button color="danger" type="filled" icon="cancel" @click="editHide(val)"></vs-button>
                <vs-button color="primary" type="filled" icon="check" @click="editUpdate(val)"></vs-button>

              </div>
            </td>
          </tr>

          <tr>
            <td colspan="6">ขนส่งทางเรือ 25-35 วัน</td>
          </tr>
          <tr v-for="(val ,index) in showData" :key="index + 10">
            <td>{{index + 1}}</td>
            <td>
             <div v-if="val!=editCostShip">{{val.data.name}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCostShipName"
                  type="text"
                  required
                  placeholder="ชื่อ"
                ></b-form-input>  
            </td>
            <td>
              <div v-if="val!=editCostShip">{{val.data.costship[0]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCostShipLessKg"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input>  
            </td>
            <td>
              <div v-if="val!=editCostShip">{{val.data.costship[1]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCostShipMoreKg"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input> 
            </td>
            <td>
              <div v-if="val!=editCostShip">{{val.data.costship[2]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCostShipLessCbm"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input> 
            </td>
            <td>
              <div v-if="val!=editCostShip">{{val.data.costship[3]}}</div>
                <b-form-input v-else
                  id="export"
                  v-model="editCostShipMoreCbm"
                  type="number"
                  step="0.01"
                  required
                  placeholder="ราคา"
                ></b-form-input> 
            </td>
            <td>
              <div  v-if="val!=editCostShip">
              <vs-button color="primary" type="filled" icon="edit" @click="editCostShipShow(val)"></vs-button>
              </div>
              <div v-else>
                <vs-button color="danger" type="filled" icon="cancel" @click="editHide(val)"></vs-button>
                <vs-button color="primary" type="filled" icon="check" @click="editUpdate(val)"></vs-button>

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import CustomerName from "../getdatabase/CustomerName.vue";
var shippingDataFirestore = firebase.firestore().collection("ShippingData");
export default {
  name: "Shipping",
  data() {
    return {
      showData: [],
      editCar: null,
      editShip: null,
      editCostCar: null,
      editCostShip: null,
      editData: []
    };
  },
  components: {
    CustomerName
  },
  methods: {
    editHide(val) {
      console.log("hide edit input");
      this.editCar = null;
      this.editShip = null;
      this.editCostCar = null;
      this.editCostShip = null
    },
    editCarShow(val) {
      console.log(val);
      this.editCar = val;
      this.editCarName = val.data.name;
      this.editCarLessKg = val.data.car[0];
      this.editCarMoreKg = val.data.car[1];
      this.editCarLessCbm = val.data.car[2];
      this.editCarMoreCbm = val.data.car[3];

    },
    editCostCarShow(val){
      console.log(val);
      this.editCostCar = val;
      this.editCostCarName = val.data.name;
      this.editCostCarLessKg = val.data.costcar[0];
      this.editCostCarMoreKg = val.data.costcar[1];
      this.editCostCarLessCbm = val.data.costcar[2];
      this.editCostCarMoreCbm = val.data.costcar[3];
    },
    editShipShow(val){
      console.log(val);
      this.editShip = val;
      this.editShipName = val.data.name;
      this.editShipLessKg = val.data.ship[0];
      this.editShipMoreKg = val.data.ship[1];
      this.editShipLessCbm = val.data.ship[2];
      this.editShipMoreCbm = val.data.ship[3];
    },
    editCostShipShow(val){
      console.log(val);
      this.editCostShip = val;
      this.editCostShipName = val.data.name;
      this.editCostShipLessKg = val.data.costship[0];
      this.editCostShipMoreKg = val.data.costship[1];
      this.editCostShipLessCbm = val.data.costship[2];
      this.editCostShipMoreCbm = val.data.costship[3];
    },

    editUpdate(val) {
      this.$swal({
        title: "ต้องการอัพเดตข้อมูลสินค้า ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "อัพเดตข้อมูล!"
      }).then(result => {
          if(this.editCar != null){
            shippingDataFirestore.doc(val.id).update({
              car: [
                this.editCarLessKg,
                this.editCarMoreKg,
                this.editCarLessCbm,
                this.editCarMoreCbm
              ],
              name: this.editCarName,
            });
          }
          if(this.editShip != null){
            shippingDataFirestore.doc(val.id).update({
              ship: [
                this.editShipLessKg,
                this.editShipMoreKg,
                this.editShipLessCbm,
                this.editShipMoreCbm
              ],
              name: this.editShipName,
            });
          }
          if(this.editCostCar != null){
            shippingDataFirestore.doc(val.id).update({
              costcar: [
                this.editCostCarLessKg,
                this.editCostCarMoreKg,
                this.editCostCarLessCbm,
                this.editCostCarMoreCbm
              ],
              name: this.editCostCarName,
            });
          }
          if(this.editCostShip != null){
            shippingDataFirestore.doc(val.id).update({
              costship: [
                this.editCostShipLessKg,
                this.editCostShipMoreKg,
                this.editCostShipLessCbm,
                this.editCostShipMoreCbm
              ],
              name: this.editCostShipName,
            });
          }
            this.$swal({
              title: "สำเร็จ",
              text: "อัพเดตข้อมูลสำเร็จ",
              type: "success",
              timer: 2000
            });
            this.editCar = null;
            this.editShip = null;
            this.editCostCar = null;
            this.editCostShop = null;
            this.showData = [];
            

      });
    }
  },
  mounted() {
    this.isLogin = this.$session.get("isLogin");
    if (this.isLogin) {
      this.$vs.loading({
        type: "sound"
      });
      shippingDataFirestore.orderBy("priority").onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.showData.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.$vs.loading.close();
      });
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
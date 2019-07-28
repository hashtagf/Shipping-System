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
            <!-- <b-input-group prepend="ชื่อสินค้า" class> -->
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="ชือสินค้า"
            ></b-form-input>
            <!-- </b-input-group> -->
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <br />
        </b-col>

        <b-col cols="3">
          <b-form-group id="price" label="ราคาขาย" label-for="price">
            <b-form-input
              id="price"
              v-model="form.price"
              type="number"
              step="0.01"
              required
              placeholder="ราคาขาย"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group id="cost" label="ราคาต้นทุน" label-for="cost">
            <b-form-input
              id="cost"
              v-model="form.cost"
              type="number"
              step="0.01"
              required
              placeholder="ราคาทุน"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <label class="typo__label">คุณสมบัติ</label>
          <multiselect
            class
            v-model="form.properties"
            tag-placeholder="Press enter to select"
            placeholder="เพิ่มรายการ"
            label="name"
            track-by="code"
            :options="options"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
          ></multiselect>
        </b-col>

        <b-col cols="12">
          <br />
        </b-col>

        <b-col cols="6">
          <b-form-group id="note" label="หมายเหตุ" label-for="note">
            <b-form-input id="note" v-model="form.note" type="text" placeholder="หมายเหตุ"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group id="urlShop" label="เว็บร้านค้า" label-for="urlShop">
            <b-form-input
              id="urlShop"
              v-model="form.urlShop"
              type="url"
              required
              placeholder="url ร้านค้า"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <br />
        </b-col>

        <b-col cols="4">
          <b-form-group id="export" label="สถิติร้านส่งออก(จำนวนวัน)" label-for="export">
            <b-form-input
              id="export"
              v-model="form.export"
              type="number"
              required
              placeholder="จำนวนวัน"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="4">
          <b-form-group id="sign" label="สถิติเซ็นรับ(จำนวนวัน)" label-for="sign">
            <b-form-input
              id="sign"
              v-model="form.sign"
              type="number"
              required
              placeholder="จำนวนวัน"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="4">
          <b-form-group id="import" label="สถิติเข้าโกดังไทย(จำนวนวัน)" label-for="import">
            <b-form-input
              id="import"
              v-model="form.import"
              type="number"
              required
              placeholder="จำนวนวัน"
            ></b-form-input>
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
    </b-form>
    <b-row class="mt-5">
      <b-col cols="7">
        <h3>รายการสินค้า</h3>
      </b-col>
      <b-col cols="5">
        <b-form-input id="search" v-model="search" type="text" required placeholder="ค้นหา"></b-form-input>
      </b-col>
      <table class="table border table-hover table-bordered">
        <thead class="thead-light">
          <tr>
            <th scope="col">ชื่อสินค้า</th>
            <th scope="col">ราคาต้นทุน</th>
            <th scope="col">ราคาขาย</th>
            <th scope="col">คุณสมบัติ</th>
            <th scope="col">หมายเหตุ</th>
            <th scope="col">url ร้าน</th>
            <th scope="col">ร้านส่งออก</th>
            <th scope="col">เซ็นรับ</th>
            <th scope="col">เข้าโกดังไทย</th>
            <th scope="col" class="text-center">แก้ไข</th>
            <th scope="col" class="text-center">ลบ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val) in showData" :key="val.id">
            <td>
              <div v-if="val!=editText">{{val.name}}</div>
              <b-form-input
                v-else
                id="name"
                v-model="form.editName"
                type="text"
                required
                placeholder="ชือสินค้า"
              ></b-form-input>
            </td>
            <td>
              <div v-if="val!=editText">{{val.cost}}</div>
              <b-form-input
                v-else
                id="cost"
                v-model="form.editCost"
                type="number"
                required
                placeholder="ราคาต้นทุน"
              ></b-form-input>
            </td>
            <td>
              <div v-if="val!=editText">{{val.price}}</div>
              <b-form-input
                v-else
                id="price"
                v-model="form.editPrice"
                type="number"
                required
                placeholder="ราคาขาย"
              ></b-form-input>
            </td>
            <td>
              <div v-if="val!=editText">
                <label
                  v-for="prop in val.properties"
                  :key="prop.name"
                  :value="prop.name"
                >{{prop.name}} &nbsp;&nbsp;</label>
              </div>
              <multiselect
                v-else
                v-model="form.properties"
                tag-placeholder="Press enter to select"
                placeholder="เพิ่มรายการ"
                label="name"
                track-by="code"
                :options="options"
                :multiple="true"
                :taggable="true"
                @tag="addTag"
              ></multiselect>
            </td>
            <td>
              <div v-if="val!=editText">{{val.note}}</div>
              <b-form-input
                v-else
                id="note"
                v-model="form.editNote"
                type="text"
                placeholder="หมายเหตุ"
              ></b-form-input>
            </td>
            <td>
              <!-- <a href="' + val.urlShop + '">Link text</a> -->
              <div v-if="val!=editText">
                <p v-if="!val.urlShop">N/A</p>
                <a v-else :href="val.urlShop" target="_blank">
                  <vs-button color="primary" type="filled" icon="link"></vs-button>
                </a>
              </div>
              <!-- <form action="val.urlShop">
                <vs-button  
                  color="danger"
                  type="filled"
                >SHOP</vs-button>  
              </form>-->
              <b-form-input
                v-else
                id="urlShop"
                v-model="form.editUrlShop"
                type="url"
                required
                placeholder="url ร้านค้า"
              ></b-form-input>
            </td>
            <td>
              <div v-if="val!=editText">{{val.export}} วัน</div>
              <b-form-input
                v-else
                id="export"
                v-model="form.editExport"
                type="number"
                required
                placeholder="จำนวนวัน"
              ></b-form-input>
            </td>
            <td>
              <div v-if="val!=editText">{{val.import}} วัน</div>
              <b-form-input
                v-else
                id="sign"
                v-model="form.editImport"
                type="number"
                required
                placeholder="จำนวนวัน"
              ></b-form-input>
            </td>
            <td>
              <div v-if="val!=editText">{{val.sign}} วัน</div>
              <b-form-input
                v-else
                id="import"
                v-model="form.editSign"
                type="number"
                required
                placeholder="จำนวนวัน"
              ></b-form-input>
            </td>
            <td>
              <vs-button
                v-if="val!=editText"
                color="primary"
                type="filled"
                icon="edit"
                @click="editShow(val)"
              ></vs-button>
              <div v-else>
                <vs-button color="danger" type="filled" icon="cancel" @click="editHide(val)"></vs-button>
                <vs-button color="primary" type="filled" icon="check" @click="editUpdate(val)"></vs-button>
              </div>
            </td>
            <td>
              <vs-button color="danger" type="filled" icon="delete" @click="delProduct(val)"></vs-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-row>
  </b-container>
</template>
<script>
import Multiselect from "vue-multiselect";
//Vue.component('multiselect', Multiselect);
import firebase from "firebase";
import { FireSQL } from "firesql";
import "firesql/rx";
const fireSQL = new FireSQL(firebase.firestore());
const productFirestore = firebase.firestore().collection("Products");
export default {
  name: "Product",
  components: {
    Multiselect
  },
  data() {
    return {
      showData: [],
      form: {
        properties: [],
        import: 5
      },
      value: [],
      options: [{ name: "ดำ", code: "black" }, { name: "ขาว", code: "white" }],
      product: [],
      search: null,
      editText: null
    };
  },
  watch: {
    search() {
      if (this.search.length > 0) {
        fireSQL
          .rxQuery(
            "SELECT * FROM Products WHERE name LIKE '" + this.search + "%'",
            { includeId: "id" }
          )
          .subscribe(documents => {
            this.showData = documents;
          });
        console.log(this.showData);
      } else {
        fireSQL
          .rxQuery("SELECT * FROM Products", { includeId: "id" })
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
      //console.log(this.form);
      this.showData = [];

      productFirestore.add({
        name: this.form.name,
        price: this.form.price,
        cost: this.form.cost,
        properties: this.form.properties,
        export: this.form.export,
        sign: this.form.sign,
        import: this.form.import,
        note: this.form.note,
        urlShop: this.form.urlShop
      });
      this.$swal({
        title: "สำเร็จ",
        text: "เพิ่มรายการสินค้าเรียบร้อย",
        type: "success",
        timer: 2000
      });
      event.target.reset();
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: Date.now()
      };
      this.options.push(tag);
      this.form.properties.push(tag);
    },
    addEditTag(newTag) {
      const tag = {
        name: newTag,
        code: Date.now()
      };
      this.option.push(tag);
      this.form.editProperties.push(tag);
    },
    delProduct(val) {
      this.$swal({
        title: "ต้องการลบข้อมูลสินค้า ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบออกข้อมูล!"
      }).then(result => {
        if (result.value) {
          this.showData = [];
          productFirestore.doc(val.id).delete();
          this.$swal({
            title: "สำเร็จ",
            text: "ลบออกข้อมูลสำเร็จ",
            type: "success",
            timer: 2000
          });
        }
      });
    },
    editHide(val) {
      console.log("hide edit input");
      this.editText = null;
    },
    editShow(val) {
      console.log("show edit input");
      this.editText = val;
      this.form.editName = val.name;
      this.form.editPrice = val.price;
      this.form.editCost = val.cost;
      this.form.properties = val.properties;
      this.form.editExport = val.export;
      this.form.editSign = val.sign;
      this.form.editImport = val.import;
      this.form.editUrlShop = val.urlShop;
      this.form.editNote = val.note;
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
        productFirestore.doc(val.id).update({
          name: this.form.editName,
          cost: this.form.editCost,
          price: this.form.editPrice,
          properties: this.form.properties,
          export: this.form.editExport,
          sign: this.form.editSign,
          import: this.form.editImport
        });
        this.$swal({
          title: "สำเร็จ",
          text: "อัพเดตข้อมูลสำเร็จ",
          type: "success",
          timer: 2000
        });
        this.editText = null;
      });
    }
  },
  mounted() {
    this.$vs.loading({
      type: "sound"
    });
    fireSQL
      .rxQuery("SELECT * FROM Products", { includeId: "id" })
      .subscribe(documents => {
        this.$vs.loading.close();
        this.showData = documents;
        console.log(this.showData);
      });
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
</style>
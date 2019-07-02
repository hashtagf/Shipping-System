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
        <b-col cols="12">
          <b-form-group id="name" label="ชื่อสินค้า" label-for="name">
            <b-input-group prepend="ชื่อสินค้า" class>
              <b-form-input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="ชือสินค้า"
              ></b-form-input>
            </b-input-group>
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

        <b-col cols="4">
          <b-form-group id="export" label="ร้านส่งออก" label-for="export">
            <b-form-input
              id="export"
              v-model="form.export"
              type="text"
              required
              placeholder="ร้านส่งออก"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="4">
          <b-form-group id="sign" label="เซ็นรับ" label-for="sign">
            <b-form-input id="sign" v-model="form.sign" type="text" required placeholder="เซ็นรับ"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="4">
          <b-form-group id="import" label="เข้าโกดังไทย" label-for="import">
            <b-form-input
              id="import"
              v-model="form.import"
              type="text"
              required
              placeholder="เข้าโกดังไทย"
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
        <b-col cols="12">
          <br />
        </b-col>
        <b-col cols="12">
          <br />
        </b-col>
        <b-col cols="12">
          <br />
        </b-col>
      </b-row>

      <b-col cols="12">
        <h3>รายการสินค้า</h3>
      </b-col>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ชื่อสินค้า</th>
            <th scope="col">ราคาต้นทุน</th>
            <th scope="col">ราคาขาย</th>
            <th scope="col">คุณสมบัติ</th>
            <th scope="col">ร้านส่งออก</th>
            <th scope="col">เซ็นรับ</th>
            <th scope="col">เข้าโกดังไทย</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val) in showData" :key="val.id">
            <td>{{val.data.name}}</td>
            <td>{{val.data.cost}}</td>
            <td>{{val.data.price}}</td>
            <td>
              <label
                v-for="prop in val.data.properties"
                :key="prop.name"
                :value="prop.name"
              >{{prop.name}} &nbsp;&nbsp;</label>
            </td>
            <td>{{val.data.export}}</td>
            <td>{{val.data.import}}</td>
            <td>{{val.data.sign}}</td>
            <td><b-button variant="danger"  block @click="delProd(val)">ลบสินค้า</b-button> 
            </td>
          </tr>
        </tbody>
      </table>
    </b-form>
  </b-container>
</template>
<script>
import Multiselect from "vue-multiselect";
//Vue.component('multiselect', Multiselect);
import firebase from "firebase";
var productFirestore = firebase.firestore().collection("Products");
export default {
  name: "Product",
  components: {
    Multiselect
  },
  data() {
    return {
      showData: [],
      form: {
        properties: []
      },
      value: [],
      options: [{ name: "ดำ", code: "black" }, { name: "ขาว", code: "white" }],
      product: []
    };
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
        import: this.form.import
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
    delProd(val){

        console.log(val.id);
        //productFirestore.child(val.id).remove();
        productFirestore.doc(val.id).delete();

        // productFirestore.remove({
        // });
        
        
  

    }
  },
  mounted() {
    this.$vs.loading({
      type: "sound"
    });

    productFirestore.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.showData.push({
          data: doc.data(),
          id: doc.id
        });
      });
      this.$vs.loading.close();
      console.log(this.showData);
    });
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
</style>
<template>
  <div id="app">
    <div class="justify-content-center">
      <router-view name="header"/>
      <fade-transition origin="center" mode="out-in" :duration="200">
        <router-view/>
      </fade-transition>
      <router-view name="footer"/>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { FadeTransition } from "vue2-transitions";
var firebaseConfig = {
  apiKey: "AIzaSyDbMgwGR69tWMOMwDRuBNY_vxPRRFIwIYY",
  authDomain: "shippingsystem-12669.firebaseapp.com",
  databaseURL: "https://shippingsystem-12669.firebaseio.com",
  projectId: "shippingsystem-12669",
  storageBucket: "",
  messagingSenderId: "39468502246",
  appId: "1:39468502246:web:f4e70c1e7856cfff"
};

firebase.initializeApp(firebaseConfig);
export default {
  name: "App",
  components: {
    FadeTransition
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

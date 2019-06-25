import Vue from "vue";
import Router from "vue-router";
const Header = () => import("../components/Header.vue");
const Footer = () => import("../components/Footer.vue");
const Main = () => import("../components/Main.vue");
const Product = () => import("../components/Product.vue");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Main",
      components: {
        header: Header,
        default: Main,
        footer: Footer
      }
    },
    {
      path: "/Product",
      name: "Product",
      components: {
        header: Header,
        default: Product,
        footer: Footer
      }
    }
  ]
});

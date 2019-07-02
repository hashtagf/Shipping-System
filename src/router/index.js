import Vue from "vue";
import Router from "vue-router";
const Header = () => import("../components/Header.vue");
const Footer = () => import("../components/Footer.vue");
const Main = () => import("../components/Main.vue");
const Product = () => import("../components/Product.vue");
const Customer = () => import("../components/Customer.vue");
const Billing = () => import("../components/Billing.vue");
const Shipping = () => import("../components/Shipping.vue");
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
    },
    {
      path: "/Customer",
      name: "Customer",
      components: {
        header: Header,
        default: Customer,
        footer: Footer
      }
    },
    {
      path: "/Billing",
      name: "Billing",
      components: {
        header: Header,
        default: Billing,
        footer: Footer
      }
    },
    {
      path: "/Shipping/:id",
      name: "Shipping",
      components: {
        header: Header,
        default: Shipping,
        footer: Footer
      }
    }
  ]
});

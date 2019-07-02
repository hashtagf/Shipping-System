<template>
  <div class="Header mb-3">
    <b-navbar toggleable="lg" type="dark" variant="dark ">
      <b-navbar-brand href="/">Shipping-System</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">บิลลูกค้า</b-nav-item>
          <b-nav-item to="/Billing">เปิดบิล</b-nav-item>
          <b-nav-item to="/Shipping">ส่งสินค้า</b-nav-item>
          <b-nav-item-dropdown text="จัดการข้อมูล" left>
            <b-dropdown-item to="/Product">สินค้า</b-dropdown-item>
            <b-dropdown-item to="/Customer">ลูกค้า</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/Report">รายงานสรุป</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
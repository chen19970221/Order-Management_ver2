<script setup>
import { ref } from 'vue'
import data from "./assets/data.json"
import OrderList from './components/OrderList.vue'
import Order from './components/Order.vue'
import SideBar from './components/SideBar.vue'
const projects = data.projects
const sidebarToggleStatus = ref(false)

function changeSidebarToggleStatus() {
 sidebarToggleStatus.value =!sidebarToggleStatus.value
}
</script>

<template >
  <div :class="{ 'sidebar-toggle': sidebarToggleStatus }">
    <!-- <SideBar/> -->
    <SideBar/>
    
    <main class="main">
      <!-- navbar -->
      <div class="bg-white w-100 border-bottom sticky-top"  @click.prevent="changeSidebarToggleStatus">
        <a href="#" class="py-3 px-4 d-inline-block border-end" id="sidebar-btn">
          <i class="bi bi-arrows-angle-expand"></i>
        </a>
      </div>
    
      <!-- main item -->
      <div class="container mt-3">
        <!-- data -->
        <div class="row row-cols-md-2 row-cols-lg-3 g-4 mb-4">
          <div class="col-lg-6" v-for=" project in projects" :key="project.title">
            <div class="card shadow-sm h-100" >
              <div class="card-body text-end rounded-3">
                <h2 class="display-6">{{project.title}}</h2>
                <p class="display-4 fw-bold mb-0">{{project.description}}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card shadow-sm h-100">
              <div class="card-body text-end rounded-3">
                <h2 class="display-6">{{ data.revenue.title }}</h2>
                <p class="display-4 fw-bold mb-0 text-danger">{{ data.revenue.total }}</p>
              </div>
            </div>
          </div>
        </div>
    
        <!-- one of order -->
        <OrderList :data="data"/>

        <!-- order -->
        <Order/>
      </div>
    </main>
  </div>
</template>



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
    
        <!-- chart -->
        <div class="row g-4 mb-4">
          <div class="col-md-6 col-lg-4">
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <canvas id="myChart" class="img-fluid"></canvas>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <canvas id="bar-chart" class="img-fluid img-position object-position-center"></canvas>
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

<!-- <style lang="scss">
$sidebar-width: 280px;

// mobile devices (預設)
.sidebar {
  width: $sidebar-width;
  margin-left: -$sidebar-width;
  transition: margin-left .25s;
  position: fixed;
  top: 0;
}

.main {
  width: 100%;
}

// 展開 sidebar
.sidebar-toggle {
  .sidebar {
    margin-left: 0;
    width: $sidebar-width;
  }

  .main {
    width: calc(100vw - #{$sidebar-width});
    margin-left: $sidebar-width;
    transition: margin-left .25s;
  }

}

// notebook devices
@media (min-width: 992px) {

  // 展開 sidebar (預設)
  .sidebar {
    width: $sidebar-width;
    margin-left: 0;
  }

  .main {
    width: calc(100vw - #{$sidebar-width});
    margin-left: $sidebar-width;
    transition: margin-left .25s;

  }

  // 關閉 sidebar
  .sidebar-toggle {
    .sidebar {
      margin-left: -$sidebar-width;
      transition: margin-left .25s;
    }

    .main {
      width: 100%;
      margin-left: 0;
    }
  }
}


.sidebar {
  .sidebar-link {
    color: #000;
    display: block;
    text-decoration: none;
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;

    &:hover {
      background-color: rgba(var(--primary), 0.16);
    }
  }

  .sidebar-link.active {
    position: relative;
    color: var(--primary)  !important;
    background-color: rgba(var(--primary), 0.16);

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 2px;
      height: 100%;
      width: 3px;
      background: var(--primary);
    }
  }
}

</style> -->

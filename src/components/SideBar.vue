<script setup>
import { ref } from 'vue'
const isActive = ref('')

const toggleActive = (id) => {
 isActive.value = id
}
</script>

<template>
  <aside class="sidebar vh-100 border-end d-flex flex-column bg-white">
  <!-- 標題 -->
    <p class="px-4 pt-3"><strong>兔寶寶餐館</strong> - 後台管理</p>
    <!-- 項目 -->
    <div class="overflow-auto">
      <a href="#" class="sidebar-link" :class="{'active': isActive === 'home'}" @click.prevent="toggleActive('home')" >
        <div class="px-4"><i class="bi bi-house me-2" ></i>首頁</div>
      </a>
      <a href="#" class="sidebar-link" data-bs-toggle="collapse" :class="{ 'active': isActive === 'order' }" @click.prevent="toggleActive('order')" >
        <div class="px-4 d-flex justify-content-between">
          <div>
            <i class="bi bi-card-checklist me-2"></i>
            <span>訂單管理</span>
          </div>
          <i class="bi bi-caret-down-fill d-block"></i>
        </div>
      </a>
      <div class="collapse" id="orders">
        <a href="#" class="sidebar-link" :class="{ 'active': isActive === 'orderList' }" @click.prevent="toggleActive('orderList')">
          <div class="px-5">訂單列表</div>
        </a>
        <a href="#" class="sidebar-link" :class="{ 'active': isActive === 'oneOfOrder' }" @click.prevent="toggleActive('oneOfOrder')">
          <div class="px-5">單一訂單細節</div>
        </a>
      </div>
      <a href="#" class="sidebar-link" :class="{ 'active': isActive === 'dataList' }" @click.prevent="toggleActive('dataList')">
        <div class="px-4"><i class="bi bi-list-task me-2"></i>參考資料</div>
      </a>
    </div>
    <!-- 登出 -->
    <div class="mt-auto">
      <a href="#" class="sidebar-link">
        <div class="text-end px-4"><i class="bi bi-box-arrow-right me-2"></i>登出</div>
      </a>
    </div>
  </aside>
</template>

<style lang="scss">
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
      background-color: rgba(0,0,0, 0.16);    }
    &.active {
      position: relative;
      color: #fff;
      background-color: rgba(0,0,0, 0.16);
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 2px;
        height: 100%;
        width: 3px;
        background: #000;
      }
    }
  }


}
</style>

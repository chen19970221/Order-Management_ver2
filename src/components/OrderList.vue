<script setup>
import { ref, defineProps, onMounted,computed } from 'vue';
const props = defineProps(['data'])
const orders = ref(props.data.orders)
const orderQuantity = countOrder(orders)
const filterType = ref('all');
const search = ref('')
const itemsPerPage = 5
const currentPage = ref(1)
const editOrder = ref( orders.value )


// 計算付款狀態筆數
function countOrder(orders) {
  let totalOrders = 0;
  let unpayCount = 0;
  let paidCount = 0;
  if (orders) {
    totalOrders = orders.value.length;
    for (let i = 0; i < orders.value.length; i++) {
      if (orders.value[i].payment_status === '尚未付款') {
        unpayCount += 1; 
      } else if (orders.value[i].payment_status === '已付款') {
        paidCount += 1; 
      }
    }
  }
  return {
    totalOrders,
    unpayCount,
    paidCount
  };
}

// 篩選付款狀態 & 查訂單 & 計算當前頁面顯示的訂單
const filteredOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  let filtered = orders.value;
  if (filterType.value === 'unpayOrders') {
    filtered = orders.value.filter(order => order.payment_status === '尚未付款');
  } else if (filterType.value === 'paidOrders') {
    filtered = orders.value.filter(order => order.payment_status === '已付款')
  } else if (search.value) { 
    filtered = orders.value.filter(order => order.order_id.includes(search.value))
  }
  const paginatedOrders = filtered.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return {
    paginatedOrders,
    totalPages
  }
});
function allOrders() {
  filterType.value = 'all';
}
function unpayOrders() {
  filterType.value = 'unpayOrders';
}
function paidOrders() {
  filterType.value = 'paidOrders';
}


// 切換頁面
function changePage(page) { 
  if ( page < 1 || page > filteredOrders.totalPages ) { 
    return
  }
  currentPage.value = page
}
function prevPage() { 
  if (currentPage.value <= 1) { 
    return
  }
  currentPage.value = currentPage.value - 1
}
function nextPage() {
  if (currentPage.value >= filteredOrders.totalPages) {
    return
  }
  currentPage.value = currentPage.value + 1
}


function editOrderModal(order) { 
  editOrder.value = { ...order }
  console.log(order)
  console.log(editOrder.value)
}

// 確認修改訂單
function confirmEditOrder(order) { 
  const index = orders.value.findIndex((order) => order.order_id === editOrder.value.order_id)
  console.log(order.order_id)
  console.log(editOrder.value.order_id)
  console.log(index)
  if (index !== -1) { 
    orders.value[index] = { ...editOrder.value }
  }
  const modal = document.getElementById(`edit-${order.order_id}`);
  const bootstrapModal = bootstrap.Modal.getInstance(modal);
  bootstrapModal.hide();
}


// 刪除訂單
function deleteOrder(orders,orderId) { 
  const selectedIndex = orders.findIndex((order) => order.order_id == orderId)
  console.log(selectedIndex)
  if (selectedIndex !== -1) { 
    orders.splice(selectedIndex, 1);
  }
  const modal = document.getElementById(`cancel-${orderId}`);
  const bootstrapModal = bootstrap.Modal.getInstance(modal);
  bootstrapModal.hide();
}


onMounted(() => {
  allOrders();
});


</script>

<template>
  <!-- 訂單列表 -->
  <div>
     <ul class="nav nav-pills pt-3 border-top border-3 mb-3" >
      <li class="nav-item">
        <a href="#" class="nav-link" :class="{ active: filterType === 'all' }" aria-current="page" @click.prevent="allOrders">所有訂單
          <span class="badge bg-light text-dark ms-1 rounded-pill">{{ orderQuantity.totalOrders }}</span>
        </a>
      </li>
      <li class="nav-item" @click.prevent="unpayOrders">
        <a href="#" class="nav-link" :class="{ active: filterType === 'unpayOrders' }">尚未付款
          <span class="badge bg-light text-dark ms-1 rounded-pill">{{ orderQuantity.unpayCount }}</span>
        </a>
      </li>
      <li class="nav-item"  @click.prevent="paidOrders">
        <a href="#" class="nav-link" :class="{ active: filterType === 'paidOrders' }">已付款
          <span class="badge bg-light text-dark ms-1 rounded-pill">{{ orderQuantity.paidCount }}</span>
        </a>
      </li>
    </ul>
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-transparent">
        <div class="input-group">
          <span class="input-group-text bg-transparent border-0 pe-0">
            <i class="bi bi-search"></i>
          </span>
          <input v-model="search" type="search" class="form-control border-0 shadow-none" placeholder="搜尋訂單編號">
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="text-nowrap table-primary">
              <tr class="align-middle">
                <th scope="col" class="py-3 ps-4">訂單編號</th>
                <th scope="col">Email</th>
                <th scope="col">用戶姓名</th>
                <th scope="col">購買品項</th>
                <th scope="col">付款狀態</th>
                <th scope="col" class="text-center">金額</th>
                <th scope="col" class="pe-4">編輯</th>
              </tr>
            </thead>
            <tbody class="text-nowrap table-group-divider" v-for="order in filteredOrders.paginatedOrders" :key="order.order_id">
              <tr>
                <td scope="row" class="ps-4">{{ order.order_id }}</td>
                <td>{{ order.email }}</td>
                <td>{{ order.customer_name }}</td>
                <td>{{ order.order_item }}</td>
                <td 
                  :class="{
                    'text-danger': order.payment_status === '尚未付款',
                    'text-dark': order.payment_status === '已付款'
                  }">
                    {{ order.payment_status }}
                </td>
                <td class="text-end pe-4">NT$ {{ order.amount }}</td>
                <td>
                  <div class="btn-group">
                    <button 
                      class="btn btn-sm btn-outline-dark" 
                      :id="order.order_id" 
                      :data-bs-target="`#edit-${order.order_id}`"
                      data-bs-toggle="modal"
                      @click="editOrderModal(order)">
                        編輯<i class="bi bi-pen ms-1"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-dark dropdown dropdown-toggle" data-bs-toggle="dropdown">操作</button>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item">
                        <a href="#" class="text-decoration-none link-danger" data-bs-toggle="modal" :data-bs-target="`#cancel-${order.order_id}`">刪除訂單</a>
                      </li>
                    </ul>                  
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer bg-transparent py-3">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end mb-0">
            <li class="page-item">
              <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
            </li>
            <li class="page-item" v-for=" page in filteredOrders.totalPages" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item"><a class="page-link" href="#" @click.prevent="nextPage">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
 
  <!-- 編輯訂單 modal -->
  <div class="modal fade" :id="`edit-${order.order_id}`" tabindex="-1" aria-labelledby="editOrderHeader" aria-hidden="true" v-for="order in filteredOrders.paginatedOrders">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editOrderHeader">編輯訂單</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row g-3" >
          <div>
            <label for="editOrderId">訂單編號</label>
            <input type="text" id="editOrderId" class="form-control" :value="editOrder.order_id" disabled>
          </div>
          <div>
            <label for="editOrderEmail">Email</label>
            <input type="text" id="editOrderId" class="form-control" v-model="editOrder.email" >
          </div>
          <div>
            <label for="editOrderCustomerName">用戶姓名</label>
            <input type="text" id="editOrderCustomerName" class="form-control" v-model="editOrder.customer_name">
          </div>
          <div>
            <label for="editOrderItem">購買品項</label>
            <input type="text" id="editOrderItem" class="form-control" v-model="editOrder.order_item">
          </div>
          <div>
            <label for="editOrderPaymentStatus">付款狀態</label>
            <select class="form-select" aria-label="select" v-model="editOrder.payment_status">
              <option selected>{{ editOrder.payment_status }}</option>
              <option value="尚未付款" v-if="editOrder.payment_status !== '尚未付款'">尚未付款</option>
              <option value="已付款" v-if="editOrder.payment_status !== '已付款'">已付款</option>
            </select>
          </div>
          <div>
            <label for="editOrderEmail">金額</label>
            <input type="text" id="editOrderId" class="form-control" v-model="editOrder.amount">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="submit" class="btn btn-primary" @click="confirmEditOrder(order)">確認</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 刪除訂單 modal -->
  <div class="modal fade" :id="`cancel-${order.order_id}`" tabindex="-1" aria-labelledby="deleteOrder" aria-hidden="true" v-for="order in filteredOrders.paginatedOrders">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="deleteOrder">刪除訂單</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>確認刪除「 {{ order.order_id }} 」的訂單嗎？</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="deleteOrder(orders,order.order_id)">確認刪除</button>
      </div>
    </div>
    </div>
  </div>
</template>

<style>

</style>

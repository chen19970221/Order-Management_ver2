<template>
  <div class="row">
    <!-- order list group -->
    <div class="col-lg-3">
      <div class="list-group mb-4 sticky-top" style="top: 80px;" id="navbarOption">
        <a href="#summary" class="list-group-item list-group-item-action active">摘要</a>
        <a href="#purchaseItems" class="list-group-item list-group-item-action">購買品項</a>
        <a href="#invoice" class="list-group-item list-group-item-action">發票管理</a>
        <a href="#dangerOption" class="list-group-item list-group-item-action">危險操作</a>
      </div>
    </div>
    <!-- order main -->
    <div class="col-lg-9" data-bs-spy="scroll" data-bs-target="#navbarOption" data-bs-offset="80"
      data-bs-smooth-scroll="true" tabindex="0">
      <!-- summary -->
      <div class="card mb-4" id="summary">
        <div class="card-header">摘要</div>
        <div class="card-body">
          <div class="row">
            <div class="col-3">
              <p class="fw-bold">訂單編號</p>
              <p class="fw-bold">訂單金額</p>
              <p class="fw-bold">訂單狀態</p>
              <p class="fw-bold">發票狀態</p>
            </div>
            <div class="col-9">
              <p>TX123456789</p>
              <p>1,800</p>
              <p>待處理</p>
              <p>未開立</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Purchase items -->
      <div class="card mb-4 overflow-auto" id="purchaseItems">
        <div class="card-header">購買品項</div>
        <div class="card-body">
          <table class="table table-hover text-nowrap align-middle w-100" style="font-size: 14px;">
            <thead class="bg-light">
              <tr>
                <th scope="col"></th>
                <th scope="col">貨號</th>
                <th scope="col">商品名稱</th>
                <th scope="col">購買價格</th>
                <th scope="col">訂購數量</th>
                <th scope="col">出貨狀態</th>
                <th scope="col">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="col"><input type="checkbox" class="form-input-check"></td>
                <td scope="col">P1234567</td>
                <td scope="col">大麥克全家餐</td>
                <td scope="col">900</td>
                <td scope="col">1</td>
                <td scope="col" class="text-secondary">尚未處理</td>
                <td class="text-center pe-3">
                  <div class="btn-group">
                    <button type="button" class="btn btn-outline-secondary btn-sm dropdown-toggle show"
                      data-bs-toggle="dropdown">
                      編輯
                    </button>
                    <ul class="dropdown-menu"
                      style="position: absolute; inset: auto 0px 0px auto; margin: 0px; transform: translate3d(0px, -33px, 0px);"
                      data-popper-placement="top-end">
                      <li><a class="dropdown-item" href="#">尚未處理</a></li>
                      <li><a class="dropdown-item" href="#">已出貨</a></li>
                      <li><a class="dropdown-item" href="#">已取貨</a></li>
                      <li>
                        <hr class="dropdown-divider">
                      </li>
                      <li><a class="dropdown-item text-danger" href="#">刪除品項</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <td scope="col"><input type="checkbox" class="form-input-check"></td>
                <td scope="col">P1234567</td>
                <td scope="col">義大利麵佐番茄醬</td>
                <td scope="col">450</td>
                <td scope="col">2</td>
                <td scope="col" class="text-secondary">尚未處理</td>
                <td class="text-center pe-3">
                  <div class="btn-group">
                    <button type="button" class="btn btn-outline-secondary btn-sm dropdown-toggle show"
                      data-bs-toggle="dropdown">
                      編輯
                    </button>
                    <ul class="dropdown-menu"
                      style="position: absolute; inset: auto 0px 0px auto; margin: 0px; transform: translate3d(0px, -33px, 0px);"
                      data-popper-placement="top-end">
                      <li><a class="dropdown-item" href="#">尚未處理</a></li>
                      <li><a class="dropdown-item" href="#">已出貨</a></li>
                      <li><a class="dropdown-item" href="#">已取貨</a></li>
                      <li>
                        <hr class="dropdown-divider">
                      </li>
                      <li><a class="dropdown-item text-danger" href="#">刪除品項</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="">
            <button class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown">出貨狀態管理</button>
            <ul class="dropdown-menu">
              <li><a href="#" class="dropdown-item">尚未處理</a></li>
              <li><a href="#" class="dropdown-item">已出貨</a></li>
              <li><a href="#" class="dropdown-item">已取貨</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a href="#" class="dropdown-item text-danger">刪除品項</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- invoice -->
      <div class="card mb-4" id="invoice">
        <div class="card-header">發票管理</div>
        <div class="card-body">
          <div class="row mb-3">
            <label for="invoiceType" class="col-3 col-form-label">發票類型</label>
            <div class="col-9">
              <select name="" id="invoiceType" class="form-select">
                <option value="">個人發票</option>
                <option value="">營業人三聯式發票</option>
                <option value="">捐贈發票</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label for="guiNumber" class="col-3 col-form-label">統一編號</label>
            <div class="col-9">
              <input type="number" class="form-control" id="guiNumber">
            </div>
          </div>
          <div class="row mb-3">
            <label for="company" class="col-3 col-form-label">公司名稱</label>
            <div class="col-9">
              <input type="text" class="form-control" id="company">
            </div>
          </div>
        </div>
      </div>
      <!-- dangerOption -->
      <div class="card" id="dangerOption">
        <div class="card-header">危險操作</div>
        <div class="card-body">
          <div class="row mb-3 align-items-center">
            <div class="col-2">
              <button type="button" class="btn btn-outline-secondary w-100">退款</button>
            </div>
            <div class="col">退還用戶款項</div>
          </div>
          <div class="row mb-3 align-items-center">
            <div class="col-2">
              <button type="button" class="btn btn-outline-secondary w-100">折讓</button>
            </div>
            <div class="col">針對已開立的訂單退回部分款項</div>
        </div>
        <div class="row mb-3 align-items-center">
          <div class="col-2">
            <button type="button" class="btn btn-outline-danger w-100">刪除訂單</button>
          </div>
          <div class="col">將訂單刪除，並移除相關訂單資訊</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>




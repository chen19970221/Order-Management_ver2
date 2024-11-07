const cancelOrderModal = document.querySelector('#cancelOrderModal')

cancelOrderModal.addEventListener('shown.bs.modal', (e) => {
  const button = e.relatedTarget;
  const orderId = button.dataset.bsOrderId;
  console.log(button);
  const modalText = cancelOrderModal.querySelector('#deleteText');
  modalText.textContent = orderId;
})
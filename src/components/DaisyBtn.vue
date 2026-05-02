<template>
  <!-- Open button -->
  <button class="btn bg-accent-content text-accent" @click="openModal">
    Open modal
  </button>

  <!-- Modal -->
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box bg-secondary-content">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">
        Press ESC key or click the button below to close
      </p>

      <div class="modal-action">
        <button class="btn bg-primary text-secondary" @click="closeModal">
          Close
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from "vue"

const modalRef = ref(null)

const openModal = () => {
  modalRef.value.showModal()
}

const closeModal = () => {
  modalRef.value.close()
}
</script>
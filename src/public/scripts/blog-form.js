/* eslint-env browser */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.add-additional-image').forEach((button) => {
    button.addEventListener('click', function () {
      const container = this.closest('.card-body').querySelector('.additional-images-container')
      const newEntry = document.createElement('div')
      newEntry.classList.add('form-group')

      const imageCount = container.children.length
      const inputId = `additionalImage_${imageCount}`

      // Create label
      const label = document.createElement('label')
      label.setAttribute('for', inputId)
      label.innerText = `Additional Image ${imageCount + 1}`
      newEntry.appendChild(label)

      // Create file input
      const input = document.createElement('input')
      input.type = 'file'
      input.classList.add('form-control')
      input.id = inputId
      input.name = `additionalImages` // Ensure this name matches the backend expectations
      newEntry.appendChild(input)

      // Add new entry to container
      container.appendChild(newEntry)
    })
  })
})

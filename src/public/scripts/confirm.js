/* eslint-env browser */
/* global $ */

$(document).ready(function () {
  $('.btn-delete-project').on('click', function (event) {
    const confirmed = confirm('Are you sure you want to delete this project?')
    const redirect = $(this).attr('onconfirm')
    if (!confirmed) {
      event.preventDefault()
    } else {
      fetch(redirect, { method: 'DELETE' }).then(() => {
        window.location.reload()
      })
    }
  })
})

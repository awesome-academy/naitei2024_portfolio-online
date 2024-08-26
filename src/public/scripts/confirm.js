/* eslint-env browser */
/* global $ */

$(document).ready(function () {
  $('.btn-confirm').on('click', function (event) {
    const confirmed = confirm($(this).attr('message') ?? '')
    const redirect = $(this).attr('onconfirm')
    const method = $(this).attr('method')
    if (!confirmed) {
      event.preventDefault()
    } else {
      fetch(redirect, { method: method }).then(() => {
        window.location.reload()
      })
    }
  })
})

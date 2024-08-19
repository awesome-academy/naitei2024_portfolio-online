/* eslint-env browser */
/* global $ */

$(document).ready(function () {
  $('.edit-comment').on('click', function () {
    const commentId = $(this).data('comment-id')
    const commentContent = $(`#comment-content-${commentId}`)
    const editForm = $(`#edit-form-${commentId}`)

    commentContent.addClass('d-none')
    editForm.removeClass('d-none')
  })

  $('.cancel-edit').on('click', function () {
    const commentId = $(this).data('comment-id')
    const commentContent = $(`#comment-content-${commentId}`)
    const editForm = $(`#edit-form-${commentId}`)

    commentContent.removeClass('d-none')
    editForm.addClass('d-none')
  })
})

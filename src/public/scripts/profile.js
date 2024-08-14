/* eslint-env browser */
/* global $ */

$(document).ready(function () {
  const $tabs = $('.tab')
  const $tabContents = $('.tab-pane')
  const userId = $('.profile-container').data('userId')

  $tabs.on('click', function () {
    const tabName = $(this).data('tab')

    // Activate the clicked tab
    $tabs.removeClass('active')
    $(this).addClass('active')

    // Show the corresponding content
    $tabContents.removeClass('active')
    $(`#${tabName}-content`).addClass('active')
  })
})

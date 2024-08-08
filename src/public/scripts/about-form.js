/* eslint-env browser */
/* global $ */

$(document).ready(function () {
  let experienceCount = 1
  let skillCount = 1

  $('#addExperience').on('click', function () {
    const $container = $('#experienceContainer')
    const $newEntry = $container.children().first().clone(true)

    $newEntry.find('input').each(function () {
      $(this)
        .attr('name', $(this).attr('name').replace('[0]', `[${experienceCount}]`))
        .val('')
    })

    $newEntry.find('textarea').each(function () {
      $(this)
        .attr('name', $(this).attr('name').replace('[0]', `[${experienceCount}]`))
        .val('')
    })

    const $title = $('<h5>').text(`Experience ${experienceCount + 1}`)
    $container.append($title)

    $container.append($newEntry)
    experienceCount++
  })

  $('#addSkill').on('click', function () {
    const $container = $('#skillsContainer')
    const $newEntry = $container.children().first().clone(true)

    $newEntry.find('input').each(function () {
      $(this)
        .attr('name', $(this).attr('name').replace('[0]', `[${skillCount}]`))
        .val('')
    })

    $newEntry.find('select').each(function () {
      $(this)
        .attr('name', $(this).attr('name').replace('[0]', `[${skillCount}]`))
        .prop('selectedIndex', 0)
    })
    const $title = $('<h5>').text(`Skill ${skillCount + 1}`)
    $container.append($title)

    $container.append($newEntry)
    skillCount++
  })
})

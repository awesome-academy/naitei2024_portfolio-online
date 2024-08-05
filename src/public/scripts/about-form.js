/* eslint-env browser */
/* global $ */

$(document).ready(function () {
  let experienceCount = $('#experienceContainer > div').length
  let skillCount = $('#skillsContainer > div').length

  $('#addExperience').on('click', function () {
    const container = $('#experienceContainer')
    const newEntry = container.children().first().clone()
    const inputs = newEntry.find('input')
    const textareas = newEntry.find('textarea')

    inputs.each(function () {
      this.name = this.name.replace(/\[\d+\]/, `[${experienceCount}]`)
      this.value = ''
    })

    textareas.each(function () {
      this.name = this.name.replace(/\[\d+\]/, `[${experienceCount}]`)
      this.value = ''
    })

    const title = $('<h5>').text(`Experience ${experienceCount + 1}`)
    container.append(title)

    container.append(newEntry)
    experienceCount++
  })

  $('#addSkill').on('click', function () {
    const container = $('#skillsContainer')
    const newEntry = container.children().first().clone()
    const inputs = newEntry.find('input')
    const selects = newEntry.find('select')

    inputs.each(function () {
      this.name = this.name.replace(/\[\d+\]/, `[${skillCount}]`)
      this.value = ''
    })

    selects.each(function () {
      this.name = this.name.replace(/\[\d+\]/, `[${skillCount}]`)
      this.selectedIndex = 0
    })

    const title = $('<h5>').text(`Skill ${skillCount + 1}`)
    container.append(title)

    container.append(newEntry)
    skillCount++
  })
})

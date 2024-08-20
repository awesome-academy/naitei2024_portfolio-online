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
    const checkboxes = newEntry.find('input[type="checkbox"]')

    // Update the names and clear the values
    inputs.each(function () {
      this.name = this.name.replace(/\[\d+\]/, `[${skillCount}]`)
      if (this.type !== 'checkbox') {
        this.value = ''
      }
    })

    selects.each(function () {
      this.name = this.name.replace(/\[\d+\]/, `[${skillCount}]`)
      this.selectedIndex = 0
    })

    checkboxes.each(function () {
      this.name = this.name.replace(/\[\d+\]/, `[${skillCount}]`)
      this.checked = false // Reset checkbox
    })

    const title = $('<h5>').text(`Skill ${skillCount + 1}`)
    container.append(title)
    container.append(newEntry)
    skillCount++
  })

  const copyLinkBtn = $('#copyLinkBtn')

  if (copyLinkBtn.length) {
    copyLinkBtn.on('click', function () {
      const urlToCopy = $(this).data('url')

      navigator.clipboard
        .writeText(urlToCopy)
        .then(() => {
          const originalHTML = copyLinkBtn.html()
          copyLinkBtn.html('<i class="ri-check-line ri-lg me-2"></i>' + copyLinkBtn.data('copied-text'))

          setTimeout(() => {
            copyLinkBtn.html(originalHTML)
          }, 2000)
        })
        .catch((err) => {
          console.error('Failed to copy: ', err)
          copyLinkBtn.html('<i class="ri-error-warning-line ri-lg me-2"></i>' + copyLinkBtn.data('failed-text'))
        })
    })
  }
})

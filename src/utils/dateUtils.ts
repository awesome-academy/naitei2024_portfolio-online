function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}

export function formatExperiencePeriod(startDate: Date, endDate: Date | null): string {
  const formattedStartDate = formatDate(startDate)
  const formattedEndDate = endDate ? formatDate(endDate) : 'Present'
  return `${formattedStartDate} - ${formattedEndDate}`
}

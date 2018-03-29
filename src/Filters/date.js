export default (value) => {
  const date = new Date (value)
    return date.toLocaleString(['de-DE'], {year: 'numeric', month: 'long', day: 'numeric'})
}
export const handleTurn = () => {
  const hours = new Date().getHours()
  let message = ''

  if (hours >= 0 && hours < 12) {
    message = 'Good morning'
  } else if (hours >= 12 && hours < 18) {
    message = 'Good afternoon'
  } else {
    message = 'Good night'
  }
  return message
}

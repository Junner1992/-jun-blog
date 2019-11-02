module.exports = function getDate(str) {
  let myDate = new Date(str)

  const
    y = myDate.getFullYear(),
    m = myDate.getMonth() + 1,
    d = myDate.getDate(),
    a = myDate.getHours(),
    h = a > 9 ? a : '0' + a
    b = myDate.getMinutes();
    n = b > 9 ? b : '0' + b

  let date = y + '-' + m + '-' + d + ' ' + h + ':' + n

  return date
}
export function parseCurrency(value){
  value = +value
  return isNaN(value) ? '' : value.toFixed(2)
}

export function getCleanDate(d){
  d = new Date(d)
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)
  return d
}

export function pickUpDate(time){
  return time && time.split && time.split(/\s/)[0]
}

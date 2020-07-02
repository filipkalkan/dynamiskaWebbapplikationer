

export async function getWeather(longitude, latitude) {
  return await fetch(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitude}/lat/${latitude}/data.json`)
    .then(response => response.json())
    .then(data => getRelevantDataPoints(data))
    .then(filteredData => extractRelevantData(filteredData))
}

function getRelevantDataPoints(data) {
  return data.timeSeries.filter(dataPoint => {
    let timeStamp = dataPoint.validTime
    let date = new Date(timeStamp)
    if (validHours(date) && (nbrOfDaysTo(date) < 2)){
      return true
    }
    return false
  })
}

function validHours(date) {
  return date.getHours() === 6 || date.getHours() === 12 || date.getHours() === 18;
}

function nbrOfDaysTo(date) {
  return ((new Date().getTime() - date.getTime())) * (1000*60*60*24)
}

function extractRelevantData(filteredData) {
  return filteredData.map(data => {
    data.parameters = data.parameters.filter(param => validateName(param.name))
    return data
  })
}

function validateName(name) {
  return name === "t" || name === "wd" || name === "ws" || name === "Wsymb2"
}
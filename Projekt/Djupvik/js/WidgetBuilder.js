import {degToCompass, getWeatherDescription} from "./WeatherUtils.js";


export default function display(dataPoints) {
    const target = getTargetElement()
    buildWidget(dataPoints, target)
}

function getTargetElement() {
    return document.getElementById("smhi-widget")
}

function buildWidget(dataPoints, target) {
    const table = createTable(dataPoints)

    const weatherHeader = document.createElement("h2")
    weatherHeader.innerText = "Väder"

    target.appendChild(weatherHeader)

    target.appendChild(table)
}

function createTable(dataPoints) {
    const table = document.createElement("table")
    const tableHeaders = createTableHeaders()
    const todayHeader = document.createElement("h3")
    todayHeader.innerText = "Idag"
    const tomorrowHeader = document.createElement("h3")
    tomorrowHeader.innerText = "Imorgon"

    const todayDataPoints = dataPoints.filter(dataPoint => isToday(dataPoint))
    const todayRows = todayDataPoints.map(dataPoint => createRow(dataPoint))

    const tomorrowDataPoints = dataPoints.filter(dataPoint => isTomorrow(dataPoint))
    const tomorrowRows = tomorrowDataPoints.map(dataPoint => createRow(dataPoint))

    table.appendChild(todayHeader)
    table.appendChild(tableHeaders)
    todayRows.forEach(row => table.appendChild(row))

    table.appendChild(tomorrowHeader)
    table.appendChild(tableHeaders.cloneNode(true))
    tomorrowRows.forEach(row => table.appendChild(row))

    return table
}

function isToday(dataPoint) {
    let now = new Date()
    if (new Date(dataPoint.validTime).getDate() == now.getDate()){
        return true
    } else {
        return false
    }
}

function isTomorrow(dataPoint) {
    let now = new Date()
    let tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    if (new Date(dataPoint.validTime).getDate() == tomorrow.getDate()){
        return true
    } else {
        return false
    }
}

function createTableHeaders() {
    const row = document.createElement("tr")

    const time = document.createElement("th")
    time.innerText = "KL"
    row.appendChild(time)

    const temperature = document.createElement("th")
    temperature.innerText = "Temp"
    row.appendChild(temperature)

    const wind = document.createElement("th")
    wind.innerText = "Vind"
    row.appendChild(wind)

    const sky = document.createElement("th")
    sky.innerText = "Himmel"
    row.appendChild(sky)

    return row
}

function createRow(dataPoint) {
    const row = document.createElement("tr")

    const time = document.createElement("td")
    time.innerText = new Date(dataPoint.validTime).getHours()
    row.appendChild(time)

    const temperature = document.createElement("td")
    temperature.innerText = dataPoint.parameters[0].values[0].toString()
    row.appendChild(temperature)

    const wind = document.createElement("td")
    wind.innerText = degToCompass(dataPoint.parameters[1].values[0]) + ", (" + dataPoint.parameters[2].values[0].toString() + ") m/s"
    row.appendChild(wind)

    const sky = document.createElement("td")
    sky.innerText = getWeatherDescription(dataPoint.parameters[3].values[0])
    row.appendChild(sky)

    return row
}

import {getWeather} from "./SmhiService.js"
import display from "./WidgetBuilder.js"

const longitude = 18.1489
const latitude = 57.3081

async function init(e){
  let dataPoints = await getWeather(longitude, latitude)
  display(dataPoints)
}

init()

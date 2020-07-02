let weatherMap = undefined

function init(){
    let weatherTableString = "1\tClear sky\n" +
        "2\tNearly clear sky\n" +
        "3\tVariable cloudiness\n" +
        "4\tHalfclear sky\n" +
        "5\tCloudy sky\n" +
        "6\tOvercast\n" +
        "7\tFog\n" +
        "8\tLight rain showers\n" +
        "9\tModerate rain showers\n" +
        "10\tHeavy rain showers\n" +
        "11\tThunderstorm\n" +
        "12\tLight sleet showers\n" +
        "13\tModerate sleet showers\n" +
        "14\tHeavy sleet showers\n" +
        "15\tLight snow showers\n" +
        "16\tModerate snow showers\n" +
        "17\tHeavy snow showers\n" +
        "18\tLight rain\n" +
        "19\tModerate rain\n" +
        "20\tHeavy rain\n" +
        "21\tThunder\n" +
        "22\tLight sleet\n" +
        "23\tModerate sleet\n" +
        "24\tHeavy sleet\n" +
        "25\tLight snowfall\n" +
        "26\tModerate snowfall\n" +
        "27\tHeavy snowfall";

    let table = weatherTableString.split("\n")
    table = table.map(row => row.split("\t"))
    weatherMap = table.map(entry => entry[1])
}

export function getWeatherDescription(statusNumber) {
    return weatherMap[statusNumber - 1]
}

export function degToCompass(deg){
    const index = Math.round((deg / 22.5))
    const compassOptions = ["N","NNÖ","NÖ","ÖNÖ","Ö","ÖSÖ", "SÖ", "SSÖ","S","SSV","SV","VSV","V","VNV","NV","NNV"]
    return compassOptions[(index % 16)]
}

init()


import {getAllResults} from "./soccerService.js";
import createRow from "./resultDisplayer.js";

function displayResults(results) {
    let table = document.getElementById("table")
    results.map((result) => createRow(result, table))
}

async function init(){
    const RESULTS = await getAllResults()
    displayResults(RESULTS)
}

init()
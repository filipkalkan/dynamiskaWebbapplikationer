
function createTeamAnchor(team) {
    let teamA = document.createElement("a")
    teamA.innerText = team.name
    teamA.setAttribute("href", team.homepage)
    return teamA
}

function createVsElem() {
    let vsElem = document.createElement("span")
    vsElem.innerText = " -VS- "
    return vsElem;
}

function createTeamsElem(teams) {
    let teamsTd = document.createElement("Td")
    let teamA1 = createTeamAnchor(teams["1"]);
    let teamA2 = createTeamAnchor(teams["2"]);
    let vsElem = createVsElem();
    teamsTd.appendChild(teamA1)
    teamsTd.appendChild(vsElem)
    teamsTd.appendChild(teamA2)
    return teamsTd
}

function createCheckmarkElem() {
    let checkmark = document.createElement("span")
    checkmark.classList.add("checkmark")

    let stemDiv = document.createElement("div")
    stemDiv.classList.add("stem")

    let kickDiv = document.createElement("div")
    kickDiv.classList.add("kick")

    checkmark.appendChild(stemDiv)
    checkmark.appendChild(kickDiv)
    return checkmark
}

function createOutcomeElem(outcome, identifier) {
    let outcomeTd = document.createElement("td")
    if (outcome == identifier){
        let checkmark = createCheckmarkElem();
        outcomeTd.appendChild(checkmark)
    }
    return outcomeTd
}

export default function createRow(result, table) {
    let tr = document.createElement("tr")
    let rowNbrTd = document.createElement("td")
    rowNbrTd.innerHTML = String(result.gameNumber)
    tr.appendChild(rowNbrTd)

    let teamsTd = createTeamsElem(result.teams)
    tr.appendChild(teamsTd)

    let outcomeTd1 = createOutcomeElem(result.outcome, "1")
    let outcomeTdX = createOutcomeElem(result.outcome, "X")
    let outcomeTd2 = createOutcomeElem(result.outcome, "2")

    tr.appendChild(outcomeTd1)
    tr.appendChild(outcomeTdX)
    tr.appendChild(outcomeTd2)

    table.appendChild(tr)
}

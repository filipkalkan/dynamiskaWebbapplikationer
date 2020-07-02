
export async function getAllResults(){
    return await fetch("https://stryk.herokuapp.com/tipset")
        .then((response) => response.json())
        .then(data => data.results)
}
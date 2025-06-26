console.log("let's do it!");

async function main(){
    let a = await fetch("http://localhost:5500/spotify/images/songs");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let tds = div.getElementsByTagName('td')
    console.log(tds)
}

main()
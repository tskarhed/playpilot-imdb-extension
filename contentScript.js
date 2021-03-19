function generateLinkElement(url) {
    let linkEl = document.createElement("a");

    // Let Playpilot automatically resolve locality
    linkEl.href = url;
    linkEl.innerHTML = "<img src='https://www.playpilot.com/images/icon-playpilot-logo.svg' alt='Find on Playpilot'/> Find where to watch";
    linkEl.id = "playpilot-link";

    return linkEl;
}

function placeElement(url){
    let linkEl = generateLinkElement(url);

    // Put the link element on the site
    document.querySelector(".summary_text").prepend(linkEl);
    
    console.log("Playpilot IMDb extension loaded.");
    
};

function getMovieId() {
    let idString = window.location.pathname;
    // Assume id strucutre ttXXXXXXXX
    return idString.match(/tt[0-9]\w+/g)[0];
}

async function getMovieURL(movieId){
   chrome.runtime.sendMessage({movieId: movieId}, function(response){
        console.log(response);
        if(response.ok){
            placeElement(response.url);
        }
   });
}

let id = getMovieId();
getMovieURL(id)

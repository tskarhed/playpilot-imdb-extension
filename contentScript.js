function generateLinkElement(title) {
    let linkEl = document.createElement("a");
    let cleanTitle = cleanWhitespace(title);

    // Let Playpilot automatically resolve locality
    linkEl.href = `https://playpilot.com/search/?q=${cleanTitle}&t=titles`;
    linkEl.innerHTML = "<img src='https://www.playpilot.com/images/icon-playpilot-logo.svg' alt='Find on Playpilot'/> Find where to watch";
    linkEl.id = "playpilot-link";

    return linkEl;
}

function cleanWhitespace(str){
    //Trim trailing whitespace and commas
    let cleanText = str.trim();
    //Replace space with - and remove nbsp;
    return cleanText.replace(/ /g, "+").replace(/\&nbsp;/, "");
}

// Get movie title element and make copy
let movieTitleEl = document.querySelector(".title_wrapper > h1").cloneNode(true);

// Remove child element to just have the pure title
movieTitleEl.removeChild(movieTitleEl.children[0])

let linkEl = generateLinkElement(movieTitleEl.innerHTML);

// Put the link element on the site
document.querySelector(".summary_text").prepend(linkEl);

console.log("Playpilot IMDb extension loaded.");

function generateLinkElement(title) {
    console.log(title);
    let linkEl = document.createElement("a");
    let cleanTitle = cleanWhitespace(title);
    console.log(cleanTitle);
    linkEl.href = `https://playpilot.com/se/search/?q=${cleanTitle}&t=titles`;
    linkEl.innerHTML = "<img src='https://www.playpilot.com/images/icon-playpilot-logo.svg' alt='Find on Playpilot'/> Find on Playpilot";
    linkEl.id = "playpilot-link";
    return linkEl;
}

function cleanWhitespace(str){
    //Trim trailing whitespace and commas
    let cleanText = str.trim();
    //Replace space with - and remove nbsp;
    return cleanText.replace(" ", "+").replace(/\&nbsp;/, "");
}

// Get movie title element and make copy

let movieTitleEl = document.querySelector(".title_wrapper > h1").cloneNode(true);

// Remove child elements to just have the pure title

console.log(movieTitleEl);
movieTitleEl.removeChild(movieTitleEl.children[0])
console.log(movieTitleEl);

let linkEl = generateLinkElement(movieTitleEl.innerHTML);


// Put the link element on the site

document.querySelector(".summary_text").prepend(linkEl);

console.log("Playpilot IMDb extension loaded.");

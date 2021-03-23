
chrome.runtime.onInstalled.addListener(function() {
    console.log("Where to watch - Playpilot/IMDb installed.");
});

chrome.runtime.onMessage.addListener(function(request, _sender,callback){

    getMovieURL(request.movieId).then(function(url) {
        callback({ok: true, url: url});
    }).catch(function(err){
        callback({ok: false, err:err.message});
    });
        
    // Needed to return async
    return true;
});

async function getMovieURL(movieId){
    let res = await fetch(`https://atlas.playpilot.com/api/v1/titles/browse/?format=json&imdb_id=${movieId}`,{
        headers: {
            'User-Agent': 'ChromeExtension'
        }});

    if(res.ok){
        let data = await res.json()

        if(!data.results.length){
            throw new Error('No object was found from Playpilot API');    
        }

        if(!data.results[0].hasOwnProperty(slug)) {
            throw new Error('No slug was returned from Playpilot API');
        }
        let slug = data.results[0].slug;

        return createURL(slug);
    }
}

function createURL(movieSlug){
    // Exclude country code and let Playpilot handle it automatically
    return `https://www.playpilot.com/movie/${movieSlug}/`;
}

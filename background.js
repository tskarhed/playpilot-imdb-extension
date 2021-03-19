
chrome.runtime.onInstalled.addListener(function() {
    console.log("Where to watch - Playpilot/IMDb installed.");
});

chrome.runtime.onMessage.addListener(function(request, _sender,callback){

    getMovieURL(request.movieId).then(function(url) {
        callback({ok: true, url: url});
    }).catch(function(err){
        callback({err:err});
    });
        
    // Needed to return async
    return true;
});

async function getMovieURL(movieId){
    let res = await fetch(`https://atlas.playpilot.com/api/v1/titles/browse/?format=json&imdb_id=${movieId}`,{
        headers: {
            'User-Agent': 'ChromeExtension'
        }});
    console.log(res);
    if(res.ok){
        let data = await res.json()
        
        console.log(data);
        let slug = data.results[0].slug;
        let type = data.results[0].type;
        return createURL(slug, type);
    }
}

function createURL(movieSlug, type){
    // Exclude country code and let Playpilot ahndle it autmatically
    return `https://www.playpilot.com/${type}/${movieSlug}/`;
}

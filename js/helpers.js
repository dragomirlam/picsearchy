// xmlHttp GET request
function xmlHttpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send();
    return xmlHttp.responseText;
}

// Handling the response from Flickr API
// and storing the data in the session storage
function jsonFlickrApi(res){
	var photosLength = res.photos.photo.length;
	var photos = res.photos.photo;

	document.getElementById("images-container").innerHTML = '';
	document.getElementById("modal-windows").innerHTML = '';

	var view = new View();
	var searchResults = {};

	searchResults.key = "search-results";
	searchResults.images = [];

	for(var i=0; i<photosLength; i++){
		var img = new Img(photos[i].id, photos[i].farm, photos[i].server, photos[i].secret);
		img.createImgUrl("s");
		img.createImgUrl("q");
		img.createImgUrl("b");

		searchResults.images.push(img);
		sessionStorage.setItem(searchResults.key, JSON.stringify(searchResults));
	}
	view.loadSearchResults();
}

// Searches an array and returns the index of the searched term
function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i=0; i<myArray.length; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}
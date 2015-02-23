function search(){
	var query = document.getElementById("search-text").value;
	var src = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=bebcc5d7e73e38718107ccfc85c3e775&tags='+query+'&per_page=20';
	var resStr = xmlHttpGet(src);
	var resJSON = JSON.parse(resStr);
	// console.log(resStr);
	jsonFlickrApi(resJSON);
}
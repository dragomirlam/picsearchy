// xmlHttp request
function xmlHttpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();

    //open(method,url,async)
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send();
    return xmlHttp.responseText;
}

// Flickr API
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
		var img = new Image(photos[i].id, photos[i].farm, photos[i].server, photos[i].secret);
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

function loadGalleryImages(){
	var galleryName = document.getElementById("galleries-menu").value;
	document.getElementById("images-container").innerHTML = null;
	loadGalleryImgs(galleryName);
}

function loadGalleryImgs(key){
	searchResults = sessionStorage.getItem(key);
	jsonSearchResults = JSON.parse(searchResults);
	images = jsonSearchResults.images;

	var imageSmall, imageBig;

	for(var i=0; i<images.length; i++){
		console.log(images[i].id);
		console.log(images[i].s_url);
		imageSmallHref = '<a href="#'+images[i].id+'" id="pop"><img class="img-space" src='+images[i].s_url+'></a>';
		imageBigModalWindow = '<a href="#" class="overlay" id="'+images[i].id+'"></a>'+
							  '<div class="popup"><img class="img-space" src='+
							  images[i].b_url+
							  '><a class="close" href="#"></a>'+
							  '</div>';
		document.getElementById("images-container").innerHTML += imageSmallHref;
		document.getElementById("modal-windows").innerHTML += imageBigModalWindow;
	}
}


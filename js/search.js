var selectedImages = [];
var resJSON;

function search(){
	var query = document.getElementById("search-text").value;
	var src = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=bebcc5d7e73e38718107ccfc85c3e775&tags='+query+'&per_page=50';
	var resStr = xmlHttpGet(src);

	if(sessionStorage.length !== 0){
		sessionStorage.removeItem("search-results");
	}

	resJSON = JSON.parse(resStr);
	jsonFlickrApi(resJSON);
}

function selectImg(imgId){
	var color = document.getElementById(imgId).style.borderColor;

	if(color === "rgb(0, 0, 0)"){
		document.getElementById(imgId).style.borderColor="#00FF00";
		selectedImages.push(imgId);
		console.log(selectedImages);
	}
	else{
		document.getElementById(imgId).style.borderColor="#000000";
		var index = selectedImages.indexOf(imgId);
		selectedImages.splice(index, 1);
		console.log(selectedImages);
	}
}

function addGallery(){
	var gallery = {};

	if(selectedImages.length === 0){
		alert("No images have been selected!\nSelect some images and click the add button to create a new gallery!");
	}
	else {
		gallery.images = [];
		gallery.key = prompt("Please enter a name for the gallery!");

		var searchResults = sessionStorage.getItem("search-results");
		var jsonSearchResults = JSON.parse(searchResults);
		var images = jsonSearchResults.images;

		for(var i=0; i<selectedImages.length; i++){	
			var id = selectedImages[i].toString();
			var index = arrayObjectIndexOf(images, id, "id");
			var imgURLs = images[index];
			var img = {};

			img.id = id;
			img.s_url = imgURLs.s_url;
			img.b_url = imgURLs.b_url;
			console.log(img.id);
			gallery.images.push(img);
		}
		console.log(gallery);
		sessionStorage.setItem(gallery.key, JSON.stringify(gallery));
		appendGallery(gallery.key);
	}
}

function loadData(){
	var searchResults, jsonSearchResults, images, image;

	if(sessionStorage.length === 0){
	} else {
		loadSearchImages("search-results", "q_url", "images-container");
		loadGalleries();
	}
}

function loadSearchImages(key, format, elementId){
	searchResults = sessionStorage.getItem(key);
	jsonSearchResults = JSON.parse(searchResults);
	images = jsonSearchResults.images;

	for(var i=0; i<images.length; i++){
		image = '<img id="'+images[i].id+'" style="border: solid 2px #000000;" onclick="selectImg('+images[i].id+')" src="'+ images[i][format] +'" class="img-space"/>';
		document.getElementById(elementId).innerHTML += image;
	}
}

function loadGalleries(){
	if(sessionStorage.length === 0){
		// alert("Create your own gallery:\n1. Choose some images.\n 2. Click the add button to the top right corner.");
	} else {
		var key;

		for(var i=0; i<sessionStorage.length; i++){
			key = sessionStorage.key(i);
			
			if(key === "search-results"){
				continue;
			} else {
				appendGallery(key);
			}
		}
	}
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

function appendGallery(key){
	var option = document.createElement("option");
	option.text = key;
	option.value = key;
	var select = document.getElementById("galleries-menu");
	select.appendChild(option);
}

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i=0; i<myArray.length; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}
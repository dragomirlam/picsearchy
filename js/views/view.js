var View = function(){};

// Displays all the images that have been retrieved from the last search
View.prototype.loadSearchResults = function(){
	var image;

	// Cleaning the DOM
	document.getElementById("images-container").innerHTML = '';
	document.getElementById("modal-windows").innerHTML = '';

	// Retrieving the data from the session storage
	var value = sessionStorage.getItem("search-results");
	var jsonData = JSON.parse(value);
	var images = jsonData.images;

	// Setting the images in the DOM
	for(var i=0; i<images.length; i++){
		image = '<img id="'+images[i].id+'" alt="'+images[i].id+'" style="border: solid 2px #000000;" onclick="selectImg('+images[i].id+')" src="'+ images[i].q_url +'" class="img-space"/>';
		document.getElementById("images-container").innerHTML += image;
	}
};

View.prototype.loadGalleries = function(){
	var key;

	// Search in the session storage to find galleries
	for(var i=0; i<sessionStorage.length; i++){
		key = sessionStorage.key(i);
		if(key === "search-results"){
			continue;
		} else {
			this.appendGallery(key);
		}
	}
};

View.prototype.appendGallery = function(key){
	var option = document.createElement("option");
	option.text = key;
	option.value = key;
	var select = document.getElementById("galleries-menu");
	select.appendChild(option);
}

View.prototype.showGalleryImages = function(key){
	searchResults = sessionStorage.getItem(key);
	jsonSearchResults = JSON.parse(searchResults);
	images = jsonSearchResults.images;

	var imageSmall, imageBig;

	for(var i=0; i<images.length; i++){
		imageSmallHref = '<a href="#'+images[i].id+'" id="pop"><img class="img-space" alt="'+images[i].id+'" src='+images[i].s_url+'></a>';
		imageBigModalWindow = '<a href="#" class="overlay" id="'+images[i].id+'"></a>'+
							  '<div class="popup"><img class="img-space" alt="'+images[i].id+'" src='+
							  images[i].b_url+
							  '><a class="close" href="#"></a>'+
							  '</div>';
		
		document.getElementById("images-container").innerHTML += imageSmallHref;
		document.getElementById("modal-windows").innerHTML += imageBigModalWindow;
	}
}
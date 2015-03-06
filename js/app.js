var view = new View();
var selectedImages = [];
var resJSON;

// Trigger the functions to load the images from the last search
// and the galleries from the session storage
function loadData(){
	if(sessionStorage.length === 0){
	} else {
		view.loadSearchResults();
		view.loadGalleries();
	}
}

// Search based on free text using the flickr.photos.search method
function search(){
	var query = document.getElementById("search-text").value;
	var src = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=bebcc5d7e73e38718107ccfc85c3e775&tags='+query+'&per_page=50';
	var resStr = xmlHttpGet(src);

	// Remove the entry of search from the session storage
	if(sessionStorage.length !== 0){
		sessionStorage.removeItem("search-results");
	}
	// Initialize the array every time you do a new search
	selectedImages = [];

	resJSON = JSON.parse(resStr);
	jsonFlickrApi(resJSON);
}

// When the user selects an image, then the image is highlighted
// If the image is already selected then the image is unhighlighted
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

// Creates a new gallery named by the user and stores all the data in
// session storage
function addGallery(){
	var gallery = new Gallery();

	if(selectedImages.length === 0){
		alert("No images have been selected!\nSelect some images and click the add button to create a new gallery!");
	}
	else {
		var exist = gallery.setKey();
		if(exist === 0){
			var value = sessionStorage.getItem("search-results");
			var jsonData = JSON.parse(value);
			var images = jsonData.images;
			var id, index, image;

			for(var i=0; i<selectedImages.length; i++){	
				id = selectedImages[i].toString();
				index = arrayObjectIndexOf(images, id, "id");
				image = images[index];
				gallery.images.push(image);
			}
			sessionStorage.setItem(gallery.getKey(), JSON.stringify(gallery));
			view.appendGallery(gallery.getKey());
		}
		else if(exist === 1){}
	}
}

// Triggers the fuction to show the images of the choosen gallery
function showGallery(){
	var galleryName = document.getElementById("galleries-menu").value;
	document.getElementById("images-container").innerHTML = '';
	view.showGalleryImages(galleryName);
}
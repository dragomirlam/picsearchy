function search(){
	var query = document.getElementById("search-text").value;
	var src = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=bebcc5d7e73e38718107ccfc85c3e775&tags='+query+'&per_page=50';
	var resStr = xmlHttpGet(src);
	var resJSON = JSON.parse(resStr);
	// console.log(resStr);
	jsonFlickrApi(resJSON);
}

var selectedImages = [];

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
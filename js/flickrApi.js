function jsonFlickrApi(res){
	var photosLength = res.photos.photo.length;
	var photos = res.photos.photo;
	var URLs = [];
	var href, img, image, imgBig, url, farm_id, server_id, photoId, secret;
	var modalWindow;

	document.getElementById("images-container").innerHTML = null;
	document.getElementById("modal-windows").innerHTML = null;

	var searchResults = {};

	searchResults.images = [];
	searchResults.key = "search-results";

	for(var i=0; i<photosLength; i++){
		var img = {};
		//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
		farm_id = photos[i].farm;
		server_id = photos[i].server;
		photoId = photos[i].id;
		secret = photos[i].secret;

		img.id = photos[i].id;
		img.s_url = 'https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+photoId+'_'+secret+'_s.jpg';
		img.q_url = 'https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+photoId+'_'+secret+'_q.jpg';
		img.b_url = 'https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+photoId+'_'+secret+'.jpg';
		searchResults.images.push(img);
		// img = '<a href="'+ b_url +'">'+'<img alt="'+ photos[i].title +'"src="'+ s_url +'"/>'+'</a>';
		image = '<img id="'+photoId+'" style="border: solid 2px #000000;" onclick="selectImg('+photoId+')" src="'+ img.q_url +'" class="img-space"/>';
		// href = '<a href="#'+photoId+'" id="pop">'+image+'</a>';
		// href = image;

		// imgBig = '<img alt="'+ photos[i].title +'"src="'+ b_url +'"/>';
		// modalWindow = '<a href="#" class="overlay" id="'+photoId+'"></a>'+
		// 			  '<div class="popup">'+
		// 			  imgBig+
		// 			  '<a class="close" href="#"></a>'+
		// 			  '</div>';
					  
		document.getElementById("images-container").innerHTML+= image;
		// document.getElementById("modal-windows").innerHTML+= modalWindow;
		sessionStorage.setItem(searchResults.key, JSON.stringify(searchResults));
		// console.log(imgURLs);
	}
}
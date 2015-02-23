function jsonFlickrApi(res){
	var photosLength = res.photos.photo.length;
	var photos = res.photos.photo;
	var URLs = [];
	var href, img, imgSmall, imgBig, url, farm_id, server_id, photo_id, secret;

	document.getElementById("images-container").innerHTML = null;
	document.getElementById("modal-windows").innerHTML = null;

	for(var i=0; i<photosLength; i++){
		//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
		farm_id = photos[i].farm;
		server_id = photos[i].server;
		photo_id = photos[i].id;
		secret = photos[i].secret;
		s_url = 'https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+photo_id+'_'+secret+'_s.jpg';
		b_url = 'https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+photo_id+'_'+secret+'.jpg';
		// img = '<a href="'+ b_url +'">'+'<img alt="'+ photos[i].title +'"src="'+ s_url +'"/>'+'</a>';
		imgSmall = '<img alt="'+ photos[i].title +'"src="'+ s_url +'" class="small-img"/>';
		href = '<a href="#'+photo_id+'" id="pop">'+imgSmall+'</a>';

		imgBig = '<img alt="'+ photos[i].title +'"src="'+ b_url +'"/>';
		modalWindow = '<a href="#x" class="overlay" id="'+photo_id+'"></a>'+
					  '<div class="popup">'+
					  imgBig+
					  '<a class="close" href="#close"></a>'+
					  '</div>'
		document.getElementById("images-container").innerHTML+= href;
		document.getElementById("modal-windows").innerHTML+= modalWindow;
	}
}
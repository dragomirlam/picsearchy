var Img = function(id, farm, server, secret){
	this.id = id;
	this.farm = farm;
	this.server = server;
	this.secret = secret;
	this.s_url = null;
	this.q_url = null;
	this.b_url = null;
};

// Create a url based on the input type
Img.prototype.createImgUrl = function(type){
	var url;
  if(type === "b"){
		url = 'https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'.jpg';
	} else {
		url = 'https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'_'+type+'.jpg';
	}
	this.setImgUrl(url, type);
};

// Returns a url based on the input type
Img.prototype.getImgUrl = function(type){
	if(type === "s"){
		return this.s_url;
	}
	if(type === "q"){
		return this.q_url;
	}
	if(type === "b"){
		return this.b_url;
	}
};

// Sets a url based on the input type
Img.prototype.setImgUrl = function(url, type){
	if(type === "s"){
		this.s_url = url;
	}
	if(type === "q"){
		this.q_url = url;	
	}
	if(type === "b"){
		this.b_url = url;
	}
};
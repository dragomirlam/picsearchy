var Image = function(id, farm, server, secret){
	this.id = id;
	this.farm = farm;
	this.server = server;
	this.secret = secret;
	this.s_url;
	this.q_url;
	this.b_url;
};

Image.prototype.createImgUrl = function(type){
	if(type === "b"){
		url = 'https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'.jpg';
	} else {
		url = 'https://farm'+this.farm+'.staticflickr.com/'+this.server+'/'+this.id+'_'+this.secret+'_'+type+'.jpg';
	}
	this.setImgUrl(url, type);
};

Image.prototype.getImgUrl = function(type){
	if(type === "s"){
		return this.s_url;
	}
	if(type === "q"){
		return this.q_url;
	}
	if(type === "b"){
		return this.b_url;
	}
}

Image.prototype.setImgUrl = function(url, type){
	if(type === "s"){
		this.s_url = url;
	}
	if(type === "q"){
		this.q_url = url;	
	}
	if(type === "b"){
		this.b_url = url;
	}
}
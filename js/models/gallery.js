var Gallery = function(){
	this.key = null;
	this.images = [];
};

// Checks the availability of the name that the user gives to the gallery
// If the name is available it stores the given input
Gallery.prototype.setKey = function(){
	var key = prompt("Please enter a name for the gallery!");

	if(sessionStorage.length === 1){
		this.key = key;
		return 0;
	}
	else{
		var i;
		for(i=0; i<sessionStorage.length; i++){
			if(sessionStorage.key(i) === key){
				alert("Gallery with the name "+key+" already exists!\nUse another name!");
				return 1;
			}
		}
		if(i === sessionStorage.length){
			this.key = key;
			return 0;
		}
	}
};

// Returns the key/name of the gallery
Gallery.prototype.getKey = function(){
	return this.key;
};
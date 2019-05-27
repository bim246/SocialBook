import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../lib/collections.js';
import './main.html';

Template.Profile.helpers({
	profAll(){
		return userDB.find({});
	}
});

Template.addprofile.events({
	'click .js-savebtn'(event, instance){
		var fName = $("#exampleModal input[name='firstName']").val();
		var lName = $("#exampleModal input[name='lastName']").val();
		var pName = $("#exampleModal input[name='ImageName']").val();
		var pName2 = $("#exampleModal input[name='ImageName2']").val();
		 $("#exampleModal input[name='firstName']").val("");
		 $("#exampleModal input[name='lastName']").val("");
		 $("#exampleModal input[name='ImageName']").val("");
		 $("#exampleModal input[name='ImageName2']").val("");
		$("#exampleModal").modal("hide");
		userDB.insert({'firstName':fName, 'lastName': lName, 'ImageName':pName,'ImageName2':pName2});

	}   
	
	
});



Template.Profile.events({
	'click .js-editsave'(event){
		var idval = this._id;
		var fName = $("#editModal input[name='firstName']").val();
		var lName = $("#editModal input[name='lastName']").val();
		var pName = $("#editModal input[name='ImageName']").val();
		var pName2 = $("#editModal input[name='ImageName2']").val();
		$("#editModal").modal("hide");
		userDB.update({'_id':idval}, {$set:{'firstName':fName, 'lastName': lName, 'ImageName':pName,'ImageName2':pName2}});
	},

	//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ0GyaLF10DpOIvcH1RKcQbGYIw62kZhs8vOYd8E1PeZc2iafKjg
	'click .js-info'(event, instance){
		var uId = this._id;
		$("#editModal input[name='firstName']").val(userDB.findOne({_id: uId}).firstName);
		$("#editModal input[name='lastName']").val(userDB.findOne({_id: uId}).lastName);
		$("#editModal input[name='ImageName']").val(userDB.findOne({_id: uId}).ImageName);
		$("#editModal input[name='ImageName2']").val(userDB.findOne({_id: uId}).ImageName2);
		$("#editModal").modal("show");
	},
	
	'click .js-like'(event, instance){
		console.log("You clicked like");
		var profId = this._id;
		var numLikes = userDB.findOne({_id: profId}).like;
		if(!numLikes){
			numLikes = 0;
		}
		numLikes = numLikes + 1;
		userDB.update({'_id':profId}, {$set:{'like':numLikes}});
	},
	'click .js-dislike'(event,instance){
		 console.log("You clicked dislike");
		var profId = this._id;
		var numdislikes = userDB.findOne({_id: profId}).dislikes;
		if(!numdislikes){
			numdislikes = 0;
		}
		numdislikes = numdislikes + 1;
		userDB.update({_id:profId}, {$set:{'dislikes':numdislikes}});
	},
	'click .js-delete'(event,instance){
		var profId = this._id;
		$('#'+ profId).fadeOut('slow',function(){
			userDB.remove({_id: profId});
		});			
	}
}); 
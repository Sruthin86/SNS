$(document).ready(function() {
	
	 
	 console.log("ready")
	
	 
	 //view template
	

});



//console.log(nM);

var counter = 0;
(function($){
	 Parse.$ = jQuery;	
	 var nameArray ;
//	 var objAvgArray = [
//	              {objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},
//	              {objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},
//	              {objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},
//	              {objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""}
//	          ];
	 
	 var objAvgArray = [
	  	              {objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""},{objId: "", avg: ""}
	  	              
	  	          ];
	// Initialize Parse with your Parse application javascript keys
	  Parse.initialize("qkZItOzvxtaBs1ugMv4AnM3EGAUOE6rPl01dak6Q",
	                   "YXo3aSbpHrC5Ate2FLK1qcsK7dLhdKFZL1FKAJWe");
	  
	  
	  
var nameModel = Backbone.Model.extend({
		defaults: function(){
			return{
				userName: "",
				name: "",
				img:"",
				count:""
		}
		}
	});
var intentionView = Backbone.View.extend({
	el: $('body'),
	model: new nameModel(),
	events: {
			'click #intensionStrengthNext': 'nextButton',
		},

	 initialize: function() {
		 var self = this;
		 _.bindAll(this, 'render');
		 this.template = _.template($('#intensionStrength-template').html());
		 this.getStatus();
		 
		 this.model.on('change',this.render);
		 //this.render();
		
	 },
	 nextButton: function(e) {
		 e.preventDefault();
		 var thisView = this;
		 var Q1 = $('#Q1 input:radio:checked').val();
			var Q2 = $('#Q2 input:radio:checked').val();
			var Q3 = $('#Q3 input:radio:checked').val();
			
			if(!(Q1 || Q2 || Q3)){
				alert("please answer all the questions");
			}
			else{
			var avg = (parseInt(Q1)+parseInt(Q2)+parseInt(Q3))/3;
			var intentionStrengthObject = Parse.Object.extend("intentionStrengthClass");
			var intentionstrengthobject = new intentionStrengthObject();
			  intentionstrengthobject.set("Name", thisView.model.get("userName"));
			  intentionstrengthobject.set("friendName", thisView.model.get("name"));
			  intentionstrengthobject.set("Q1", Q1);
			  intentionstrengthobject.set("Q2", Q2);
			  intentionstrengthobject.set("Q3", Q3);
			 
			  intentionstrengthobject.set("avg", avg);
			  

			  intentionstrengthobject.save(null, {
			    success: function(gameScore) {
			      // Execute any logic that should take place after the object is saved.
			      console.log('New object created with objectId: ' + intentionstrengthobject.id);
			      
			      objAvgArray[counter].objId = intentionstrengthobject.id;
			      objAvgArray[counter].avg = avg.toString();
			      console.log("objAvgArray");
			      console.log(objAvgArray);
			      counter = counter + 1;
			      if(counter == 6){
			    	  $.ajax({
			    	 		url : "getObjIdandAvg",
			    	 		type : "POST",
			    	 		dataType: 'json',
			    	 		data:{ 
			    	 			ObjAvgArray: JSON.stringify(objAvgArray) // look here!
			    			    },
			    	 			success: function(data){
			    	 				if(data){
			    	 					console.log(data);
			    	 					window.location.href = "/MSUExerGame/FBIntroduction.html" 
			    	 				}
			    	 				else {
			    	 					alert("Data Not Valid")
			    	 				}
			    	 			}
			    	 		
			    	 	});
			    	  
			      }
			      else {
				    var params = {
				    	    "count": counter
				    	};
				    //params['counter'] = counter;
				     $.ajax({
				    		url : "getIntensionInfo",
				    		type : "GET",
				    		dataType: 'json',
				    		data : params,
				    			success: function(data){
				    				if(data){
				    					nameArray = data
				    					counter = nameArray["count"];
				    					thisView.model.set({userName :nameArray["userName"], name : nameArray["name"],img : nameArray["img"], count : nameArray["count"]});
				    					
				    					//var nM = new nameModel({name: "",count: ""});	
				    				}
				    				else {
				    					alert("Data Not Valid")
				    				}
				    			}
				    		
				    	});
			    	}
			    },
			    error: function(gameScore, error) {
			      // Execute any logic that should take place if the save fails.
			      // error is a Parse.Error with an error code and message.
			      alert('Failed to create new object, with error code: ' + error.message);
			    }
			  });
			  
			  
			}
			  
		    
		   
	  },
	 getStatus : function() {
		    var thisView = this;
		    var nameArray ;
		   
		    //var params = {};
		    var params = {
		    	    "count": counter
		    	};
		    //params['counter'] = counter;
		     $.ajax({
		    		url : "getIntensionInfo",
		    		type : "GET",
		    		dataType: 'json',
		    		data : params,
		    			success: function(data){
		    				if(data){
		    					console.log("load");
		    					console.log(data)
		    					nameArray = data
		    					counter = nameArray["count"];
		    					thisView.model.set({userName :nameArray["userName"] , name : nameArray["name"],img : nameArray["img"], count : nameArray["count"]});
		    					
		    					//var nM = new nameModel({name: "",count: ""});	
		    				}
		    				else {
		    					alert("Data Not Valid")
		    				}
		    			}
		    		
		    	});
	},
	 render: function(){
		 var thisView = this;
		 $(this.el).html(this.template(this.model.toJSON()));
		 return this;
	 }
});

var intentionView = new intentionView();



})(jQuery);




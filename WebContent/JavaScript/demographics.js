$(document).ready(function() {
	 console.log("tie ready")
	
});

(function($){
	 Parse.$ = jQuery;	
	 Parse.initialize("qkZItOzvxtaBs1ugMv4AnM3EGAUOE6rPl01dak6Q",
     "YXo3aSbpHrC5Ate2FLK1qcsK7dLhdKFZL1FKAJWe");
	var manuModel = Backbone.Model.extend({
		defaults: function(){
			return{
		
				name: "",
				img:"",
				randNum:""
				
		}
		}
	});
	
	var userName;
	var manuplationView = Backbone.View.extend({
		el: $('body'),
		model: new manuModel(),
		events: {
				'click #intensionStrengthNext': 'nextButton',
			},

		 initialize: function() {
			 var self = this;
			 _.bindAll(this, 'render');
			 this.template = _.template($('#demographics-template').html());
			
			 this.getUserName();
			 this.model.on('change',this.render);
			 this.render();
			
		 },
		 getUserName: function(){
			    var thisView = this;
			    var nameArray ;
			   
			    //var params = {};
			    var params = {
			    	    "count": 1
			    	};
			    //params['counter'] = counter;
			     $.ajax({
			    		url : "getUserName",
			    		type : "GET",
			    		dataType: 'json',
			    		data : params,
			    			success: function(data){
			    				if(data){
			    					userName = data.userName
			    				}
			    				else {
			    					alert("Data Not Valid")
			    				}
			    			}
			    		
			    	});
		},
		 nextButton: function(e) {
			 e.preventDefault();
			 var thisView = this;
			 	var Q1 = $('#Q1 input:radio:checked').val();
				var Q2 = $('#Q2 input:radio:checked').val();
				
				if(!(Q1 || Q2 )){
					alert("please answer all the questions");
				}
				else{
					
					var demographicsObject = Parse.Object.extend("DemographicsClass");
					var demographicsobject = new demographicsObject();
					demographicsobject.set("Name", userName);
					demographicsobject.set("Q1", Q1);
					demographicsobject.set("Q2", Q2);
					  

					demographicsobject.save(null, {
					    success: function(gameScore) {
					    	 console.log('New object created with objectId: ' + demographicsobject.id);
					    	 window.location.href = "/MSUExerGame/goodbye.html"
					    },
					    error: function(gameScore, error) {
						      // Execute any logic that should take place if the save fails.
						      // error is a Parse.Error with an error code and message.
						      alert('Failed to create new object, with error code: ' + error.message);
						}
					  });
				}
			 
		 },
		 
		 render: function(){
			 var thisView = this;
			 $(this.el).html(this.template(this.model.toJSON()));
			 return this;
		 }
	});
	var manuplationView = new manuplationView();
	
})(jQuery);
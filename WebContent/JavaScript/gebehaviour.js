$(document).ready(function() {
	 console.log("tie ready")
	
});
var userName;
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
	
	
	var gebehaviourView = Backbone.View.extend({
		el: $('body'),
		model: new manuModel(),
		events: {
				'click #intensionStrengthNext': 'nextButton',
			},

		 initialize: function() {
			 var self = this;
			 _.bindAll(this, 'render');
			 this.template = _.template($('#gebehaviour-template').html());
			
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
			 	var Q1 = $('#se').val();
			 	var Q2 = $('#me').val();
			 	var Q3 = $('#mle').val();
			 	var Q4 = $('#Q2 input:radio:checked').val();
				
				
				if(!(Q1 || Q2 || Q3 || Q4)){
					alert("please answer all the questions");
				}
				else{
					
					var gebehaviourObject = Parse.Object.extend("gebehaviourClass");
					var gebehaviourobject = new gebehaviourObject();
					gebehaviourobject.set("Name", userName);
					gebehaviourobject.set("strenuousexercise", Q1);
					gebehaviourobject.set("moderateexercise", Q2);
					gebehaviourobject.set("mildexercise", Q3);
					gebehaviourobject.set("Q2", Q4);
					  

					gebehaviourobject.save(null, {
					    success: function(gameScore) {
					    	 console.log('New object created with objectId: ' + gebehaviourobject.id);
					    	 window.location.href = "/MSUExerGame/intensionStrength.html"
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
	var gebehaviourView = new gebehaviourView();
	
})(jQuery);
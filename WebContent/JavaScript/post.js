$(document).ready(function() {
	 console.log("post ready")
	
});
var randNum = 0;
(function($){
	 Parse.$ = jQuery;	
	 Parse.initialize("qkZItOzvxtaBs1ugMv4AnM3EGAUOE6rPl01dak6Q",
     "YXo3aSbpHrC5Ate2FLK1qcsK7dLhdKFZL1FKAJWe");
	var tieModel = Backbone.Model.extend({
		defaults: function(){
			return{
		
				userName: "",
				name: "",
				img:"",
				randNum:""
				
		}
		}
	});
	
	
	var tieView = Backbone.View.extend({
		el: $('body'),
		model: new tieModel(),
		events: {
				'click #intensionStrengthNext': 'nextButton',
			},

		 initialize: function() {
			 var self = this;
			 _.bindAll(this, 'render');
			 this.template = _.template($('#post-template').html());
			 this.getStatus();
			 
			 this.model.on('change',this.render);
			 //this.render();
			
		 },
		 nextButton: function(e) {
			 e.preventDefault();
			 window.location.href = "/MSUExerGame/tieStrength.html"
			 
		 },
		 getStatus : function() {
			    var thisView = this;
			    var counter = 0;
			    var params = {
			    	    "count": counter
			    	};
			    $.ajax({
			 		url : "getObjIdandAvg",
			 		type : "GET",
			 		dataType: 'json',
			 		data: params,
			 			success: function(data){
			 				if(data){
			 					randNum = data.randNum;
			 					thisView.model.set({userNmae :data.userNmae ,name : data.name,img : data.img, randNum : data.randNum});
			 					
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
	var tieView = new tieView();
	
})(jQuery);
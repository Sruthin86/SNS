$(document).ready(function() {
	 console.log("tie ready")
	
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
			 this.template = _.template($('#tieStrength-template').html());
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
				var Q4 = $('#Q4 input:radio:checked').val();
				var Q5 = $('#Q5 input:radio:checked').val();
				if(!(Q1 || Q2 || Q3 || Q4 || Q1)){
					alert("please answer all the questions");
				}
				else{
					var avg = (parseInt(Q1)+parseInt(Q2)+parseInt(Q3)+parseInt(Q4)+parseInt(Q5))/5;
					var tieStrengthObject = Parse.Object.extend("tieStrengthClass");
					var tiestrengthobject = new tieStrengthObject();
					tiestrengthobject.set("Name", thisView.model.get("userName"));
					tiestrengthobject.set("friendName", thisView.model.get("name"));
					tiestrengthobject.set("Q1", Q1);
					tiestrengthobject.set("Q2", Q2);
					tiestrengthobject.set("Q3", Q3);
					tiestrengthobject.set("Q4", Q4);
					tiestrengthobject.set("Q5", Q5);
					tiestrengthobject.set("avg", avg); 
					tiestrengthobject.set("conditionNumber", randNum); 

					tiestrengthobject.save(null, {
					    success: function(gameScore) {
					    	 console.log('New object created with objectId: ' + tiestrengthobject.id);
					    	 window.location.href = "/MSUExerGame/AttitideIntention.html"
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
			 					thisView.model.set({userName :data.userName ,name : data.name,img : data.img, randNum : data.randNum});
			 					
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
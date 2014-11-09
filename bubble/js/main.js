requirejs.config({
	baseUrl: 'vendor/',
    paths: {
		jquery: 'jquery/jquery.min',
		backbone: 'backbone/backbone',
		underscore: 'underscore/underscore'
	},
    shim: {
        'backbone': {
            deps: ['jquery', 'underscore']
        }      
    }
});

require([
    'jquery',
    'backbone',
    'underscore'
], function() {
    var app = app || {};
    /**
     * view
    **/
    app.gameView = Backbone.View.extend({
        el: '#gameBoard',
        events: {
            'click #draw': 'touchEvent'
        },
        initialize: function() {
            var self = this;
			setInterval(function() {
  				self.playRound();
			}, 1000);
        },
        playRound: function() {
            //var d = new Date();
    		//var t = d.toLocaleTimeString();
    		//this.$el.find('#time').html(t);
    		
    		var canvas = this.$el.find('#draw')[0];
            var ctx = canvas.getContext("2d");
            var background = this.$el.find('#game')[0],
                rect = background.getBoundingClientRect();
            
            canvas.width = rect.width;
            canvas.height = rect.width;

            maxWidth = rect.width;
            maxHeight = rect.height;
            maxR = (rect.height > rect.width) ? rect.width / 2 : rect.height / 2;

            ballX = Math.floor(Math.random() * maxWidth);
            ballY = Math.floor(Math.random() * maxHeight);
            ballR = Math.floor(Math.random() * maxR) + 30;

            ctx.beginPath();
            ctx.fillStyle = '#33CCFF';
            ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2, true);
            ctx.fill();
            
            //light line
            ctx.beginPath() ;
            ctx.shadowColor = "33CCFF" ;
            ctx.lineCap = "round";
            ctx.arc(ballX, ballY, ballR / 1.5, 1 * Math.PI, 1.2 * Math.PI, false) ;
            ctx.lineWidth = ballR / 5;
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();

            //light point
            ctx.beginPath() ;
            ctx.lineCap = "round";
            ctx.arc(ballX, ballY, ballR / 1.5, 1.3 * Math.PI, 1.32 * Math.PI, false) ;
            ctx.lineWidth = ballR / 5;
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();
            
        },
        touchEvent: function(evt) {
            var x1, 
                x2,
                y1,
                y2;

            // 四個角
            x1 = ballX - ballR;
            x2 = ballX + ballR;		
            y1 = ballY - ballR;
            y2 = ballY + ballR;

            // 是否擊中
            if ((evt.clientX > x1) && (evt.clientX < x2)) {
                if ((evt.clientY > y1) && (evt.clientY < y2)) {
                    this.$el.find("#header").css('display', 'none');
                    this.$el.find('#header').html('<h2>打到了</h2>');
                    this.$el.find("#header").fadeIn(500);
                    this.$el.find("#header").fadeOut(500);
                }
            }
        
        }
    });
    
    $(document).ready(function(){
        app.gameView = new app.gameView();
    });
    
});
requirejs.config({
	baseUrl: 'bower_components/',
    paths: {
		jquery: 'jquery/dist/jquery.min',
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
        el: '#board',
        play: 'me',
        events: {
            'click .grid': 'playRound'
        },
        changePlayer: function() {
            if (this.player === 'me') this.player = 'you';
		    else this.player = 'me';
        },
        playRound: function(number) {
            if (this.player === 'me') {
				this.$el.find(number.target).html("O");
			} else {
                this.$el.find(number.target).html("X");
			}
            this.changePlayer();
            
            console.log(number.target);
        }
    });
  
    $(document).ready(function(){
        app.gameView = new app.gameView();
    });
    
});
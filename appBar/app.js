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
        el: '#listView',
        events: {
            'click #menu': 'openMenu'
        },
        openMenu: function() {
            this.$el.find("#list").toggleClass("open");
            this.$el.find("#bar").toggleClass("open");
            
            if(this.$el.find(".navdrawer-container").hasClass("open")) {
              this.$el.find("#fa").removeClass("fa-bars").addClass("fa-close");
            } else {
              this.$el.find("#fa").removeClass("fa-close").addClass("fa-bars");
            }
        }
    });
  
    $(document).ready(function(){
        app.gameView = new app.gameView();
    });
    
});
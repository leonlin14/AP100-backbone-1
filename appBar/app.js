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
            if(this.$el.find(".navdrawer-container").hasClass("open")) {
              this.$el.find("#list").removeClass("open");
              this.$el.find("#bar").removeClass("open");
              
            } else {
              this.$el.find("#list").addClass("open");
              this.$el.find("#bar").addClass("open");
            }
        }
    });
  
    $(document).ready(function(){
        app.gameView = new app.gameView();
    });
    
});
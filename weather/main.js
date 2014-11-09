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
     * module
    **/
    app.PostItem = Backbone.Model.extend({
	  url: function() {
        return 'http://api.openweathermap.org/data/2.5/weather?q=London';
      },
	  defaults: {
		 "weather": [
            {
                "id": 520,
                "main": "Rain",
                "description": "light intensity shower rain",
                "icon": "09n"
            }
        ],
	    "main": {
            "temp": 282.26,
            "pressure": 1001,
            "humidity": 100,
            "temp_min": 281.15,
            "temp_max": 283.15
        },
	    "name": "City"
	  }
	});
    
    
    /**
     * view
    **/
    app.PostItemView = Backbone.View.extend({
        el: '#weatherApp',
        initialize: function() {
            //alert('hello');
            var self = this;
            this.model = new app.PostItem();
            this.template = _.template($('#weatherData').html());
           
            this.model.fetch({
                success: function(model) {
                    console.log(model);
                    self.model.set('defaults', model);
                }
            });
            
            this.model.bind('change', this.render, this);
        },
        render: function() {
            var htmlCodes = this.template(this.model.attributes);
            this.$el.html(htmlCodes);
        }
    });

    $(document).ready(function() {
	  app.PostItemView = new app.PostItemView();
	});
    
});
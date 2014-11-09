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
        return 'http://api.randomuser.me';
      },
	  defaults: {
        "results": [
            {
                "user": {
                    "gender": "female",
                    "name": {
                        "title": "mrs",
                        "first": "bernice",
                        "last": "obrien"
                    },
                    "location": {
                        "street": "4350 w belt line rd",
                        "city": "desoto",
                        "state": "south dakota",
                        "zip": "89713"
                    },
                    "email": "bernice.obrien83@example.com",
                    "username": "heavypanda586",
                    "password": "lonesome",
                    "salt": "3a0ti77g",
                    "md5": "bd263bd8b4a2b6307370d20915d70aeb",
                    "sha1": "bbd4ceb97d840b87f9692bd2d49cbf78f568a331",
                    "sha256": "59f5fc71679432fe2d9ff10f69d1956c1e3aecdddb54276649f1bd15590a1a6d",
                    "registered": "988862831",
                    "dob": "122312980",
                    "phone": "(376)-808-4045",
                    "cell": "(918)-344-7426",
                    "SSN": "458-57-1852",
                    "picture": {
                        "large": "http://api.randomuser.me/portraits/women/32.jpg",
                        "medium": "http://api.randomuser.me/portraits/med/women/32.jpg",
                        "thumbnail": "http://api.randomuser.me/portraits/thumb/women/32.jpg"
                    },
                    "version": "0.4.1"
                },
                "seed": "c3da3619df020c84"
            }
        ]
	  }
	});
    
    
    /**
     * view
    **/
    app.PostItemView = Backbone.View.extend({
        el: '#personalApp',
        initialize: function() {
            var self = this;
            this.model = new app.PostItem();
            this.template = _.template($('#personalData').html());
           
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
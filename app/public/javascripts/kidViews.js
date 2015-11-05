///////////////////////////////////////
///////////KID VIEWS//////////////
///////////////////////////////////////

//var addKidTemplate = require('./addKid.hbs');

var KidView = Backbone.View.extend({
    tagName: 'li',

    el: '.kidList',
    events: {
        'click .addKid': 'addKid'
        //Click submit: send form//
        //Click cancel: close window, clear form// (destroy?)
        //Click addChild: send form then reset to new child//
    },
    addKid: function () {
        console.log('adding kid');
    },

    initialize: function () {
        this.listenTo(this.collection, "add", this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
        console.log("KidView is rendering");

        var source = $("#profile-template").html();

        var template = Handlebars.compile(source);

        this.$el.html(template);

        //var kidFirstName = this.model.get("kidFirstName");
        //var kidMidInitial = this.model.get("kidMidInitial");
        //var kidLastName = this.model.get("kidLastName");
        //var kidFullName = kidFirstName + " " + kidMidInitial + " " + kidLastName;
        //var kidCollection = new KidsCollection();
        //var kidsModel = new KidsModel({addedKids: kidFullName});
        //var addedKidView = new addKidView({model: KidsModel, collection: KidsCollection});
        //addedKidView.render();
        //$("#kidList").append(createKidView.$el);
        ////ADD KIDFULLNAME to KIDS ARRAY {};
    }
});




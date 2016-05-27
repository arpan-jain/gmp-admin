/**
 * Created by arpan on 26/05/16.
 */

var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('GetMyParking Admin')
        .baseApiUrl('http://jsonplaceholder.typicode.com/'); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id
    var user = nga.entity('users');
    // set the fields of the user entity list view
    user.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('name').isDetailLink(true),
        nga.field('username'),
        nga.field('email')
    ]);

    user.creationView().fields([
        nga.field('name'),
        nga.field('username'),
        nga.field('email', 'email'),
        nga.field('address.street').label('Street'),
        nga.field('address.city').label('City'),
        nga.field('address.zipcode').label('Zipcode'),
        nga.field('phone'),
        nga.field('website')
    ]);
// use the same fields for the editionView as for the creationView
    user.editionView().fields(user.creationView().fields());

    // add the user entity to the admin application
    admin.addEntity(user);


    var post = nga.entity('posts');

    post.listView()
        .fields([
            nga.field('id'),
            nga.field('title'),
            nga.field('userId', 'reference')
                .targetEntity(user)
                .targetField(nga.field('username'))
                .label('User')
        ]).filters([
        nga.field('q')
            .label('Full-Text')
            .pinned(true),
        nga.field('userId', 'reference')
            .targetEntity(user)
            .targetField(nga.field('username'))
            .label('User')
    ]);

    post.showView().fields([
        nga.field('title'),
        nga.field('body', 'text'),
        nga.field('userId', 'reference')
            .targetEntity(user)
            .targetField(nga.field('username'))
            .label('User'),
        nga.field('comments', 'referenced_list')
            .targetEntity(nga.entity('comments'))
            .targetReferenceField('postId')
            .targetFields([
                nga.field('email'),
                nga.field('name')
            ])
            .sortField('id')
            .sortDir('DESC'),
    ]);


    //post.readOnly();

    admin.addEntity(post);

    nga.configure(admin);
}]);

/*myApp.config(['RestangularProvider', function (RestangularProvider) {

    
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
        if (operation == "getList") {
            console.log(url);
            console.log(response);
            var contentRange = response.headers('Content-Range');
            response.totalCount = contentRange.split('/')[1];
        }
        return data;
    });
}]);*/
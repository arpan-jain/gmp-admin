/**
 * Created by arpan on 26/05/16.
 */

var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('GetMyParking Admin')
        .baseApiUrl('http://dev.api.getmyparking.com:5000/api/v1/'); // main API endpoint
    // create a user entity
    // the API endpoint for this entity will be 'http://jsonplaceholder.typicode.com/users/:id

    //Companies Entity

    // add entities to admin app
    admin.addEntity(nga.entity('Companies'));
    admin.addEntity(nga.entity('Parkings'));
    admin.addEntity(nga.entity('ParkingLots'));
    admin.addEntity(nga.entity('ParkingSubLots'));
    admin.addEntity(nga.entity('PricingSlots'));
    admin.addEntity(nga.entity('PriceGrids'));
    admin.addEntity(nga.entity('ReceiptContents'));
    admin.addEntity(nga.entity('FocReasons'));



    var companies = admin.getEntity('Companies').identifier(nga.field('id'));
    var parkings = admin.getEntity('Parkings');
    var parkingLots = admin.getEntity('ParkingLots');
    var parkingSubLots = admin.getEntity('ParkingSubLots');
    var pricingSlots = admin.getEntity('PricingSlots');
    var priceGrids = admin.getEntity('PriceGrids');
    var receiptContents = admin.getEntity('ReceiptContents');
    var focReasons = admin.getEntity('FocReasons').identifier(nga.field('reasonTitle'));


    // set the fields of the user entity list view
    companies.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('name'),
        nga.field('address'),
        nga.field('city'),
        nga.field('email'),
        nga.field('contactNumber'),
        nga.field('website'),
        nga.field('contracted')
        /*nga.field('parkings', 'referenced_list') // display list of related comments
         .targetEntity(parkings)
         .targetReferenceField('companyId')
         .targetFields([
         nga.field('id').label('ParkingId'),
         nga.field('name').label('ParkingName')
         ])/*
         .sortField('id')
         .sortDir('DESC')
         .listActions(['edit'])*/
    ]);


    companies.creationView().fields([
        nga.field('name'),
        nga.field('address'),
        nga.field('city'),
        nga.field('email','email'),
        nga.field('contactNumber'),
        nga.field('website'),
        nga.field('contracted')
    ]);
    // use the same fields for the editionView as for the creationView
    companies.editionView().fields([companies.creationView().fields(),
        nga.field('parkings', 'referenced_list')
            .targetEntity(parkings)
            .targetReferenceField('companyId')
            .targetFields([
                nga.field('id').label('ParkingId'),
                nga.field('name').label('ParkingName')
            ])
            .sortField('id')
            .sortDir('DESC')
            .listActions(['edit'])
    ]);

    // add the user entity to the admin application
    //admin.addEntity(companies);



    //Parkings Entity


    // set the fields of the user entity list view
    parkings.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('name'),
        nga.field('address'),
        nga.field('city'),
        nga.field('contactNumber'),
        nga.field('companyId'),
        nga.field('category'),
        nga.field('landmark'),
        nga.field('createdBy'),
        nga.field('updatedBy')
    ]);



    parkings.creationView().fields([
        nga.field('name'),
        nga.field('address'),
        nga.field('city'),
        nga.field('contactNumber'),
        nga.field('companyId'),
        nga.field('category'),
        nga.field('landmark'),
        nga.field('createdBy'),
        nga.field('updatedBy')
    ]);
    // use the same fields for the editionView as for the creationView
    parkings.editionView().fields([
        parkings.creationView().fields(),
        nga.field('parkingLots', 'referenced_list') // display list of related comments
            .targetEntity(parkingLots)
            .targetReferenceField('parkingId')
            .targetFields([
                nga.field('id').label('ParkingLotId'),
                nga.field('name').label('ParkingLotName')
            ])
            .sortField('id')
            .sortDir('DESC')
            .listActions(['edit'])
    ]);

    // add the user entity to the admin application




    //ParkingLots Entity


    // set the fields of the user entity list view
    parkingLots.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('name'),
        nga.field('openTime'),
        nga.field('closeTime'),
        nga.field('parkingId'),
        nga.field('leftPhoto'),
        nga.field('rightPhoto'),
        nga.field('frontPhoto'),
        nga.field('parkingType'),
        nga.field('parkingOwner'),
        nga.field('collectionAt'),
        nga.field('avgParkingWeekday'),
        nga.field('avgParkingWeekend'),
        nga.field('ticketingSystem'),
        nga.field('extraNotes'),
        nga.field('geoLocation.lat'),
        nga.field('geoLocation.lng')
    ]);

    parkingLots.creationView().fields([
        nga.field('name'),
        nga.field('openTime'),
        nga.field('closeTime'),
        nga.field('parkingId'),
        nga.field('leftPhoto'),
        nga.field('rightPhoto'),
        nga.field('frontPhoto'),
        nga.field('parkingType'),
        nga.field('parkingOwner'),
        nga.field('collectionAt'),
        nga.field('avgParkingWeekday'),
        nga.field('avgParkingWeekend'),
        nga.field('ticketingSystem'),
        nga.field('extraNotes'),
        nga.field('geoLocation.lat'),
        nga.field('geoLocation.lng')
    ]);
    // use the same fields for the editionView as for the creationView
    parkingLots.editionView().fields([parkingLots.creationView().fields(),
        nga.field('parkingSubLots', 'referenced_list') // display list of related comments
            .targetEntity(parkingSubLots)
            .targetReferenceField('parkingLotId')
            .targetFields([
                nga.field('id').label('ParkingSubLotId'),
                nga.field('type').label('ParkingSubLotType'),
                nga.field('capacity').label('ParkingSubLotCapacity')
            ])
            .sortField('id')
            .sortDir('DESC')
    ]);

    // add the user entity to the admin application
    //admin.addEntity(parkingLots);



    // ParkingSubLots Entity


    // set the fields of the user entity list view
    parkingSubLots.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('type'),
        nga.field('capacity'),
        nga.field('taxiTime'),
        nga.field('autoCheckoutTime'),
        nga.field('autoCheckoutCost'),
        nga.field('parkingLotId'),
        nga.field('bookingSecurity'),
        nga.field('convenienceFee'),
        nga.field('bookingNotes'),
        nga.field('plateNumberType'),
        nga.field('mobileRequired'),
        nga.field('valetName'),
        nga.field('lastCheckinUpdateTime'),
        nga.field('insidePhoto'),
        nga.field('lostTicketFee')

    ]);

    parkingSubLots.creationView().fields([
        nga.field('type'),
        nga.field('capacity'),
        nga.field('taxiTime'),
        nga.field('autoCheckoutTime'),
        nga.field('autoCheckoutCost'),
        nga.field('parkingLotId'),
        nga.field('bookingSecurity'),
        nga.field('convenienceFee'),
        nga.field('bookingNotes'),
        nga.field('plateNumberType'),
        nga.field('mobileRequired'),
        nga.field('valetName'),
        nga.field('lastCheckinUpdateTime'),
        nga.field('insidePhoto'),
        nga.field('lostTicketFee')
    ]);
    // use the same fields for the editionView as for the creationView
    parkingSubLots.editionView().fields([parkingSubLots.creationView().fields(),
        nga.field('receiptContents', 'referenced_list') // display list of related comments
            .targetEntity(receiptContents)
            .targetReferenceField('parkingSubLotId')
            .targetFields([
                nga.field('id').label('receiptContentId'),
                nga.field('content').label('receiptContentContent')
            ])
            .sortField('id')
            .sortDir('DESC'),
        nga.field('pricingSlots', 'referenced_list') // display list of related comments
            .targetEntity(pricingSlots)
            .targetReferenceField('parkingSubLotId')
            .targetFields([
                nga.field('id').label('PricingSlotId'),
                nga.field('day').label('PricingSlotDay'),
                nga.field('startMinutesOfDay').label('pricingSlotsStartMinutesOfDay'),
                nga.field('endMinutesOfDay').label('pricingSlotSendMinutesOfDay')
            ])
    ]);

    // add the user entity to the admin application
    // admin.addEntity(parkingSubLots);



    //PricingSlots Entity


    // set the fields of the user entity list view
    pricingSlots.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('day'),
        nga.field('startMinutesOfDay'),
        nga.field('endMinutesOfDay'),
        nga.field('parkingSubLotId'),
        nga.field('type')
    ]);

    pricingSlots.creationView().fields([
        nga.field('day'),
        nga.field('startMinutesOfDay'),
        nga.field('endMinutesOfDay'),
        nga.field('parkingSubLotId'),
        nga.field('type')
    ]);
    // use the same fields for the editionView as for the creationView
    pricingSlots.editionView().fields([pricingSlots.creationView().fields(),
        nga.field('priceGrids', 'referenced_list') // display list of related comments
            .targetEntity(priceGrids)
            .targetReferenceField('pricingId')
            .targetFields([
                nga.field('id').label('priceGrids.id'),
                nga.field('priceStructure').label('priceGrids.priceStructure'),
                nga.field('cost').label('priceGrids.cost')
            ])
            .sortField('id')
            .sortDir('DESC')
    ]);

    // add the user entity to the admin application
    //admin.addEntity(pricingSlots);



    //PriceGrids Entity


    // set the fields of the user entity list view
    priceGrids.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('priceStructure'),
        nga.field('cost'),
        nga.field('duration'),
        nga.field('pricingId'),
        nga.field('sequenceNumber')
    ]);

    priceGrids.creationView().fields([
        nga.field('priceStructure'),
        nga.field('cost'),
        nga.field('duration'),
        nga.field('pricingId'),
        nga.field('sequenceNumber')
    ]);
    // use the same fields for the editionView as for the creationView
    priceGrids.editionView().fields(priceGrids.creationView().fields());

    // add the user entity to the admin application
    //  admin.addEntity(priceGrids);



    //ReceiptContents Entity


    // set the fields of the user entity list view
    receiptContents.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('content'),
        nga.field('sequence'),
        nga.field('eventType'),
        nga.field('parkingSubLotId'),
        nga.field('styleMasterTitle'),
        nga.field('parkingPassMasterId')
    ]);

    receiptContents.creationView().fields([
        nga.field('content'),
        nga.field('sequence'),
        nga.field('eventType'),
        nga.field('parkingSubLotId'),
        nga.field('styleMasterTitle'),
        nga.field('parkingPassMasterId')
    ]);
    // use the same fields for the editionView as for the creationView
    receiptContents.editionView().fields(receiptContents.creationView().fields());

    // add the user entity to the admin application
    //admin.addEntity(receiptContents);


    //FocReasons Entity


    // set the fields of the user entity list view
    focReasons.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('reasonTitle').isDetailLink(true)
    ]);

    focReasons.creationView().fields([
        nga.field('reasonTitle')
    ]);
    // use the same fields for the editionView as for the creationView
    focReasons.editionView().fields(focReasons.creationView().fields());

    // add the user entity to the admin application
    //admin.addEntity(focReasons);




    /*var post = nga.entity('posts');

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


     post.readOnly();

     admin.addEntity(post);*/

    nga.configure(admin);


}]);


myApp.config(['RestangularProvider', function (RestangularProvider) {

    /*function Get(yourUrl){
     var Httpreq = new XMLHttpRequest();
     Httpreq.open("GET",yourUrl,false);
     Httpreq.send(null);
     return Httpreq.responseText;
     };
     RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
     if (operation === 'getList') {
     var Result = JSON.parse(Get(url + '/count'));
     response.totalCount = Result.count;
     }
     return data;
     });*/

    var authToken = window.sessionStorage.getItem('authToken');
    RestangularProvider.setDefaultHeaders({'Authorization': authToken});

    // use the custom query parameters function to format the API request correctly
    RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params) {

        //console.log("element",element);
        //console.log("what",what);

        if (params._filters) {
            for (var filter in params._filters) {
                var index = Object.keys(params._filters)[0];
                params['filter[where]['+index+']'] = params._filters[filter];
            }
            delete params._filters;
        }

        if(what === "FocReasons")
        {
            if (params._page) {
                params['filter[limit]'] = params._perPage;
                params['filter[skip]'] = (params._page - 1) * params._perPage; //skip is the same os offset
                delete params._page;
                delete params._perPage;
            }
            // custom sort params
            if (params._sortField) {
                delete params._sortDir;
                delete params._sortField;
            }

            return {params: params};
        }

        if (operation === "getList") {
            // custom pagination params
            if (params._page) {
                params['filter[limit]'] = params._perPage;
                params['filter[skip]'] = (params._page - 1) * params._perPage; //skip is the same os offset
                delete params._page;
                delete params._perPage;
            }
            // custom sort params
            if (params._sortField) {
                params['filter[order]'] = params._sortField + ' ' + params._sortDir;
                delete params._sortDir;
                delete params._sortField;
            }


            /*if (params._filters) {
             for (var filter in params._filters) {
             params['filter[where][matchId]'] = params._filters[filter];
             }
             delete params._filters;
             }*/
            var email = window.sessionStorage.getItem('posters_galore_login');
            //console.log("Session authToken",authToken);
            return {params: params};
        }



    });

    function Get(yourUrl) {
        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET", yourUrl, false);
        Httpreq.setRequestHeader("Authorization", authToken);
        Httpreq.send(null);
        return Httpreq.responseText;
    };

    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
        if (operation == "getList") {
            //console.log(response);
            /*var contentRange = response.headers('Content-Range');
             response.totalCount = contentRange.split('/')[1];*/

            var Result = JSON.parse(Get(url + '/count'));
            response.totalCount = Result.count;
        }
        return data;
    });
}]);

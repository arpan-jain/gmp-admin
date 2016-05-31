/**
 * Created by arpan on 26/05/16.
 */


//Event Type in Receipt Content
var event_type=[
    {value:'CHECKED_IN', label:'CHECKED_IN'},
    {value:'checked_out', label:'checked_out'},
    {value:'PASS_CREATION', label:'PASS_CREATION'},
    {value:'PASS_RENEW', label:'PASS_RENEW'},
    {value:'PASS_PAID', label:'PASS_PAID'},
    {value:'BOOKING_CREATE', label:'BOOKING_CREATE'}
];

var style_masters=[
    {value:'Bold', label:'Bold'},
    {value:'Feed', label:'Feed'},
    {value:'Header', label:'Header'},
    {value:'negative_bold', label:'negative_bold'},
    {value:'negative_header', label:'negative_header'},
    {value:'Negative_text', label:'Negative_text'},
    {value:'text', label:'text'},
    {value:'underline_bold', label:'underline_bold'},
    {value:'underline_header', label:'underline_header'},
    {value:'underline_text', label:'underline_text'}
];

var baseURL= "http://dev.api.getmyparking.com:5000/api/v1/";

var myApp = angular.module('myApp', ['ng-admin']);

myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('GetMyParking Admin')
        .baseApiUrl(baseURL); // main API endpoint




    // add entities to admin app
    admin.addEntity(nga.entity('Companies'));
    admin.addEntity(nga.entity('Parkings'));
    admin.addEntity(nga.entity('ParkingLots'));
    admin.addEntity(nga.entity('ParkingSubLots'));
    admin.addEntity(nga.entity('PricingSlots'));
    admin.addEntity(nga.entity('PriceGrids'));
    admin.addEntity(nga.entity('FocReasons'));
    admin.addEntity(nga.entity('ParkingPassMasters'));
    admin.addEntity(nga.entity('ReceiptContents'));



    var companies = admin.getEntity('Companies').identifier(nga.field('id'));
    var parkings = admin.getEntity('Parkings');
    var parkingLots = admin.getEntity('ParkingLots');
    var parkingSubLots = admin.getEntity('ParkingSubLots');
    var pricingSlots = admin.getEntity('PricingSlots');
    var priceGrids = admin.getEntity('PriceGrids');
    var focReasons = admin.getEntity('FocReasons').identifier(nga.field('reasonTitle'));
    var parkingPassMasters = admin.getEntity('ParkingPassMasters');
    var receiptContents = admin.getEntity('ReceiptContents');


    //Companies Entity

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
    ])
        .listActions(['edit'])
        .filters([
            nga.field('id'),
            nga.field('name'),
            nga.field('city')
        ]);



    companies.creationView().fields([
        nga.field('name'),
        nga.field('address'),
        nga.field('city'),
        nga.field('email','email'),
        nga.field('contactNumber','number'),
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

    companies.readOnly();



    //Parkings Entity


    parkings.listView().fields([
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
    ])
        .listActions(['edit'])
        .filters([
            nga.field('id'),
            nga.field('name'),
            nga.field('city'),
            nga.field('landmark'),
            nga.field('companyId'),
            nga.field('category')
        ]);



    parkings.creationView().fields([
        nga.field('name'),
        nga.field('address'),
        nga.field('city'),
        nga.field('contactNumber','number'),
        nga.field('companyId','number'),
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


    parkings.readOnly();





    //ParkingLots Entity


    parkingLots.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('name'),
        nga.field('openTime'),
        nga.field('closeTime'),
        nga.field('parkingId'),
        nga.field('parkingType'),
        nga.field('parkingOwner'),
        nga.field('collectionAt'),
        nga.field('avgParkingWeekday'),
        nga.field('avgParkingWeekend'),
        nga.field('ticketingSystem'),
        nga.field('extraNotes'),
        nga.field('geoLocation.lat'),
        nga.field('geoLocation.lng')
    ])
        .listActions(['edit'])
        .filters([
            nga.field('id'),
            nga.field('name'),
            nga.field('parkingId'),
            nga.field('parkingType'),
            nga.field('parkingOwner'),
            nga.field('ticketingSystem')
        ]);

    parkingLots.creationView().fields([
        nga.field('name'),
        nga.field('openTime'),
        nga.field('closeTime'),
        nga.field('parkingId','number'),
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
            .listActions(['edit'])
    ]);

    parkingLots.readOnly();


    // ParkingSubLots Entity


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

    ])
        .listActions(['edit'])
        .filters([
            nga.field('id'),
            nga.field('type'),
            nga.field('parkingLotId')
        ]);

    parkingSubLots.creationView().fields([
        nga.field('type'),
        nga.field('capacity','number'),
        nga.field('taxiTime'),
        nga.field('autoCheckoutTime'),
        nga.field('autoCheckoutCost','number'),
        nga.field('parkingLotId','number'),
        nga.field('bookingSecurity'),
        nga.field('convenienceFee'),
        nga.field('bookingNotes'),
        nga.field('plateNumberType'),
        nga.field('mobileRequired'),
        nga.field('valetName'),
        nga.field('lastCheckinUpdateTime'),
        nga.field('insidePhoto'),
        nga.field('lostTicketFee','number')
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
            .sortDir('DESC')
            .listActions(['edit']),
        nga.field('pricingSlots', 'referenced_list') // display list of related comments
            .targetEntity(pricingSlots)
            .targetReferenceField('parkingSubLotId')
            .targetFields([
                nga.field('id').label('PricingSlotId'),
                nga.field('day').label('PricingSlotDay'),
                nga.field('startMinutesOfDay').label('pricingSlotsStartMinutesOfDay'),
                nga.field('endMinutesOfDay').label('pricingSlotSendMinutesOfDay')
            ])
            .listActions(['edit'])
    ]);


    parkingSubLots.readOnly();



    //PricingSlots Entity


    pricingSlots.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('day'),
        nga.field('startMinutesOfDay'),
        nga.field('endMinutesOfDay'),
        nga.field('parkingSubLotId'),
        nga.field('type')
    ]).listActions(['edit'])
        .filters([
            nga.field('id'),
            nga.field('day'),
            nga.field('type')
        ]);

    pricingSlots.creationView().fields([
        nga.field('day'),
        nga.field('startMinutesOfDay','number'),
        nga.field('endMinutesOfDay','number'),
        nga.field('parkingSubLotId','number'),
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
            .listActions(['edit'])
    ]);


    pricingSlots.readOnly();



    //PriceGrids Entity


    priceGrids.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('priceStructure'),
        nga.field('cost'),
        nga.field('duration'),
        nga.field('pricingId'),
        nga.field('sequenceNumber')
    ]).listActions(['edit'])
        .filters([
            nga.field('id'),
            nga.field('priceStructure'),
            nga.field('pricingId')
        ]);

    priceGrids.creationView().fields([
        nga.field('priceStructure'),
        nga.field('cost','number'),
        nga.field('duration','number'),
        nga.field('pricingId','number'),
        nga.field('sequenceNumber','number')
    ]);
    // use the same fields for the editionView as for the creationView
    priceGrids.editionView().fields(priceGrids.creationView().fields());


    priceGrids.readOnly();




    //FocReasons Entity

    focReasons.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('reasonTitle').isDetailLink(true)
    ]);

    focReasons.creationView().fields([
        nga.field('reasonTitle')
    ]);
    // use the same fields for the editionView as for the creationView
    focReasons.editionView().fields(focReasons.creationView().fields());


    focReasons.readOnly();


    //Parking Pass Masters

    parkingPassMasters.listView().fields([
        nga.field('id').isDetailLink(true),
        nga.field('name'),
        nga.field('passType'),
        nga.field('numbers','number'),
        nga.field('vehicleType')
    ])
        .filters([
            nga.field('id'),
            nga.field('name'),
            nga.field('passType')
        ]);


    parkingPassMasters.showView().fields([
        nga.field('id'),
        nga.field('name'),
        nga.field('passType'),
        nga.field('numbers'),
        nga.field('vehicleType'),
        nga.field('isActive'),
        nga.field('parkingId'),
        nga.field('isName'),
        nga.field('isMobileNumber'),
        nga.field('isRegistrationNumber'),
        nga.field('isRfid'),
        nga.field('isPaid'),
        nga.field('autoRenewal')
    ]);



    parkingPassMasters.readOnly();


    //ReceiptContents Entity


    receiptContents.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('id').isDetailLink(true),
        nga.field('content'),
        nga.field('sequence'),
        nga.field('eventType'),
        nga.field('parkingSubLotId'),
        nga.field('styleMasterTitle'),
        nga.field('parkingPassMasterId')
    ]).listActions(['edit'])
        .filters([
            nga.field('id'),
            nga.field('eventType'),
            nga.field('parkingSubLotId'),
            nga.field('parkingPassMasterId')
        ]);

    receiptContents.creationView().fields([
        nga.field('content'),
        nga.field('sequence'),
        nga.field('eventType','choice')
            .choices(
                event_type
            ),
        nga.field('parkingSubLotId'),
        nga.field('styleMasterTitle','choice')
            .choices(
                style_masters
            ),
        nga.field('parkingPassMasterId')
    ]);
    // use the same fields for the editionView as for the creationView
    receiptContents.editionView().fields(receiptContents.creationView().fields());


    receiptContents.readOnly();



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

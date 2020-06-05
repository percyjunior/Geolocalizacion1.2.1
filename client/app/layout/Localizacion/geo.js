if (Meteor.isClient) {
    var MAP_ZOOM = 15;

    Meteor.startup(function() {
        GoogleMaps.load();
    });

    Template.map.onCreated(function() {
        var self = this;

        GoogleMaps.ready('map', function(map) {
            var marker;
            var convoy = [];
            var cont = 1;
            _.forEach(Geolocalizacion.find().fetch(), function(camion) {
                convoy.push([camion.Placa, camion.Latitud, camion.Longitud, cont]);
                cont++;
            });

            // Create and move the marker when latLng changes.
            self.autorun(function() {
                var latLng = Geolocation.latLng();
                if (!latLng)
                    return;
                // If the marker doesn't yet exist, create it.
                if (!marker) {
                    for (var i = 0; i < convoy.length; i++) {
                        var camion = convoy[i];
                        var marker = new google.maps.Marker({
                            position: { lat: camion[1], lng: camion[2] },
                            map: map.instance,
                            title: camion[0],
                            zIndex: camion[3]
                        });
                    }
                }
                // The marker already exists, so we'll just change its position.
                else {
                    marker.setPosition(latLng);
                }

                // Center and zoom the map view onto the current position.
                map.instance.setCenter(marker.getPosition());
                map.instance.setZoom(MAP_ZOOM);
            });
        });
    });

    Template.map.helpers({
        geolocationError: function() {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function() {
            var latLng = Geolocation.latLng();
            // Initialize the map once we have the latLng.
            if (GoogleMaps.loaded() && latLng) {
                return {
                    center: new google.maps.LatLng(latLng.lat, latLng.lng),
                    zoom: MAP_ZOOM
                };
            }
        },
        posicion: function() {
            return Geolocalizacion.find({});
        },
        tracto_list: function() {
            return Tracto.find();
        }
    });
    /////////////////////////////////////////////
    Template.unidad.onCreated(function() {
        var self = this;
        GoogleMaps.ready('map', function(map) {
            var marker;
            var convoy = [];
            var cont = 1;
            _.forEach(Geolocalizacion.find().fetch(), function(camion) {
                convoy.push([camion.Placa, camion.Latitud, camion.Longitud, cont]);
                cont++;
            });

            // Create and move the marker when latLng changes.
            self.autorun(function() {
                var latLng = Geolocation.latLng();
                if (!latLng)
                    return;
                var placa = FlowRouter.getParam('id')
                console.log(placa);
                // If the marker doesn't yet exist, create it.
                if (!marker) {
                    for (var i = 0; i < convoy.length; i++) {
                        var camion = convoy[i];
                        console.log(camion[0]);
                        if (camion[0] === placa) {
                            console.log("Encontramos!!!!");
                            var marker = new google.maps.Marker({
                                position: { lat: camion[1], lng: camion[2] },
                                map: map.instance,
                                title: camion[0],
                                zIndex: camion[3]
                            });
                            break;
                        } else {
                            console.log("No encontramos");
                        }
                    }
                }
                // The marker already exists, so we'll just change its position.
                else {
                    marker.setPosition(latLng);
                }

                // Center and zoom the map view onto the current position.
                map.instance.setCenter(marker.getPosition());
                map.instance.setZoom(MAP_ZOOM);
            });
        });
    });
    /////////////////////////////////////////////
    Template.encomienda.onCreated(function() {
        var self = this;
        GoogleMaps.ready('map', function(map) {
            var marker;
            var convoy = [];
            var auxiliar = [];
            var cont = 1;
            var encomienda = FlowRouter.getParam('id');
            _.forEach(Carga.find().fetch(), function(cargamento) {
                if (encomienda === cargamento.Encomienda) {
                    auxiliar.push([cargamento.PlacaTracto]);
                }
            });
            console.log(auxiliar);
            _.forEach(Geolocalizacion.find().fetch(), function(camion) {
                for (var i = 0; i < auxiliar.length; i++) {
                    if (camion.Placa === auxiliar[i][0]) {
                        convoy.push([camion.Placa, camion.Latitud, camion.Longitud, cont]);
                        cont++;
                    }
                }
            });
            // Create and move the marker when latLng changes.
            self.autorun(function() {
                var latLng = Geolocation.latLng();
                if (!latLng)
                    return;
                //var placa = tmpl.find('.tracto').value;
                // If the marker doesn't yet exist, create it.
                if (!marker) {
                    for (var i = 0; i < convoy.length; i++) {
                        var camion = convoy[i];
                        console.log("Placa", camion[0]);
                        console.log("latitud", camion[1]);
                        console.log("lonjitud", camion[2]);
                        console.log("Encontramos!!!!");
                        var marker = new google.maps.Marker({
                            position: { lat: camion[1], lng: camion[2] },
                            map: map.instance,
                            title: camion[0],
                        });
                    }
                }
                // The marker already exists, so we'll just change its position.
                else {
                    marker.setPosition(latLng);
                }

                // Center and zoom the map view onto the current position.
                map.instance.setCenter(marker.getPosition());
                map.instance.setZoom(MAP_ZOOM);
            });
        });
    });
    /////////////////////////////////////////////
    Template.unidad.helpers({
        geolocationError: function() {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function() {
            var latLng = Geolocation.latLng();
            // Initialize the map once we have the latLng.
            if (GoogleMaps.loaded() && latLng) {
                return {
                    center: new google.maps.LatLng(latLng.lat, latLng.lng),
                    zoom: MAP_ZOOM
                };
            }
        },
        posicion: function() {
            return Geolocalizacion.find({});
        },
        tracto_list: function() {
            return Tracto.find();
        }
    });
    Template.encomienda.helpers({
        geolocationError: function() {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function() {
            var latLng = Geolocation.latLng();
            // Initialize the map once we have the latLng.
            if (GoogleMaps.loaded() && latLng) {
                return {
                    center: new google.maps.LatLng(latLng.lat, latLng.lng),
                    zoom: MAP_ZOOM
                };
            }
        },
        posicion: function() {
            return Geolocalizacion.find({});
        },
        encomienda_list: function() {
            return Encomienda.find();
        }
    });
}

Template.map.events({
    'click .btn-submit-placa': function(e, tmpl) {
        var placa = tmpl.find('.tracto').value;
        var edit_geo = {
            Placa: placa
        }
        Meteor.call('GeoUpdate', edit_geo, function(error, result) {
            if (error)
                return throwError(error.reason);
        });
    }
});

Template.unidad.events({
    'click .btn-submit-placa': function(e, tmpl) {
        var placa = tmpl.find('.tracto').value;
        var edit_geo = {
            Placa: placa
        }
        Meteor.call('GeoUpdate', edit_geo, function(error, result) {
            if (error)
                return throwError(error.reason);
        });
    }
});


//var beaches = [
//  ['Bondi Beach', -33.890542, 151.274856, 4],
//  ['Coogee Beach', -33.923036, 151.259052, 5],
//  ['Cronulla Beach', -34.028249, 151.157507, 3],
//  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//  ['Maroubra Beach', -33.950198, 151.259302, 1]
//];
//
//for (var i = 0; i < beaches.length; i++) {
//    var beach = beaches[i];
//    var marker = new google.maps.Marker({
//      position: {lat: beach[1], lng: beach[2]},
//      map: map,
//      icon: image,
//      shape: shape,
//      title: beach[0],
//      zIndex: beach[3]
//    });
//  }
//
//if (! marker) {
//          marker = new google.maps.Marker({
//            position: new google.maps.LatLng(latLng.lat, latLng.lng),
//            map: map.instance
//          });
//        }
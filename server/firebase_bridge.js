var Firebase = Meteor.npmRequire("firebase");
var firebase = new Firebase('https://geolocalizacion-e994b.web.app/');
var EJSON = Package.ejson.EJSON;

firebase.on('child_added',   willLog);
firebase.on('child_changed', willLog);
firebase.on('child_removed', willLog);

function willLog(snapshot) {
    console.log("Seguimos intentado.. ojala funcione");
    console.log(snapshot.key() + " : " + EJSON.stringify(snapshot.val()));
}

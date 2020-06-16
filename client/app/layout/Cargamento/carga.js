Template.Lista_Carga_Dos.events({
    'click .Entregado': function(e, tmp) {
        var id = this._id;
        Meteor.call('EntregarEncomienda', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
        var tracto = this.PlacaTracto;
        var chata = this.PlacaChata;
        Meteor.call('DesocuparCamion', tracto, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
        Meteor.call('DesocuparChata', chata, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
    }
});
Template.Distribuir_Carga.events({
    'click .entregar': function(e, tmpl) {
        var tracto = this.PlacaTracto;
        var chata = this.PlacaChata;
        Meteor.call('DesocuparCamion', tracto, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
        Meteor.call('DesocuparChata', chata, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
    },
    'click .remove_encomienda': function(e, tmpl) {
        var id = this._id;
        Meteor.call('EncomiendaRemove', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
    },
    'click .cerrar': function(e, tmpl) {
        var encomiendas = Carga.find({ Mostrado: false });
        console.log(encomiendas);
        _.forEach(encomiendas.fetch(), function(singular) {
            console.log(singular._id);
            Meteor.call('CargaMostrado', singular, function(error) {
                if (error) {
                    return throwError(error.reason);
                }
            });
        });
        Meteor.popDown("Distribuir_Carga");
    }
});

Template.Distribuir_Carga.helpers({
    carga_list: function() {
        return Carga.find({ Mostrado: false });
    }
});
Template.Lista_Carga.helpers({
    carga_list: function() {
        return Carga.find({});
    }
});
Template.Lista_Carga_Dos.helpers({
    carga_list: function() {
        return Carga.find({ Entregado: false });
    },
    carga_entregada_list: function() {
        return Carga.find({ Entregado: true });
    }
});
Template.Socio_Encomienda.helpers({
    carga_list: function() {
        var encargos = Carga.find({});
        var nombre = (Accounts.user().profile.apellido + " " + Accounts.user().profile.nombre);
        var camiones = Tracto.find({ Apellido: nombre });
        var resultado = new Object();
        _.forEach(encargos.fetch(), function(encargo) {
            _.forEach(camiones.fetch(), function(camion) {
                if (encargo.PlacaTracto === camion.Placa) {
                    _.extend(resultado, { encargo });
                }
            });
        });
        return resultado;
    }
});
Session.setDefault('dist', false);
Session.setDefault('especial', false);
var NoVacio = function(value) {
    if (value && value != "") {
        return true
    }
    Bert.alert("Porfavor llene todos los campos del formulario", "danger", "growl-top-right");
}
var ValFecha = function(value) {
        if (value && value != "") {
            return true
        }
        Bert.alert("Porfavor llene todos los campos del formulario", "danger", "growl-top-right");
    }
    //Encomienda
Template.Crear_Encomienda.events({
    'click .btn-submit-encomienda': function(e, tmpl) {
        var cliente = tmpl.find('.ClienteEncomienda').value;
        var peso = tmpl.find('.PesoEncomienda').value;
        var paisorigen = tmpl.find('.OrigenPaisEncomienda').value;
        var cuidadorigen = tmpl.find('.OrigenCuidadEncomienda').value;
        var paisdestino = tmpl.find('.DestinoPaisEncomienda').value;
        var cuidaddestino = tmpl.find('.DestinoCuidadEncomienda').value;
        var precio = tmpl.find('.PrecioEncomienda').value;
        var fechamontado = tmpl.find('.FechaCargaEncomienda').value;
        var fechadesmontado = tmpl.find('.FechaEntregaEncomienda').value;
        var producto = tmpl.find('.ProductoEncomienda').value;
        var hoy = moment();
        var fecha1 = moment(fechamontado);
        console.log(hoy);
        console.log(fecha1)
        console.log(hoy.isSameOrAfter(fecha1));
        if (NoVacio(cliente) &&
            NoVacio(peso) &&
            NoVacio(paisorigen) &&
            NoVacio(cuidadorigen) &&
            NoVacio(paisdestino) &&
            NoVacio(cuidaddestino) &&
            NoVacio(precio) &&
            NoVacio(fechamontado) &&
            NoVacio(fechadesmontado) &&
            NoVacio(producto)) {
            var data = {
                Cliente: cliente,
                Peso: peso,
                PaisOrigen: paisorigen,
                CuidadOrigen: cuidadorigen,
                PaisDestino: paisdestino,
                CuidadDestino: cuidaddestino,
                Precio: precio,
                FechaMontado: fechamontado,
                FechaDesmontado: fechadesmontado,
                Borrar: false,
                Especial: false,
                Producto: producto
            };
            Meteor.call('EncomiendaInsert', data, function(error) {
                if (error)
                    return throwError(error.reason);
            });
            $('#PesoEncomienda').val("").focus();
            $('#OrigenPaisEncomienda').val("");
            $('#OrigenCuidadEncomienda').val("");
            $('#DestinoPaisEncomienda').val("");
            $('#DestinoCuidadEncomienda').val("");
            $('#PrecioEncomienda').val("");
            $('#FechaCargaEncomienda').val("");
            $('#FechaEntregaEncomienda').val("");
            $('#ProductoEncomienda').val("");
        }
    },
    'click .Si': function(e, tmpl) {
        Session.set('especial', true);
    },
    'click .No': function(e, tmpl) {
        Session.set('especial', false);
    },
    'click .btn-submit-encomiendaEspecial': function(e, tmpl) {
        var cliente = tmpl.find('.ClienteEncomienda').value;
        var ancho = tmpl.find('.anchoEncomienda').value;
        var largo = tmpl.find('.largoEncomienda').value;
        var alto = tmpl.find('.altoEncomienda').value;
        var cantidad = tmpl.find('.cantidadEncomienda').value;
        var paisorigen = tmpl.find('.OrigenPaisEncomienda').value;
        var cuidadorigen = tmpl.find('.OrigenCuidadEncomienda').value;
        var paisdestino = tmpl.find('.DestinoPaisEncomienda').value;
        var cuidaddestino = tmpl.find('.DestinoCuidadEncomienda').value;
        var precio = tmpl.find('.PrecioEncomienda').value;
        var fechamontado = tmpl.find('.FechaCargaEncomienda').value;
        var fechadesmontado = tmpl.find('.FechaEntregaEncomienda').value;
        var producto = tmpl.find('.ProductoEncomienda').value;
        var data = {
            Cliente: cliente,
            Alto: alto,
            Largo: largo,
            Ancho: ancho,
            Cantidad: cantidad,
            PaisOrigen: paisorigen,
            CuidadOrigen: cuidadorigen,
            PaisDestino: paisdestino,
            CiudadDestino: cuidaddestino,
            Precio: precio,
            FechaMontado: fechamontado,
            FechaDesmontado: fechadesmontado,
            Producto: producto,
            Borrar: false,
            Especial: true
        };
        Meteor.call('EncomiendaEspecialInsert', data, function(error) {
            if (error)
                return throwError(error.reason);
        });
        $('#anchoEncomienda').val("").focus();
        $('#LargoEncomienda').val("").focus();
        $('#anchoEncomienda').val("").focus();
        $('#PesoEncomienda').val("").focus();
        $('#cantidadEncomienda').val("").focus();
        $('#OrigenPaisEncomienda').val("");
        $('#OrigenCuidadEncomienda').val("");
        $('#DestinoPaisEncomienda').val("");
        $('#DestinoCuidadEncomienda').val("");
        $('#PrecioEncomienda').val("");
        $('#FechaCargaEncomienda').val("");
        $('#FechaEntregaEncomienda').val("");
    }
});

Template.Crear_Encomienda.helpers({
    encomienda_list: function() {
        return Encomienda.find({});
    },
    cliente_list: function() {
        return Usuario.find({ Tipo: "Cliente" });
    },
    lista_tracto: function() {
        return Tracto.find({});
    },
    lista_chata: function() {
        return Chata.find({});
    },
    especial: function() {
        return Session.get('especial');
    }
});

Template.lista_encomienda.helpers({
    editing_encomienda: function() {
        return Session.get('editing_encomienda');
    }
});

Template.lista_encomienda.events({
    'click .remove_encomienda': function(e, tmpl) {
        var id = this._id;
        Meteor.call('EncomiendaRemove', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
    },

    'dblclick .student_row': function(e, tmpl) {
        Session.set('editing_encomienda', true);
    },

    'keyup .editBoxChata': function(e, tmpl) {
        var currentStudentId = this._id;
        if (e.which === 13) {
            var edit_pais_montado = tmpl.find('.EditMontadoEncomienda').value;
            var edit_pais_desmontado = tmpl.find('.EditDesmontadoEncomienda').value;
            var edit_fecha_montado = tmpl.find('.EditFechaMontadoEncomienda').value;
            var edit_fecha_desmontado = tmpl.find('.EditFechaDesmontadoEncomienda').value;
            var edit_cliente = {
                id: currentStudentId,
                PaisOrigen: edit_pais_montado,
                PaisDestino: edit_pais_desmontado,
                FechaMontado: edit_fecha_montado,
                FechaDesmontado: edit_fecha_desmontado
            };

            Meteor.call('EncomiendaUpdate', edit_cliente, function(error, result) {
                if (error)
                    return throwError(error.reason);
            });
            Session.set('editing_encomienda', false);
        }
        repa
    },
});
Template.Cliente_Encomienda.helpers({
    empresa: function() {
        return Accounts.user().profile.Empresa;
    },
    encomienda_list: function() {
        var nom = Accounts.user().profile.Empresa;
        return Encomienda.find({ Cliente: nom });
    }
});
Template.Distribuir_Encomienda.helpers({
    encomienda_list: function() {
        return Encomienda.find({});
    },
});
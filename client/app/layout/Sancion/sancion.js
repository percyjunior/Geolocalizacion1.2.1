var NoVacio = function(value) {
        if (value && value != "") {
            return true
        }
        Bert.alert("Porfavor llene todos los campos del formulario", "danger", "growl-top-right");
    }
    //Sancion
Template.Crear_Sancion.events({
    'click .btn-submit-sancion': function(e, tmpl) {
        var placa = tmpl.find('.PlacaSancion').value;
        var detalle = tmpl.find('.DetalleSancion').value;
        var punto = tmpl.find('.PuntoSancion').value;
        if (NoVacio(placa) &&
            NoVacio(detalle) &&
            NoVacio(punto)) {
            var data = {
                Placa: placa,
                Detalle: detalle,
                Punto: parseInt(punto),
                Borrar: false
            };
            Meteor.call('SancionInsert', data, function(error) {
                if (error)
                    return throwError(error.reason);
            });
            Meteor.call('SancionTracto', data, function(error) {
                if (error)
                    return throwError(error.reason)
            });
            $('#SocioSancion').val("").focus();
            $('#DetalleSancion').val("");
            $('#PuntoSancion').val("");
        }
    }
});

Template.Crear_Sancion.helpers({
    sancion_list: function() {
        return Sancion.find({});
    },
    tracto_list: function() {
        return Tracto.find({});
    }
});

Template.lista_sancion.helpers({
    editing_sancion: function() {
        return Session.get('editing_sancion');
    }
});

Template.UsuarioSancion.helpers({
    admin_list: function() {
        return Sancion.find({});
    }
});

Template.lista_sancion.events({
    'click .remove_sancion': function(e, tmpl) {
        var id = this._id;
        Meteor.call('ClienteRemove', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
    },

    'dblclick .student_row': function(e, tmpl) {
        Session.set('editing_sancion', true);
    },

    'keyup .editBoxSancion': function(e, tmpl) {
        var currentStudentId = this._id;
        if (e.which === 13) {
            var editsocio = tmpl.find('.SocioSancion').value;
            var editdetalle = tmpl.find('.DetalleSancion').value;
            var editpunto = tmpl.find('.PuntoSancion').value;
            var edit_cliente = {
                id: currentStudentId,
                Socio: editsocio,
                Detalle: editdetalle,
                Punto: editpunto
            };

            Meteor.call('SancionUpdate', edit_cliente, function(error, result) {
                if (error)
                    return throwError(error.reason);
            });

            Session.set('editing_encomienda', false);
        }
    },
});

Template.SecreSancion.helpers({
    admin_list: function() {
        return Usuario.find({ Tipo: "Administracion" });
    }
});

Template.Socio_Sancion.helpers({
    nombre: function() {
        var nombre = Accounts.user().profile.nombre + " " + Accounts.user().profile.apellido;
        return nombre
    },
    sancion_list: function() {
        var uno = Accounts.user().profile.username;
        return Sancion.find({ Socio: uno })
    }
});

if (Meteor.isClient) {
    Meteor.subscribe("Tasks");

    Template.Grafico_Admin.helpers({
        createChart: function() {
            // Gather data:
            var allTasks = 70,
                incompleteTask = 30,
                tasksData = [{
                    y: incompleteTask,
                    name: "Incomplete"
                }, {
                    y: allTasks - incompleteTask,
                    name: "Complete"
                }];
            // Use Meteor.defer() to craete chart after DOM is ready:
            Meteor.defer(function() {
                // Create standard Highcharts chart with options:
                Highcharts.chart('chart', {
                    series: [{
                        type: 'pie',
                        data: tasksData
                    }]
                });
            });
        }
    });
}
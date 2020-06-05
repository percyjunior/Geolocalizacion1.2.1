var NoVacio = function(value) {
    if (value && value != "") {
        return true
    }
    Bert.alert("Porfavor llene todos los campos del formulario", "danger", "growl-top-right");
}
Session.setDefault('presente', false);

//Socios
Session.setDefault('editing_socio', false);
Template.Crear_Socio.events({
    'click .btn-submit-socio': function(e, tmpl) {
        var nombre = tmpl.find('.NombreSocio').value;
        var apellido = tmpl.find('.ApellidoSocio').value;
        var ci = tmpl.find('.CiSocio').value;
        var nacimiento = tmpl.find('.NacimientoSocio').value;
        var correo = tmpl.find('.CorreoSocio').value;
        var sexo = tmpl.find('.SexoSocio').value;
        var celular = tmpl.find('.CelularSocio').value;
        var telefono = tmpl.find('.TelefonoSocio').value;
        var direccion = tmpl.find('.DireccionSocio').value;
        var rol = tmpl.find('.RolSocio').value;
        var categoria = tmpl.find('.CategoriaSocio').value;
        if (NoVacio(nombre) &&
            NoVacio(apellido) &&
            NoVacio(ci) &&
            NoVacio(nacimiento) &&
            NoVacio(correo) &&
            NoVacio(sexo) &&
            NoVacio(celular) &&
            NoVacio(telefono) &&
            NoVacio(direccion) &&
            NoVacio(rol) &&
            NoVacio(categoria)) {
            var data = {
                Tipo: "Socio",
                Nombre: nombre,
                Apellido: apellido,
                Ci: ci,
                FechaNacimiento: nacimiento,
                CorreoElectronico: correo,
                Sexo: sexo,
                Celular: celular,
                Telefono: telefono,
                Direccion: direccion,
                Rol: rol,
                Categoria: categoria,
                Borrar: false,
                Accesible: false
            };
            var data = {
                Tipo: "Socio",
                Nombre: nombre,
                Apellido: apellido,
                Ci: ci,
                FechaNacimiento: nacimiento,
                CorreoElectronico: correo,
                Sexo: sexo,
                Celular: celular,
                Telefono: telefono,
                Direccion: direccion,
                Rol: rol,
                Categoria: categoria,
                Borrar: false,
                Accesible: false
            };
            Meteor.call('SocioInsert', data, function(error) {
                if (error)
                    return throwError(error.reason);
            });
            $('#NombreSocio').val("").focus();
            $('#NacimientoSocio').val("");
            $('#CiSocio').val("");
            $('#CorreoSocio').val("");
            $('#CelularSocio').val("");
            $('#TelefonoSocio').val("");
            $('#DireccionSocio').val("");
            $('#RolSocio').val("");
        }

    }
});

Template.Crear_Socio.helpers({
    socio_list: function() {
        return Usuario.find({ Tipo: "Socio" });
    }
});

Template.lista_socio.helpers({
    editing_socio: function() {
        return Session.get('editing_socio');
    }
});

Template.lista_socio.events({
    'click .remove_socio': function(e, tmpl) {
        var id = this._id;
        Meteor.call('SocioRemove', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
    },

    'dblclick .student_row': function(e, tmpl) {
        Session.set('editing_socio', true);
    },

    'keyup .editBoxSocio': function(e, tmpl) {
        var currentStudentId = this._id;
        if (e.which === 13) {
            var edit_nombre = tmpl.find('.EditNombreSocio').value;
            var edit_ci = tmpl.find('.EditCiSocio').value;
            var edit_celular = tmpl.find('.EditCelularSocio').value;
            var edit_rol = tmpl.find('.EditRolSocio').value;
            var edit_socio = {
                id: currentStudentId,
                Nombre: edit_nombre,
                Ci: edit_ci,
                Celular: edit_celular,
                Rol: edit_rol
            };

            Meteor.call('SocioUpdate', edit_socio, function(error, result) {
                if (error)
                    return throwError(error.reason);
            });

            Session.set('editing_socio', false);
        }
    }
});

Template.reparto.helpers({
    socio_list: function() {
        return Usuario.find({ Tipo: "Socio" });
    },
    asiste: function() {
        return Session.get('presente');
    }
});

Template.SocioUsuario.helpers({
    admin_list: function() {
        return Usuario.find({ Tipo: "Socio" });
    }
});

Template.Socio_info.helpers({
    socio_list: function() {
        var nombre = Accounts.user().profile.nombre;
        var apellido = Accounts.user().profile.apellido
        return Usuario.find({ Nombre: nombre, Apellido: apellido });
    }
});

Template.Socio_Camion.helpers({
    nombre: function() {
        var nombre = Accounts.user().profile.nombre + " " + Accounts.user().profile.apellido
        return nombre;
    },
    tracto_list: function() {
        var nombre = (Accounts.user().profile.apellido + " " + Accounts.user().profile.nombre);
        console.log(nombre);
        return Tracto.find({ Apellido: nombre });
    },
    chata_list: function() {
        var nombre = (Accounts.user().profile.apellido + " " + Accounts.user().profile.nombre);
        return Chata.find({ Apellido: nombre });
    }
});
var NoVacio = function(value){
    if(value && value != ""){
        return true
    }
    Bert.alert("Porfavor llene todos los campos del formulario","danger","growl-top-right");
}
Session.setDefault('editing_admin', false);

Template.Crear_Admin.events({
	'click .btn-submit-admin': function(e, tmpl){
		var nombre = tmpl.find('.NombreAdmin').value;
		var ci = tmpl.find('.CiAdmin').value;
		var nacimiento = tmpl.find('.NacimientoAdmin').value;
		var correo = tmpl.find('.CorreoAdmin').value;
		var sexo = tmpl.find('.SexoAdmin').value;
		var celular = tmpl.find('.CelularAdmin').value;
		var telefono = tmpl.find('.TelefonoAdmmin').value;
		var direccion = tmpl.find('.DireccionAdmin').value;
		var cargo = tmpl.find('.CargoAdmin').value;
		var gestion = tmpl.find('.GestionAdmin').value;
		if(NoVacio(nombre) &&
			NoVacio(ci) &&
			NoVacio(nacimiento) &&
			NoVacio(correo) &&
			NoVacio(sexo) &&
			NoVacio(celular) &&
			NoVacio(telefono) &&
			NoVacio(direccion) &&
			NoVacio(cargo) &&
			NoVacio(gestion)){
			var data = {
				Tipo: "Administracion",
				Nombre: nombre,
				Ci: ci,
				FechaNacimiento: nacimiento,
				CorreoElectronico: correo,
				Sexo: sexo,
				Celular: celular,
				Telefono: telefono,
				Direccion: direccion,
				Cargo: cargo,
				Gestion: gestion,
				Borrar: false,
				Fecha: new Date()
			};
			Meteor.call('AdminInsert', data, function(error){
			if(error)
			return throwError(error.reason);
			});
			$('#NombreAdmin').val("").focus();
			$('#NacimientoAdmin').val("");
			$('#CiAdmin').val("");
			$('#CorreoAdmin').val("");
			$('#CelularAdmin').val("");
			$('#TelefonoAdmin').val("");
			$('#DireccionAdmin').val("");
			$('#GestionAdmin').val("");
		}
	}
});

Template.Crear_Admin.helpers({
	admin_list: function(){
		return Usuario.find({Tipo: "Administracion"});
	}
});

Template.lista_admin.helpers({
	editing_admin: function(){
		return Session.get('editing_admin');
	}
});

Template.lista_admin.events({
	'click .remove_admin': function(e, tmpl){
		var id = this._id;
		Meteor.call('AdminRemove', id, function(error){
			if (error){
				return throwError(error.reason);
			}
		});
	},

	'dblclick .admin_row': function(e, tmpl){
		Session.set('editing_admin', true);
	},

	'keyup .editBoxAdmin': function (e, tmpl) {
		var currentStudentId = this._id;
		if (e.which === 13) {
			var edit_nombre = tmpl.find('.EditNombreadmin').value;
			var edit_ci = tmpl.find('.EditCiAdmin').value;
			var edit_celular = tmpl.find('.EditCelularAdmin').value;
			var edit_cargo = tmpl.find('.EditCargoAdmin').value;
			var edit_student = {
				id: currentStudentId,
				Nombre: edit_nombre,
				Ci: edit_ci,
				Celular: edit_celular,
				Cargo: edit_cargo
			};

			Meteor.call('AdminUpdate', edit_student, function (error, result) {
				if (error)
				return throwError(error.reason);
				Session.set('editing_admin', false);
			});

		}
	}
});

Template.AdminUsuario.helpers({
	admin_list: function(){
		return Usuario.find({Tipo: "Administracion"});
	}
});
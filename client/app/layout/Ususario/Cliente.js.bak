//Cliente
Template.Crear_Cliente.events({
	'click .btn-submit-cliente': function(e, tmpl){
		var nombre = tmpl.find('.NombreCliente').value;
		var ci = tmpl.find('.CiCliente').value;
		var nacimiento = tmpl.find('.NacimientoCliente').value;
		var correo = tmpl.find('.CorreoCliente').value;
		var sexo = tmpl.find('.SexoCliente').value;
		var celular = tmpl.find('.CelularCliente').value;
		var telefono = tmpl.find('.TelefonoCliente').value;
		var direccion = tmpl.find('.DireccionCliente').value;
		var empresa = tmpl.find('.EmpresaCliente').value;
		var cargo = tmpl.find('.CargoCliente').value;
		var pais = tmpl.find('.PaisCliente').value;
		var ciudad = tmpl.find('.CiudadCliente').value;
		var data = {
			Tipo: "Cliente",
			Nombre: nombre,
			Ci: ci,
			FechaNacimiento: nacimiento,
			CorreoElectronico: correo,
			Sexo: sexo,
			Celular: celular,
			Telefono: celular,
			Direccion: direccion,
			Empresa: empresa,
			Cargo: cargo,
			Pais: pais,
			Ciudad: ciudad,
			Borrar: false
		};
		Meteor.call('ClienteInsert', data, function(error){
			if(error)
			return throwError(error.reason);
		});
		$('#NombreCliente').val("").focus();
		$('#NacimientoCliente').val("");
		$('#CiCliente').val("");
		$('#CorreoCliente').val("");
		$('#SexoCliente').val("");
		$('#CelularCliente').val("");
		$('#TelefonoCliente').val("");
		$('#DireccionCliente').val("");
		$('#CargoCliente').val("");
		$('#EmpresaCliente').val("");
		$('#CuidadCliente').val("");
	}
});

Template.Crear_Cliente.helpers({
	cliente_list: function(){
		return Usuario.find({Tipo: "Cliente"});
	}
});

Template.lista_cliente.helpers({
	editing_cliente: function(){
		return Session.get('editing_cliente');
	}
});

Template.lista_cliente.events({
	'click .remove_cliente': function(e, tmpl){
		var id = this._id;
		Meteor.call('ClienteRemove', id, function(error){
			if (error){
				return throwError(error.reason);
			}
		});
	},

	'dblclick .student_row': function(e, tmpl){
		Session.set('editing_cliente', true);
	},

	'keyup .editBoxCliente': function (e, tmpl) {
		var currentStudentId = this._id;
		if (e.which === 13) {
			var edit_nombre = tmpl.find('.EditNombreCliente').value;
			var edit_ci = tmpl.find('.EditCiCliente').value;
			var edit_cargo = tmpl.find('.EditCargoCliente').value;
			var edit_empresa = tmpl.find('.EditEmpresaCliente').value;
			var edit_cliente = {
				id: currentStudentId,
				Nombre: edit_nombre,
				Ci: edit_ci,
				Cargo: edit_cargo,
				Empresa: edit_empresa
			};

			Meteor.call('ClienteUpdate', edit_cliente, function (error, result) {
				if (error)
				return throwError(error.reason);
			});
			Session.set('editing_cliente', false);
		}
	}
});
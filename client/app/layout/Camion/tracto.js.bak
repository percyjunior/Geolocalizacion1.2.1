//Tracto
Template.Crear_Tracto.events({
	'click .btn-submit-tracto': function(e, tmpl){
		var placa = tmpl.find('.PlacaTracto').value;
		var marca = tmpl.find('.MarcaTracto').value;
		var color = tmpl.find('.ColorTracto').value;
		var cilindrada = tmpl.find('.CilindradaTracto').value;
		var peso = tmpl.find('.PesoTracto').value;
		var año = tmpl.find('.AñoTracto').value;
		var ejes = tmpl.find('.EjesTracto').value;
		var tipo = tmpl.find('.TipoTracto').value;
		var socio = tmpl.find('.SocioTracto').value;
		var data = {
			Placa: placa,
			Marca: marca,
			Color: color,
			Cilindrada: cilindrada,
			Peso: peso,
			Año: año,
			Ejes: ejes,
			Tipo: tipo,
			Borrar: false,
			Socio: socio,
			Habilitado: false,
			Estado: "Libre"
		};
		Meteor.call('TractoInsert', data, function(error){
			if(error)
			return throwError(error.reason);
		});
		$('#PlacaTracto').val("").focus();
		$('#MarcaTracto').val("");
		$('#ColorTracto').val("");
		$('#CilindradaTracto').val("");
		$('#PesoTracto').val("");
		$('#AñoTracto').val("");
		$('#EjesTracto').val("");
		$('#TipoTracto').val("");
	}
});

Template.Crear_Tracto.helpers({
	tracto_list: function(){
		return Tracto.find();
	},
	socio_list: function(){
		return Usuario.find({Tipo: "Socio"});
	}
});

Template.lista_tracto.helpers({
	editing_tracto: function(){
		return Session.get('editing_tracto');
	}
});

Template.lista_tracto.events({
	'click .remove_tracto': function(e, tmpl){
	    debugger;
    		var id = this._id;
    		Meteor.call('TractoRemove', id, function(error){
    			if (error){
    				return throwError(error.reason);
    			}
    		});
    	},

	'dblclick .student_row': function(e, tmpl){
    		Session.set('editing_tracto', true);
    	},

	'keyup .editBoxTracto': function (e, tmpl) {
    		var currentStudentId = this._id;
    		if (e.which === 13) {
    			var edit_placa = tmpl.find('.EditPlacaTracto').value;
    			var edit_color = tmpl.find('.EditColorTracto').value;
    			var edit_año = tmpl.find('.EditAñoTracto').value;
    			var edit_marca = tmpl.find('.EditMarcaTracto').value;
    			var edit_cliente = {
    				id: currentStudentId,
    				Placa: edit_placa,
    				Color: edit_color,
    				Año: edit_año,
    				Marca: edit_marca
    			};

    			Meteor.call('TractoUpdate', edit_cliente, function (error, result) {
    				if (error)
    				return throwError(error.reason);
    			});

    			Session.set('editing_tracto', false);
    		}
    	}
});
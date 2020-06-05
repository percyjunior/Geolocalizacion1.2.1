//Sancion
Template.Crear_Sancion.events({
	'click .btn-submit-sancion': function(e, tmpl){
		var socio = tmpl.find('.SocioSancion').value;
		var detalle = tmpl.find('.DetalleSancion').value;
		var punto = tmpl.find('.PuntoSancion').value;
		var data = {
			Socio: socio,
			Detalle: detalle,
			Punto: punto,
			Borrar: false
		};
		Meteor.call('SancionInsert', data, function(error){
			if(error)
			return throwError(error.reason);
		});
		$('#SocioSancion').val("").focus();
		$('#DetalleSancion').val("");
		$('#PuntoSancion').val("");
	}
});

Template.Crear_Sancion.helpers({
	sancion_list: function(){
		return Sancion.find({});
	},
    socio_list: function(){
        return Usuario.find({Tipo: "Socio"});
    }
});

Template.lista_sancion.helpers({
	editing_sancion: function(){
		return Session.get('editing_sancion');
	}
});

Template.lista_sancion.events({
	'click .remove_sancion': function(e, tmpl){
    		var id = this._id;
    		Meteor.call('ClienteRemove', id, function(error){
    			if (error){
    				return throwError(error.reason);
    			}
    		});
    	},

	'dblclick .student_row': function(e, tmpl){
    		Session.set('editing_sancion', true);
    	},

	'keyup .editBoxSancion': function (e, tmpl) {
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

    			Meteor.call('SancionUpdate', edit_cliente, function (error, result) {
    				if (error)
    				return throwError(error.reason);
    			});

    			Session.set('editing_encomienda', false);
    		}
    },
});
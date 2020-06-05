Session.setDefault('editing_cliente', false);
Session.setDefault('editing_tracto', false);
Session.setDefault('editing_chata', false);
Session.setDefault('editing_encomienda', false);
Session.setDefault('editing_sancion', false);
Session.setDefault('ventana', false);
Session.setDefault('Nombre', "");
Session.setDefault('id', "");
Session.setDefault('Tipo', "");

Template.Home.onRendered(function(){
	$('.input_mhs').validate();
});

Template.Home.events({
    'click .loggin-toggle': ()=>{
        Session.set('nav-toggle','open');
    },
    'click .open-insert-modal': function (e) {
        e.preventDefault();
        //{backdrop: "static"} it is use for only close button click than close
        $('#insertModal').modal({backdrop: "static"});
    },
    'click .mostrar': ()=>{
        Session.set('ventana', true);
        $(event.target).removeClass("mostrar");
        $(event.target).addClass("esconder");
    },
    'click .esconder': ()=>{
        Session.set('ventana', false);
        $(event.target).removeClass("esconder");
        $(event.target).addClass("mostrar");
    }
});

Template.Home.helpers({
	ventana: function(){
		return Session.get('ventana');
	},
	Rol: function(){
        return Accounts.user().profile.Rol;
    }
});
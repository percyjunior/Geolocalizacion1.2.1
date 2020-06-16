var NoVacio = function(value) {
        if (value && value != "") {
            return true
        }
        Bert.alert("Porfavor llene todos los campos del formulario", "danger", "growl-top-right");
    }
    ///////////////////////
var $popupContainer, names, popupContainer;

$(function() {
    return $popupContainer.appendTo($("body"));
});

$popupContainer = $('<div></div>');

popupContainer = $popupContainer[0];

(function() {
    var indexify, zIndexSniffer;
    zIndexSniffer = function() {
        var c;
        c = popupContainer;
        c.__appendChild = c.appendChild;
        return c.appendChild = function() {
            c.__appendChild.apply(c, arguments);
            return indexify(c);
        };
    };
    indexify = function(element) {
        var el, i, j, len, ref, ref1, ref2;
        ref = element.childNodes;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
            el = ref[i];
            if ((ref1 = el.style) != null) {
                ref1.zIndex = i + 1050;
            }
            if ((ref2 = el.style) != null) {
                ref2.position = 'fixed';
            }
        }
        return 'asd';
    };
    return zIndexSniffer();
})();

names = {};
var popDown = Meteor.popDown = function popDown(name) {
    var err, error, mod;
    try {
        if (!name) {
            throw " popUp " + name + " not found";
        }
        mod = $(names[name]).find(".modal");
        if (mod.length) {
            mod.on('hidden.bs.modal', function() {
                delete $(names[name]).remove();
                return null;
            });
            mod.modal("hide");
        } else {
            delete $(names[name]).remove();
        }
        return null;
    } catch (error) {
        err = error;
        lg(err);
        return null;
    }
};

Meteor.popUp = function popUp(name, arg, cb) {
    if (!arg) arg = {};
    var $wraper, err, error, frag, wraper;
    try {
        if (names[name]) {
            delete $(names[name]).remove();
        }
        frag = UI.renderWithData(Template[name], arg);
        $wraper = $("<div>");
        wraper = $wraper[0];
        popupContainer.appendChild(wraper);
        UI.insert(frag, wraper);
        $wraper.find(".modal").on("hidden.bs.modal", function() {
            delete $(wraper).remove();
            if (cb) {
                return cb();
            }
        });
        $wraper.find(".modal").modal("show");
        names[name] = wraper;
        return $wraper.on("popDown", function() {
            return popDown(name);
        });
    } catch (error) {
        err = error;
        lg(err);
        lg(err.stack);
        window.__err = err;
        return null;
    }
};
///////////////////////
//Chata
Template.Crear_Chata.events({
    'click .btn-submit-chata': function(e, tmpl) {
        var ancho = tmpl.find('.AnchoChata').value;
        var alto = tmpl.find('.AltoChata').value;
        var largo = tmpl.find('.LargoChata').value;
        var ejes = tmpl.find('.EjesChata').value;
        var clase = tmpl.find('.ClaseChata').value;
        var peso = tmpl.find('.PesoChata').value;
        var placa = tmpl.find('.PlacaChata').value;
        var socio = tmpl.find('.SocioChata').value;
        var marca = tmpl.find('.MarcaChata').value;
        var persona = Usuario.findOne({ _id: socio });
        var apellido = persona.Apellido + " " + persona.Nombre;
        if (NoVacio(ancho) &&
            NoVacio(alto) &&
            NoVacio(largo) &&
            NoVacio(ejes) &&
            NoVacio(clase) &&
            NoVacio(peso) &&
            NoVacio(placa) &&
            NoVacio(socio) &&
            NoVacio(marca)) {
            var data = {
                Tabla: "Chata",
                Ancho: ancho,
                Alto: alto,
                Largo: largo,
                Ejes: ejes,
                Clase: clase,
                Peso: peso,
                Placa: placa,
                Socio: socio,
                Marca: marca,
                Borrar: false,
                Habilitado: true,
                Estado: "Libre",
                Apellido: apellido
            };
            Meteor.call('ChataInsert', data, function(error) {
                if (error)
                    return throwError(error.reason);
            });
            $('#AnchoChata').val("").focus();
            $('#AltoChata').val("");
            $('#LargoChata').val("");
            $('#EjesChata').val("");
            $('#TipoChata').val("");
            $('#ClaseChata').val("");
            $('#PesoChata').val("");
            $('#PlacaChata').val("");
            $('#SocioChata').val("");
            $('#MarcaChata').val("");
        }
    }
});

Template.Crear_Chata.helpers({
    chata_list: function() {
        return Chata.find();
    },
    socio_list: function() {
        return Usuario.find({ Tipo: "Socio" });
    }
});

Template.lista_chata.helpers({
    editing_chata: function() {
        return Session.get('editing_chata');
    }
});

Template.lista_chata.events({
    'click .remove_chata': function(e, tmpl) {
        var id = this._id;
        Meteor.call('ChataRemove', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
    },

    'dblclick .student_row': function(e, tmpl) {
        Session.set('editing_chata', true);
    },

    'keyup .editBoxChata': function(e, tmpl) {
        var currentStudentId = this._id;
        if (e.which === 13) {
            var edit_placa = tmpl.find('.EditPlacaChata').value;
            var edit_marca = tmpl.find('.EditMarcaChata').value;
            var edit_clase = tmpl.find('.EditClaseChata').value;
            var edit_tipo = tmpl.find('.EditTipoChata').value;
            var edit_cliente = {
                id: currentStudentId,
                Placa: edit_placa,
                Marca: edit_marca,
                Clase: edit_clase,
                Socio: edit_tipo
            };

            Meteor.call('ChataUpdate', edit_cliente, function(error, result) {
                if (error)
                    return throwError(error.reason);
            });

            Session.set('editing_chata', false);
        }
    }
});

Template.reparto.helpers({
    chata_list: function() {
        return Chata.find({ Estado: "Libre" });
    },
    tracto_list: function() {
        return Tracto.find({ Estado: "Libre" }, { sort: { Sancion: 1, Apellido: 1 } });
    }
});

Template.Distribuir_Encomienda.events({
    'click .cambiar': function(e, tmpl) {
        Session.set('dist', true);
    }
});

Template.reparto.events({
    'click .accept_chata': function(e, tmpl) {
        event.preventDefault();
        Session.set('presente', true);
        $(event.target).removeClass("glyphicon-remove");
        $(event.target).addClass("glyphicon-ok");
        $(event.target).removeClass("accept_chata");
        $(event.target).addClass("unaccept_chata");
        var id = this._id;
        Meteor.call('accept_chata', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
        Session.set('pivote', id);
    },
    'click .unaccept_chata': function(e, tmpl) {
        event.preventDefault();
        Session.set('presente', false);
        $(event.target).removeClass("glyphicon-ok");
        $(event.target).addClass("glyphicon-remove");
        $(event.target).removeClass("unaccept_chata");
        $(event.target).addClass("accept_chata");
        var id = this._id;
        Meteor.call('reject_chata', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
        Session.set('pivote', "");
    },
    'click .accept_tracto': function(e, tmpl) {
        event.preventDefault();
        Session.set('presente', true);
        $(event.target).removeClass("glyphicon-remove");
        $(event.target).addClass("glyphicon-ok");
        $(event.target).removeClass("accept_tracto");
        $(event.target).addClass("unaccept_tracto");
        var id = this._id;
        Meteor.call('accept_tracto', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
    },
    'click .unaccept_tracto': function(e, tmpl) {
        event.preventDefault();
        Session.set('presente', false);
        $(event.target).removeClass("glyphicon-ok");
        $(event.target).addClass("glyphicon-remove");
        $(event.target).removeClass("unaccept_tracto");
        $(event.target).addClass("accept_tracto");
        var id = this._id;
        Meteor.call('reject_tracto', id, function(error) {
            if (error) {
                return throwError(error.reason);
            }
        });
    },
    'click .btn-repartir': function(e, tmpl) {
        event.preventDefault();
        var id = FlowRouter.getParam('id')
        var cargamento_info = Encomienda.findOne({ _id: id });
        var variables = new Object();
        var dominio = new Object();
        var convoy = new Object();
        var reparto = new Object();
        var Tractos = Tracto.find({ Habilitado: true }, { sort: { Sancion: 1, Apellido: 1 } });
        var Chatas = Chata.find({ Habilitado: true });
        var cont = 0;
        _.forEach(Tractos.fetch(), function(tracto) {
            var unidad = new Object();
            _.forEach(Chatas.fetch(), function(chata) {
                if (chata.Socio === tracto.Socio) {
                    _.extend(unidad, { Placa: { Tracto: tracto.Placa, Chata: chata.Placa } });
                    _.extend(unidad, { Peso: parseInt(tracto.Peso) + parseInt(chata.Peso) });
                    _.extend(unidad, { Sancion: tracto.Sancion }, { Dimenciones: { Alto: chata.Alto, Ancho: chata.Ancho, Largo: chata.Largo } });
                }
            });
            _.extend(convoy, {
                [cont]: unidad
            })
            cont = cont + 1;
        });
        _.extend(variables, {
            [id]: convoy
        })
        _.extend(dominio, { Cargamento_info: cargamento_info })
        console.log("DATOS PARA EL ALGORITMO:");
        //debugger;
        console.log("Informacion del reparto:");
        console.log(variables);
        console.log("Unidades de transporte tomados en cuenta:");
        console.log(dominio);
        ///////////////////////////////
        function PSR(variables, dominio, id, reparto) {
            var asignacion = new Object();
            var camiones = variables[id];
            var aux = [];
            var acum = 0;
            var contaux = 0;
            var restante;
            while (true) {
                if (dominio.Cargamento_info.Peso === 0 || dominio.Cargamento_info.Cantidad === 0) {
                    var acum = 0;
                    debugger;
                    console.log(reparto);
                    if (dominio.Cargamento_info.Especial === true) {
                        _.forEach(reparto, function(camion) {
                            aux[0] = camion.Cantidad;
                            aux[1] = camion.PlacaTracto;
                            acum += camion.Cantidad;
                            contaux++;
                        });
                        Meteor.call('RestarEncomiendaEspecial', dominio.Cargamento_info, function(error) {
                            if (error)
                                return throwError(error.reason);
                        });
                    } else {
                        _.forEach(reparto, function(camion) {
                            aux[0] = camion.Peso;
                            aux[1] = camion.PlacaTracto;
                            acum += camion.Peso;
                            contaux++;
                        });
                        _.forEach(camiones, function(camion) {
                            if (camion.PlacaTracto === aux[1]) {
                                restante = parseFloat(camion.Peso) + (parseFloat(aux[0] * 1000));
                            }
                        });
                        var restante = 28000 - restante;
                        if (restante > 4000) {
                            var promedio = acum / contaux;
                            _.forEach(reparto, function(camion) {
                                camion.Peso = promedio;
                            });
                        }
                        Meteor.call('RestarEncomiendaNormal', dominio.Cargamento_info, function(error) {
                            if (error)
                                return throwError(error.reason);
                        });
                    }
                    _.forEach(reparto, function(camion) {
                        console.log(camion);
                        Meteor.call('CargaInsert', camion, function(error) {
                            if (error)
                                return throwError(error.reason);
                        });
                        Meteor.call('OcuparCamion', camion, function(error) {
                            if (error)
                                return throwError(error.reason);
                        });
                        Meteor.call('OcuparChata', camion, function(error) {
                            if (error)
                                return throwError(error.reason);
                        });
                    });
                    if (dominio.Cargamento_info.Especial === false) {

                    } else {

                    }
                    Meteor.popUp("Distribuir_Carga");
                    break;
                } else {
                    if (dominio.Cargamento_info.Especial === true) {
                        console.log("Se esta repartiendo un cargamento especial");
                        _.forEach(camiones, function(camion) {
                            if (dominio.Cargamento_info.Cantidad > 0) {
                                if (((parseFloat(dominio.Cargamento_info.Alto) + parseFloat(camion.Dimenciones.Alto)) <= 4.2) && (Math.max(parseFloat(dominio.Cargamento_info.Ancho), parseFloat(camion.Dimenciones.Ancho)) <= 2.6) && (parseFloat(dominio.Cargamento_info.Largo) <= parseFloat(camion.Dimenciones.Largo))) {
                                    var cantidad = parseInt(parseFloat(camion.Dimenciones.Largo) / (parseFloat(dominio.Cargamento_info.Largo)));
                                    dominio.Cargamento_info.Cantidad -= cantidad;
                                    debugger;
                                    console.log("Se asignan ", cantidad, " al camion ", camion.Placa.Tracto);
                                    _.extend(asignacion, { PlacaTracto: camion.Placa.Tracto }, { PlacaChata: camion.Placa.Chata }, { Encomienda: id }, { Unidades: cantidad }, { Mostrado: false }, { Entregado: false });
                                    _.extend(reparto, {
                                        [cont]: asignacion
                                    });
                                    asignacion = {};
                                    cont++;
                                }
                            }
                            console.log("Fin del reparto.");
                        });
                    } else {
                        console.log("Se esta repartiendo un cargamento normal");
                        _.forEach(camiones, function(camion) {
                            debugger;
                            if (dominio.Cargamento_info.Peso > 0) {
                                var peso = 28000 - camion.Peso;
                                peso /= 1000;
                                if (peso > dominio.Cargamento_info.Peso) {
                                    _.extend(asignacion, { PlacaTracto: camion.Placa.Tracto }, { PlacaChata: camion.Placa.Chata }, { Encomienda: id }, { Peso: dominio.Cargamento_info.Peso }, { Mostrado: false }, { Entregado: false });
                                    _.extend(reparto, {
                                        [cont]: asignacion
                                    });
                                    dominio.Cargamento_info.Peso = 0;
                                    console.log("Se asigno ", peso, "al camion ", camion.Placa.Tracto);
                                    console.log("Fin del reparto");
                                } else {
                                    dominio.Cargamento_info.Peso -= peso;
                                    _.extend(asignacion, { PlacaTracto: camion.Placa.Tracto }, { PlacaChata: camion.Placa.Chata }, { Encomienda: id }, { Peso: peso }, { Mostrado: false }, { Entregado: false });
                                    _.extend(reparto, {
                                        [cont]: asignacion
                                    });
                                    asignacion = {};
                                    cont++;
                                    console.log("Se asigno ", peso, "al camion ", camion.Placa.Tracto);
                                }
                            }
                        });
                        debugger;
                        console.log("Se repartieron a las unidades de ", reparto);
                    }
                }
            }
        }
        ///////////////////////////////////
        var reparto = PSR(variables, dominio, id, reparto);
        //// Redireccionar a pagina de raparto de encomiendas
    }
});

Template.SecreChata.helpers({
    admin_list: function() {
        return Chata.find({});
    }
});
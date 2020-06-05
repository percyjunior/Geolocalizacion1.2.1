FlowRouter.route('/', {
    name: 'Home',
    action() {
        BlazeLayout.render('Main', {
            main: 'Home'
        });
    }
});
///////////// Presidente
FlowRouter.route('/RegistrarCliente', {
    name: 'RegCliente',
    action() {
        BlazeLayout.render('Main', {
            main: 'RegistrarCliente'
        });
    }
});
FlowRouter.route('/RegistrarPersonal', {
    name: 'RegPersonal',
    action() {
        BlazeLayout.render('Main', {
            main: 'RegistrarPersonal'
        });
    }
});
FlowRouter.route('/RegistrarSocio', {
    name: 'RegSocio',
    action() {
        BlazeLayout.render('Main', {
            main: 'RegistrarSocio'
        });
    }
});
FlowRouter.route('/RegistrarTracto', {
    name: 'RegTracto',
    action() {
        BlazeLayout.render('Main', {
            main: 'RegistrarTracto'
        });
    }
});
FlowRouter.route('/RegistrarChata', {
    name: 'RegChata',
    action() {
        BlazeLayout.render('Main', {
            main: 'RegistrarChata'
        });
    }
});
FlowRouter.route('/RegistrarSancion', {
    name: 'RegSancion',
    action() {
        BlazeLayout.render('Main', {
            main: 'RegistrarSancion'
        });
    }
});
FlowRouter.route('/RegistrarEncomienda', {
    name: 'RegEncomienda',
    action() {
        BlazeLayout.render('Main', {
            main: 'RegistrarEncomienda'
        });
    }
});
FlowRouter.route('/RegistrarGeolocalizacion', {
    name: 'RegGeolocalizacion',
    action() {
        BlazeLayout.render('Main', {
            main: 'RegistrarGeolocalizacion'
        });
    }
});
FlowRouter.route('/GeolocalizacionUnidad/:id', {
    name: 'UniGeolocalizacion',
    action() {
        BlazeLayout.render('Main', {
            main: 'UnidadGeolocalizacion'
        });
    }
});
FlowRouter.route('/GeolocalizacionEncomienda/:id', {
    name: 'EncoGeolocalizacion',
    action() {
        BlazeLayout.render('Main', {
            main: 'EncomiendaGeolocalizacion'
        });
    }
});
FlowRouter.route('/DistribuirEncomienda/', {
    name: 'Dist_Encomienda',
    action() {
        BlazeLayout.render('Main', {
            main: 'DistribuirEncomienda'
        });
    }
});
FlowRouter.route('/Reparto/:id', {
    name: 'Reparto',
    action() {
        BlazeLayout.render('Main', {
            main: 'Reparto'
        });
    }
});
/////////////////////Secretaria
FlowRouter.route('/AdminUsuario', {
    name: 'SecreUsuarios',
    action() {
        BlazeLayout.render('Main', {
            main: 'SecreUsuarios'
        });
    }
});
FlowRouter.route('/AdminCamion', {
    name: 'SecreCamion',
    action() {
        BlazeLayout.render('Main', {
            main: 'SecreCamion'
        });
    }
});
FlowRouter.route('/AdminSancion', {
    name: 'SecreSancion',
    action() {
        BlazeLayout.render('Main', {
            main: 'SecreSancion'
        });
    }
});
FlowRouter.route('/Secre/Registrar/Encomienda', {
    name: 'SecreEncomienda',
    action() {
        BlazeLayout.render('Main', {
            main: 'SecreEncomienda'
        });
    }
});
FlowRouter.route('/Secre/Reparto', {
    name: 'SecreReparto',
    action() {
        BlazeLayout.render('Main', {
            main: 'SecreReparto'
        });
    }
});
FlowRouter.route('/Secre/Carga', {
    name: 'SecreReparto',
    action() {
        BlazeLayout.render('Main', {
            main: 'SecreReparto'
        });
    }
});

///////////Socio

FlowRouter.route('/SocioInfo', {
    name: 'SocioInfo',
    action() {
        BlazeLayout.render('Main', {
            main: 'SocioInfo'
        });
    }
});
FlowRouter.route('/SocioCamion', {
    name: 'SocioCamion',
    action() {
        BlazeLayout.render('Main', {
            main: 'SocioCamion'
        });
    }
});
FlowRouter.route('/SocioCamion', {
    name: 'SocioCamion',
    action() {
        BlazeLayout.render('Main', {
            main: 'SocioCamion'
        });
    }
});
FlowRouter.route('/GeolocalizacionUnidad/Secre/:id', {
    name: 'UnidadGeolocalizacionSecre',
    action() {
        BlazeLayout.render('Main', {
            main: 'UnidadGeolocalizacionSecre'
        });
    }
});
FlowRouter.route('/SocioSancion', {
    name: 'SocioSancion',
    action() {
        BlazeLayout.render('Main', {
            main: 'SocioSancion'
        });
    }
});
FlowRouter.route('/SocioEncomienda', {
    name: 'SocioEncomienda',
    action() {
        BlazeLayout.render('Main', {
            main: 'SocioEncomienda'
        });
    }
});
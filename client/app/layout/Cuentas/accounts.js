Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
            fieldName: 'nombre',
            fieldLabel: 'Nombres',
            inputType: 'text',
            visible: true,
            validate: function(value, errorFunction) {
                if (!value) {
                    errorFunction("Porfavor ingrese su nombre completo");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            fieldName: 'apellido',
            fieldLabel: 'apellidos',
            inputType: 'text',
            visible: true,
            validate: function(value, errorFunction) {
                if (!value) {
                    errorFunction("Porfavor ingrese su nombre completo");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            fieldName: 'Rol',
            fieldLabel: 'Rol',
            inputType: 'select',
            showFieldLabel: true,
            empty: 'Porfavor ingrese su Rol de usuario',
            data: [{
                id: 1,
                label: 'Presidente',
                value: 'Presidente'
            }, {
                id: 2,
                label: 'Secretaria',
                value: 'Secretaria',
            }, {
                id: 3,
                label: 'Socio',
                value: 'Socio'
            }, {
                id: 4,
                label: 'Cliente',
                value: 'Cliente'
            }],
            visible: true
        }, {
            fieldName: 'Genero',
            showFieldLabel: false, // If true, fieldLabel will be shown before radio group
            fieldLabel: 'Genero',
            inputType: 'radio',
            radioLayout: 'vertical', // It can be 'inline' or 'vertical'
            data: [{ // Array of radio options, all properties are required
                id: 1, // id suffix of the radio element
                label: 'Hombre', // label for the radio element
                value: 'h' // value of the radio element, this will be saved.
            }, {
                id: 2,
                label: 'Mujer',
                value: 'm',
                checked: 'checked'
            }],
            visible: true
        }, {
            fieldName: 'Empresa',
            fieldLabel: 'Empresa',
            inputType: 'text',
            showFieldLabel: true,
            visible: true
        }
    ]
});

accountsUIBootstrap3.setLanguage('es'); // for Spanish

accountsUIBootstrap3.setCustomSignupOptions = function() {
    return {
        referrerId: Session.get('referrerId') // Or whatever
    }
}

accountsUIBootstrap3.logoutCallback = function(error) {
    if (error) console.log("Error:" + error);
    Router.go('/');
}
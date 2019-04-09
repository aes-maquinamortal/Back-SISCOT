const UsuarioModel = require('../models/usuario.model');
const ClienteModel = require('../models/cliente.model');
const ProveedorModel = require('../models/proveedor.model');
const ConfigMensaje = require('../middleware/configMensaje');
const { raw } = require('objection');
const jwt = require('jsonwebtoken');

_createUsuario = (usuarioInput) => {
    const usuarioModel = UsuarioModel.query()
            .insert(usuarioInput);
    return usuarioModel;
}

module.exports = {
    registerClient: async (args) => {
        // TODO: llamar _createUsuario(usuario, password, 'CLIENTE')
        await _createUsuario(args.usuarioInput);
        const clienteModel = await ClienteModel.query()
            .insert(args.clienteInput);
        ConfigMensaje(args.usuarioInput.correo, args.clienteInput.nombre, 'Cliente Creado', 'Se crea el Usuario');
        return clienteModel
    },

    registerSupplier: async (args) => {
        // TODO: llamar _createUsuario(usuario, password, 'PROVEEDOR')
        await _createUsuario(args.usuarioInput);
        const proveedorModel = await ProveedorModel.query()
            .insert(args.proveedorInput);
        ConfigMensaje(args.usuarioInput.correo, args.proveedorInput.nombre, 'Proveedor Creado', 'Se crea el Usuario');
        return proveedorModel
    },

    login: async ({ usuario, password }) => {
        const usuarioModel = await UsuarioModel.query()
            .where(raw('lower(usuario)'), usuario.toLowerCase());
        if(usuarioModel.length !== 1) {
            throw new Error('Credenciales incorrectas')
        }
        // TODO: Validate if password is the same. Use bcrypt to check it
        const usuarioData = {
            usuario: usuarioModel[0].usuario,
            userType: usuarioModel[0].tipo
        }
        const token = jwt.sign(usuarioData, 'somerandomkey');
        usuarioData.token = token;
        return usuarioData;
    }
}
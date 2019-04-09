const UsuarioModel = require('../models/usuario.model');
const ClienteModel = require('../models/cliente.model');
const ProveedorModel = require('../models/proveedor.model');
const { raw } = require('objection');
const jwt = require('jsonwebtoken');

_createUsuario = (usuario, password, tipo) => {
    // TODO: crear usuario
}

module.exports = {
    registerClient: async (args) => {
        // TODO: llamar _createUsuario(usuario, password, 'CLIENTE')
        const usuarioModel = await UsuarioModel.query()
            .insert(args.usuarioInput);
        const clienteModel = await ClienteModel.query()
            .insert(args.clienteInput);
        return clienteModel
    },

    registerSupplier: async (args) => {
        // TODO: llamar _createUsuario(usuario, password, 'PROVEEDOR')
        const usuarioModel = await UsuarioModel.query()
            .insert(args.usuarioInput);
        const proveedorModel = await ProveedorModel.query()
            .insert(args.proveedorInput);
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
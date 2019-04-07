const UsuarioModel = require('../models/usuario.model');
const ClienteModel = require('../models/cliente.model');
const ProveedorModel = require('../models/proveedor.model');
const { raw } = require('objection');
const jwt = require('jsonwebtoken');

module.exports = {
    registerClient: async (args) => {
        const clienteModel = await ClienteModel.query()
            .insert(args.clienteInput);
        return clienteModel
    },

    registerSupplier: async (args) => {
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
            userType: ''
        }
        const token = jwt.sign(usuarioData, 'somerandomkey');
        usuarioData.token = token;
        return usuarioData;
    }
}
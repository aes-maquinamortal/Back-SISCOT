const UsuarioModel = require('../models/usuario.model');
const { raw } = require('objection');
const jwt = require('jsonwebtoken');

module.exports = {
    registerClient: async (args) => {
        // TODO: crear un cliente
    },

    registerSupplier: async (args) => {
        // TODO: crear un proveedor
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
const UsuarioModel = require('../models/usuario.model');
const ClienteModel = require('../models/cliente.model');
const ProveedorModel = require('../models/proveedor.model');
const ConfigMensaje = require('../middleware/configMensaje');
const bcrypt = require('bcrypt');
const { raw } = require('objection');
const jwt = require('jsonwebtoken');

_createUsuario = (usuarioInput) => {
    usuarioInput.password = bcrypt.hashSync(usuarioInput.password, 10);
    const usuarioModel = UsuarioModel.query()
            .insert(usuarioInput);
    return usuarioModel;
}

module.exports.Query = {
    login: async (_, { usuario, password }) => {
        const usuarioModel = await UsuarioModel.query()
            .where(raw('lower(usuario)'), usuario.toLowerCase());
        if(usuarioModel.length !== 1) {
            throw new Error('Credenciales incorrectas')
        }
        const arePasswordsEqual = await bcrypt.compare(password, usuarioModel[0].password);
        if (!arePasswordsEqual)
            throw new Error('Credenciales incorrectas')

        const usuarioData = {
            usuario: usuarioModel[0].usuario,
            userType: usuarioModel[0].tipo
        }
        const token = jwt.sign(usuarioData, 'somerandomkey');
        usuarioData.token = token;
        return usuarioData;
    }
}

module.exports.Mutation = {
    registerClient: async (_, args) => {
        await _createUsuario(args.usuarioInput);
        args.clienteInput.usuario = args.usuarioInput.usuario;
        const clienteModel = await ClienteModel.query()
            .insert(args.clienteInput);
        ConfigMensaje(args.usuarioInput.correo, args.clienteInput.nombre, 'Cliente Creado', 'Se crea el Usuario');
        return clienteModel
    },

    registerSupplier: async (_, args) => {
        await _createUsuario(args.usuarioInput);
        args.proveedorInput.usuario = args.usuarioInput.usuario;
        const proveedorModel = await ProveedorModel.query()
            .insert(args.proveedorInput);
        ConfigMensaje(args.usuarioInput.correo, args.proveedorInput.nombre, 'Proveedor Creado', 'Se crea el Usuario');
        return proveedorModel
    },
}
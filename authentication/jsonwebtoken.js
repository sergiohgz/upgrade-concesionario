const jwt = require('jsonwebtoken');

const signIn = (usuario, secret) => {
    const token = jwt.sign(
        {
            uid: usuario._id,
            nombre: usuario.nombre, // undefined porque no tenemos nombre en la DB, pero podemos añadirlo en un futuro
            peras: 5,
            manzanas: 10,
            frase: 'hola mundo',
            // ...
        },
        secret,
        { expiresIn: '1h' }
    );

    return token;
};

module.exports = { signIn };

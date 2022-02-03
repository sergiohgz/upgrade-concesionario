const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const authorization = req.headers.authorization;
    // Bearer <token> => token de JWT que verificaremos

    if (!authorization) {
        return res.status(401).json("No está autorizado");
    }

    // Separar Bearer y token
    const separados = authorization.split(' ') // se separan por un espacio
    if (separados.length !== 2 || separados[0] !== 'Bearer') {
        return res.status(400).json('Cabecera de auth mal formada');
    }

    // Obtenemos el token que hemos separado de la cabecera
    const [, token] = separados;
    // const token = separados[1];

    try {
        const tokenInfo = jwt.verify(token, req.app.get('jwt-secret'));
        req.authority = {
            id: tokenInfo.uid,
            frase: tokenInfo.frase,
            manzanas: tokenInfo.manzanas,
            nombre: tokenInfo.nombre,
        };

        next();
    } catch (error) {
        return res.status(403).json(error);
    }
};

// const isAdmin = (req, res, next) => {
//     if(req.user.role === 'ADMIN') {
//         return next();
//     }
//     return res.status(403).json('Acceso prohibido')
// }

module.exports = {
    isAuthenticated,
    // isAdmin,
};

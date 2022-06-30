// ? Crear una funcion que genere un token alfanumerico aleatorio de 8 caracteres

const generateToken = () => {
  return Math.random().toString(36).substring(2)
};

module.exports = {
  generateToken
};
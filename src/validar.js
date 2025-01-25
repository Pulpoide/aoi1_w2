module.exports = {
  validarForm(username, email, message) {
    const errores = [];

    if (!username || username.length < 3) {
      errores.push("El nombre debe tener al menos 3 caracteres.");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errores.push("El email debe tener un formato válido.");
    }
    if (!message || message.length < 10) {
      errores.push("El mensaje debe tener al menos 10 caracteres.");
    }

    return errores;
  }
};



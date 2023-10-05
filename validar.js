module.exports = {
    
validarForm(nombre, email, res){
    if(nombre.length < 3){
        res.end("Nombre demasiado corto");
      }else if(!email.includes("@") || !email.includes(".")){
        res.end("Coloque un email existente");
      }
}

};


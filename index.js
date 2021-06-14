
const express = require('express');
const host = 'localhost';
const port = 80;
const app = express(); 

app.listen(port,host, () =>{
  console.log('Server '+host+' en el puerto: '+port);
 
});

//MIDDLEWARES
function logger(req,res,next) {
    console.log('Ruta recibida: '+req.protocol+'://'+req.get('host')+req.originalUrl+' a traves de: '+req.method)
    next();// si no ejecuto el next el middleware no pasa hasta las rutas
}
app.use(express.static(__dirname+'/public'))// middleware para usar archivos estaticos
app.use(logger)  //Middleware que me informa de la ruta pedida y el metodo http usado
app.use(express.json()); // Middleware que permite que el servidor lea y envie JSON


// ENRUTAMIENTOS

app.get('/',(req,res)=>{
   res.writeHead(200,{"Content-Type":"text/plain"})
   res.end('Hola, este es mi servidor')
   res.sendFile(__dirname+'/public/index.html')      // aca agrego una pagina principal estatica
})

app.get('/estudiantes',(req,res)=>{
 
    res.json({
      nombre1:'Hector',
      cedula1:'26877841',
      nombre2:'Yudith',
      cedula2:'27628712'
  });
    console.log('se mostro el listado de estudiantes')
 
})

app.post('/estudiantes',(req,res)=>{
  res.send('inscribir nuevo estudiante')
  console.log('se envio formulario de inscripcion')

})

app.put('/estudiantes/:id',(req,res)=>{
  res.send('actualizando a estudiante nro: '+req.params.id)
  console.log('se envio formulario de actualizacion al estudiante nro : '+req.params.id)

})

app.delete('/estudiantes/:id',(req,res)=>{
  res.send('estudiante '+req.params.id+' se ha eliminado')
  console.log('se elimino al estudiante nro : '+req.params.id)
})

//MIDDLEWARE 404.

/* este es un middleware que se ejecuta de una con un callback
lo coloque al final para que cuando no encuentre las rutas correctas
caiga aca sea cual sea el metodo http y tener una especie de manejador de error*/

app.use((req,res)=>{
    res.status(404)
    res.sendFile(__dirname+'/public/error404.html')
})

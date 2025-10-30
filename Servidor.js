const express=require('express');
const app=express();
const port=3000;
const operaciones=require('./ModuloPersonas/Personas');
const operacionesEP=require('./Modulo_entradas/palco');
const operacionesEG=require('./Modulo_entradas/gradería');
const operacionesEPL=require('./Modulo_entradas/platea');
app.use(express.json());

//-PERSONAS-
app.get('/personas',(req,res)=>{
    const personas=operaciones.listarPersonas();
    res.json(personas);
});
app.post('/agregar', (req, res) => {
    operaciones.agregarPersona(req.body);
    res.json({ mensaje: 'Persona agregada exitosamente' });
});

app.get('/buscar/:rut',(req,res)=>{
    const rut=req.params.rut;
    const persona=operaciones.buscarPersonaPorRut(rut);
    if(persona){
        res.json(persona);
    }else{
        res.status(404).json({error:'Persona no encontrada'});
    }
});     
app.put('/actualizar/:rut',(req,res)=>{ // PENDIENTE 
    const Rut=req.params.rut;
    const nuevosDatos=req.body;
    const exito=operaciones.actualizarPersona(Rut,nuevosDatos);
    if(exito){
        res.json({mensaje:'Persona actualizada exitosamente'});
    }
    else{
        res.status(404).json({error:'Persona no encontrada'});
    }   
});
app.delete('/eliminar/:Rut',(req,res)=>{
    const Rut=req.params.Rut;
    const exito=operaciones.eliminarPersona(Rut);
    if(exito){
        res.json({mensaje:'Persona eliminada exitosamente'});
    }else{
        res.status(404).json({error:'Persona no encontrada'});
    }
}); 
//--FIN PERSONAS--

// ENTRADAS PALCO
app.get('/entradas',(req,res)=>{

    const PALCO=operacionesEP.ObtenerE();
    res.json(PALCO);
});
app.post('/agregarEP', (req, res) => {
   
    operacionesEP.AgregarE(req.body);
    res.json({ mensaje: 'Entrada ingresada correctamente' });
});

    
app.put('/actualizarEP/:id',(req,res)=>{ 
    const id=parseInt(req.params.id);
    const nuevosDatos=req.body;
    const exito=operacionesEG.ActualizarEG(id,nuevosDatos);
    if(exito){
        res.json({mensaje:'Datos actualizados'});
    }
    else{
        res.status(404).json({error:'Entrada no encontrada'});
    }   
});
app.delete('/eliminarE/:id',(req,res)=>{
    const id = parseInt(req.params.id); 
    const exito=operacionesEG.EliminarEG(id);
    if(exito){
        res.json({mensaje:'Entrada eliminada'});
    }else{
        res.status(404).json({error:'Hubo un error al eliminar la entrada'});
    }
}); 
//--FIN ENTRADAS PALCO--
app.get('/entradasG',(req,res)=>{

    const GRADERIA=operacionesEG.ObtenerEG();
    res.json(GRADERIA);
});
app.post('/agregarEG', (req, res) => {
   
    operacionesEG.AgregarEG(req.body);
    res.json({ mensaje: 'Entrada ingresada correctamente' });
});

    
app.put('/actualizarEG/:id',(req,res)=>{ 
    const id=parseInt(req.params.id);
    const nuevosDatos=req.body;
    const exito=operacionesEG.ActualizarEG(id,nuevosDatos);
    if(exito){
        res.json({mensaje:'Datos actualizados'});
    }
    else{
        res.status(404).json({error:'Entrada no encontrada'});
    }   
});
app.delete('/eliminarG/:id',(req,res)=>{
    const id = parseInt(req.params.id); 
    const exito=operacionesEG.EliminarEG(id);
    if(exito){
        res.json({mensaje:'Entrada eliminada'});
    }else{
        res.status(404).json({error:'Hubo un error al eliminar la entrada'});
    }
});  

//--FIN ENTRADAS GRADERIA--

//--PLATEA--
app.get('/entradasPL',(req,res)=>{

    const PLATEA=operacionesEPL.ObtenerEPL();
    res.json(PLATEA);
});
app.post('/agregarPL', (req, res) => {
   
    operacionesEPL.AgregarEPL(req.body);
    res.json({ mensaje: 'Entrada ingresada correctamente' });
});

    
app.put('/actualizarPL/:id',(req,res)=>{ 
    const id=parseInt(req.params.id);
    const nuevosDatos=req.body;
    const exito=operacionesEPL.ActualizarEPL(id,nuevosDatos);
    if(exito){
        res.json({mensaje:'Datos actualizados'});
    }
    else{
        res.status(404).json({error:'Entrada no encontrada'});
    }   
});
app.delete('/eliminarPL/:id',(req,res)=>{
    const id = parseInt(req.params.id); 
    const exito=operacionesEPL.EliminarEPL(id);
    if(exito){
        res.json({mensaje:'Entrada eliminada'});
    }else{
        res.status(404).json({error:'Hubo un error al eliminar la entrada'});
    }
});  
app.listen(port,()=>{
    console.log(`Servidor escuchando en http://localhost:${port}`);
}   );
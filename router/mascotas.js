const express = require('express');
const req = require('express/lib/request');
const { json } = require('express/lib/response');
const router = express.Router();

const Mascota = require('../models/mascota');
const { route } = require('./rutasWeb');

router.get('/', async(req , res) =>{

    try{
        const arrayMascotasDB = await Mascota.find()
        //console.log(arrayMascotasDB)

        res.render('mascotas',{
            arrayMascotasDB
            // arrayMascotas: [
            //     {id: '0001', nombre: 'kity', descripcion: 'gato'},
            //     {id: '0002', nombre: 'toby', descripcion: 'perro blanco'},  ]
        })
    }catch(error){
        console.log(error)
    }

})

router.get('/crear', (req, res) =>{
    res.render('crear')
})

router.post('/', async(req, res) =>{
    const body = req.body
    try{
        //const mascotaDB = new Mascota(body)
        //await mascotaDB.save()
        await Mascota.create(body)
        res.redirect('/mascotas')

    }catch(error){
        console.log(error);
    }
})

router.get('/:id', async(req, res) =>{
    const id = req.params.id
    try{
        const mascotaDB = await Mascota.findOne({_id: id})
        console.log(mascotaDB)
        res.render('detalle', {
          element: mascotaDB,
          error: false   
        })
    }catch(error){
        console.log(error)
        res.render('detalle',{
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })
    }
})
//eliminar document
router.delete('/:id', async(req, res) =>{
    const id = req.params.id
    try{
        const mascotaDB = await Mascota.findByIdAndDelete({_id:id})
        if(mascotaDB){
            res.json({
                estado: true,
                mensaje: 'eliminado'
            })
        }else{
            res.json({
                estado: false,
                mensaje: 'fallo eliminado'
            })
        }
    }catch(error){
        console.log(error)
    }
})
//editar document
router.put('/:id',async(req, res)=>{
    const id = req.params.id
        const body = req.body
    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(
            id, body, { useFindAndModify: false })
            console.log(mascotaDB)
            res.json({
                estado: true,
                mensaje:'editado'
            })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje:'fallo'
        })
    }
})
module.exports = router;

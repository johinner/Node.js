const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota')

router.get('/', async(req , res) =>{

    try{
        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)

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


module.exports = router;

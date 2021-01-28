const {response} = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req,res = response) => {

    const eventos = await Evento.find()
                                .populate('user','name');
    

    try {
        res.status(201).json({
            ok:true,
            eventos
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el dministrador'
        });
    }
}

const crearEvento = async (req, res= response) =>{

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
        const eventoGuardado =  await evento.save();

        res.status(201).json({
            ok:true,
            evento: eventoGuardado
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }
}

const actualizarEvento = async(req, res = response) =>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no exite por ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para realizar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //para que devuelva el objeto actualizado es el {new:true}
        //sino devuelve el viejo
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});

        res.json({
            ok:true,
            eventoActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const eliminarEvento = async(req, res = response) =>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no exite por ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para realizar este evento'
            })
        }

       
        //para que devuelva el objeto actualizado es el {new:true}
        //sino devuelve el viejo
        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok:true,
            msg:'Evento eliminado'
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}

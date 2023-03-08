const express=require('express');
const fetchUser = require('../middleware/fetchUser');
const router =express.Router();
const Notes=require('../models/notes');
router.get('/fetchallNotes',fetchUser,async (req,res)=>{
    console.log("HII");
    const db=await Notes.find({user:req.user});
    res.send(db);
})
router.post('/addNotes',fetchUser,async (req,res)=>{
    // console.log(req.body);
   const  {title,description}=req.body;
   const note=await Notes.create({title:title,description:description,user:req.user});
   res.send(note);
})
router.delete('/deleteNotes/:id',fetchUser,async (req,res)=>{
    let note=await Notes.findById(req.params.id)
    
    if(!note)
    {
        return res.status(404).send("Note doesnt exist");
    }
    if(note.user.toString()==req.user)
    {
        note =await Notes.findByIdAndDelete(req.params.id);
       return  res.send(note);
    }
    else
    {
        return res.status(401).send("Not allowed ");
    }
})
router.put('/updateNotes/:id',fetchUser,async (req,res)=>{
    const  {title,description}=req.body;
    let note=await Notes.findById(req.params.id)
    console.log(note);
    if(!note)
    {
        return res.status(404).send("Note doesn't exist");
    }
    if(title!=null)
    {
        note.title=title;
    }
    if(description!=null)
    {
        note.description=description;
    }
    if(note.user.toString()==req.user)
    {
        note =await Notes.findByIdAndUpdate(req.params.id,{$set:note},{new:true});
       return  res.send(note);
    }
    else
    {
        return res.status(401).send("Not allowed ");
    }
})
module.exports=router;
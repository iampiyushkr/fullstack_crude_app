const User=require("../model/user.model")
const express=require("express")
const router=express.Router();
//const Book=require("../model/book.model")

router.post("", async (req, res) => {
    const user = await User.create(req.body);
  
    return res.status(201).json({ user });
  });

  router.patch("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
  
    return res.status(201).json({ user });
  });
  
  // get all user
  
  router.get("", async (req, res) => {
    // const section = await User.find().lean().exec();
    // return res.status(200).json({ section });

    const page =+req.query.page || 1;
    const size =+req.query.size || 10;

    const offset=(page-1)*size;

    const section=await User.find().skip(offset).limit(size).lean().exec()
    const totalDocument=await User.find().countDocuments();
    const totalPages=Math.ceil(totalDocument/size)
    return res.status(200).json({section,totalPages})
  });


  router.get("/:id", async (req, res) => {
    const section = await User.findById(req.params.id).lean().exec();
    return res.status(200).json({ section });
  });


  router.delete("/:id", async (req, res) => {
    const section = await User.findByIdAndRemove(req.params.id);
    return res.status(200).json({ section });
  });
  router.get("/:id/books", async (req, res) => {
    const comments = await Book.find({ sectionId:{_id:req.params.id}  }).lean().exec();
    const post = await User.findById(req.params.id).lean().exec();
  
    return res.status(200).json({ comments, post });
  });
  module.exports=router;
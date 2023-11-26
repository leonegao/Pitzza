const express =require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

// POST (Create data)
router.post('/',verifyToken,async(req,res)=>{ 
    const postData = new Post({
        user:req.body.user,
        topic :req.body.topic ,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url,
        likes:req.body.likes,
        not_likes:req.body.not_likes,
        comments:req.body.comments,
        message:req.body.message,
        expired:req.body.expired 
    })
    // try to insert...
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

// Find  all the post expired
router.get('/',verifyToken, async(req,res) =>{
    try{
        const getPosts = await Post.find()
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})
// find the post that expired
router.get('/expired/:expired', verifyToken, async (req, res) => {
    try {
      const expired = req.params.expired;
      const getPostByTitle = await Post.find({ expired: expired });
      if (getPostByTitle.length > 0) {
        res.send(getPostByTitle);
      } else {
        res.send({ message: 'No posts expired' });
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  });
// find  the post  by ID
router.get('/:postId',verifyToken, async(req,res) =>{
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
}) 
// find the post by topic 
router.get('/topic/:topic', verifyToken, async (req, res) => {
    try {
      const topic = req.params.topic;
      const getPostByTitle = await Post.find({ topic: topic });
      if (getPostByTitle.length > 0) {
        res.send(getPostByTitle);
      } else {
        res.send({ message: 'No posts found with that topic' });
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  });
// like the post
router.patch("/:postId/likes",verifyToken,async(req,res) =>{ 
    try{ 
        const postId = req.params.id;
        const updatePostById = await Post.updateOne( 
            {_id:req.params.postId},{$inc:{ likes:1 }})
            
            res.send(updatePostById)
       }catch(err){ 
           res.send({message:err}) } })
           
// not like the post
router.patch("/:postId/not_likes",verifyToken,async(req,res) =>{ 
    try{ 
        const updatePostById = await Post.updateOne( 
             {_id:req.params.postId}, {$inc:{ not_likes:1 } } )
                  res.send(updatePostById) 
        }catch(err){ 
                   res.send({message:err}) } })

// Dislike the post
router.patch('/:postId/dislikes',verifyToken, async(req,res) =>{
    try{
        const dislikePostById = await Post.updateOne(
            {_id:req.params.postId}, {$inc: {likes: -1}})
                res.send(dislikePostById);
    }catch(err){
        res.send({message:err})
    }
})

//add comments
router.patch('/:postId/comments',async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                comments:req.body.comments
                }
            })
        
        res.send({ message: "Comment added successfully", post: updatePostById});     
    }catch(err){
        res.send({message:err})
    }
})

//add message
router.patch('/:postId/message', async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                message:req.body.message
                }
            })
        res.send({message: "message added successfully",post:updatePostById})
    }catch(err){
        res.send({message:err})
    }
})
module.exports = router

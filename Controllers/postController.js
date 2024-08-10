import Post from "../Models/Post.js";
import User from "../Models/User.js";



export const createPost = async(req,res)=>{
    const authorId = req.id;
    const authorAccountType = req.accountType;
    if(authorAccountType === "buyer"){
        return res.status(403).json({success:false,message:"Forbidden, only sellers can post"});
    }
    const {title,price,author,image,publicId}=req.body;
try {
   const post = new Post({
    title,
    price,
    author,
    image,
    publicId,
    authorId,

   });
   await post.save();
   await User.findByIdAndUpdate(authorId,{
    $push :{uploads:post._id}
   });
    
   return res.status(200).json({success:true,message:"Post created successfully",post});
} catch (error) {
    return res.status(500).json({success:false,message:error.message});
}
}


export const getAllPost = async(req,res)=>{
try {
    const posts = await Post.find({})
    if(posts.length === 0){
        return res.status(403).json({success:false,message:"No Post found"});
    }
    return res.status(200).json({success:true,data:posts});
} catch (error) {
    return res.status(500).json({success:false,message:error.message});
}
}


export const getMyPosts =async(req,res)=>{
    const authorId = req.id;
    const authorAccountType = req.accountType;
try {
    if(authorAccountType === "buyer"){
        const {purchased} = await User.findById(authorId).populate("purchased")
        console.log(purchased);
        if(!purchased){
            return res.status(403).json({success:false,message:"No post found"});
        }
        return res.status(200).json({success:true,data:purchased});
    }
    else{
        const {uploads} = await User.findById(authorId).populate("uploads");
        console.log(uploads);
        if(!uploads){
            return res.status(403).json({success:false,message:"No post found"});
        }
        return res.status(200).json({success:true,data:uploads});
    }

    
} catch (error) {
    return res.status(500).json({success:false,message:error.message});
}
}

export const deletePost = async(req,res)=>{
try {
    const {id} = req.params ;
  const post = await Post.findById(id);
  if(!post){
    return res.status(404).json({success:false,message:"Post not found"});
  }
  const {authorId} = post
  await User.findByIdAndUpdate(authorId,{
    $pull : {uploads : id},
  });
  return res.status(200).json({success:true, message:"Post deleted successfully"});
} catch (error) {
    
    return res.status(500).json({success:false,message:error.message});
}
}

export const searchPost = async(req,res)=>{
    const {search} = req.query;
try {
    const post =await Post.find({title:{$regex :search , $options:"i"}}); 
    if(post.length === 0){
        return res.status(404).json({success:false,message:"No Post found"});
    }
    return res.status(200).json({success:true,data:post});
} catch (error) {
    return res.status(500).json({success:false,message:error.message});
}
}

export const addToFavourites = async(req,res)=>{
try {
    const {authorId} = req.id;
    const postId = req.params;
    const user = await User.findByIdAndUpdate(authorId,{
        $push:{favourites:postId}
    })
    if(!user){
        return res.status(404).json({success:false,message:"User not found"});
    }
    return res.status(200).json({success:true,message:"Post added to favourites"});
} catch (error) {
    return res.status(500).json({success:false,message:error.message});
}
}

export const removeFromFavourites = async(req,res)=>{
    try {
        const {authorId} = req.id;
        const postId = req.params;
        const user = await User.findByIdAndUpdate(authorId,{
            $pull:{favourites:postId}
        })
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        return res.status(200).json({success:true,message:"Post removed from favourites"});
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
 }

 export const getFavourites = async(req,res)=>{
    try {
        const authorId = req.id;
        const {favourites} = await User.findById(authorId).populate("favourites");
        if(!favourites){
            return res.status(404).json({success:false,message:"No favourites added"});
        }
        return res.status(200).json({success:true, data:favourites});
     } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
 }
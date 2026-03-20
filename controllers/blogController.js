import blogService from "../services/blogService.js";

export async function createPost(req, res) {
  try {
    // attach user_id to the data
    const postData = {
      ...req.body,        // all data sent by the client
      user_id: req.user.id // add the user ID
    };

    const post = await blogService.createPost(postData);
    res.status(201).json(post);

  } catch (error) {
    next(error);
  }
}

export async function getPosts(req, res) {
    try {
        const posts = await blogService.getPosts();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
  
}

export async function getPostById(req, res, next) {
  try {
    const post = await blogService.getPostById(req.params.id); 
    res.status(200).json(post);
  } catch (error) {
    next(error); // passes this to central handler
  }
}
export async function updatePost(req,res){
    try {

        const postData = {
        ...req.body,
        user_id : req.user.id
        };
        const post = await blogService.updatePost(req.params.id, postData);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
    
}
export async function deletePost(req,res) {
    try {
    const result = await blogService.deletePost(req.user.id);
    res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}
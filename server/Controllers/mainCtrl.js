module.exports = {

    editProfile: async (req, res) => {
        console.log('hit editprofile')
        const db = req.app.get('db'),
        {id} = req.params,
        {first_name, last_name, username, profile_pic} = req.body,
        
        updated = await db.edit_profile({id,first_name, last_name, username, profile_pic});
        if (!updated[0]){
            return res.status(200).send(updated)
        }
    },

    createPost: async (req, res) => {
        const db = req.app.get('db'),
        {author_id} = req.params,
        {title, image, content} = req.body

    posted = await db.create_post({title, image, content, author_id});
    if(!posted[0]){
        return res.status(200).send(posted)
        }
    },

    getPosts: async (req, res) => {
        const db = req.app.get('db'),
        
    allPosts = await db.get_all_posts();
    return res.status(200).send(allPosts)
    },


    getUserPosts: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params

    userPosts = await db.get_user_post(id);
    if(!userPosts[0]){
        return res.status(200).send(userPosts)
        }
    },


    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const {id}= req.params,

    removePost = await db.delete_post(id)
    return res.status(200).send(removePost)
    },

    updateWallpaper: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params,
        {wallpaper} = req.body
        console.log(id. wallpaper)
    addWallpaper = await db.add_wallpaper([id, wallpaper]);
        return res.status(200).send(addWallpaper)
    }


}
import PostModel from "@/models/PostModel";
import "@/models/UsersModel";
import connectDB from "@/config/connectDB";
import SortingPost from "@/utils/SortingPosts";

//@desc:    fetch all approved posts
//@access:   private users
export const fetchNewsfeed = async () => {
   try {
      await connectDB();

      const response = await PostModel.find({ status: "approved" })
         .sort({ createdAt: -1 })
         .populate("user");

      const sorted = await SortingPost(response);

      return sorted;
   } catch (err) {
      console.log(err);
   }
};

// @desc:  fetch single post
// @access:  private users
export const fetechSinglePost = async (id) => {
   try {
      await connectDB();
      const response = await PostModel.findById(id)
         .populate("user")
         .populate("comments.user");
      return response;
   } catch (err) {
      console.log(err);
   }
};

// @desc:  fetch awareness post
// @access:  private users
export const fetchAwareness = async () => {
   try {
      await connectDB();
      const response = await PostModel.find({ postType: "awareness" })
         .sort({ createdAt: -1 })
         .populate("user");

      const sorted = await SortingPost(response);
      return sorted;
   } catch (err) {
      console.log(err);
   }
};

// @desc:  fetch fundraiser post
// @access:  private users
export const fetchFundraiser = async () => {
   try {
      await connectDB();
      const response = await PostModel.find({ postType: "fundraiser" })
         .sort({ createdAt: -1 })
         .populate("user");

      const sorted = await SortingPost(response);
      return sorted;
   } catch (err) {
      console.log(err);
   }
};

// @desc:  fetch business promotion post
// @access:  private users
export const fetchBusinessPromotion = async () => {
   try {
      await connectDB();
      const response = await PostModel.find({ postType: "businessPromotion" })
         .sort({ createdAt: -1 })
         .populate("user");

      const sorted = await SortingPost(response);
      return sorted;
   } catch (err) {
      console.log(err);
   }
};

// @desc:  fetch all post of a single user
// @access:  private users
export const fetchPostByUser = async (userId) => {
   try {
      await connectDB();
      const response = await PostModel.find({ user: userId })
         .sort({ createdAt: -1 })
         .populate("user");
      return response;
   } catch (err) {
      console.log(err);
   }
};

// @ desc:  fetch all post
// @ access:  private admin
export const fetchAllPost = async () => {
   try {
      await connectDB();
      const response = await PostModel.find({})
         .populate("user")
         .sort({ createdAt: -1 });
      let posts = response.map((doc) => {
         const post = doc.toObject();
         post._id = post._id.toString(); // Convert _id to a string
         post.user = post.user.name;
         post.likes = post.likes.length;
         post.comments = post.comments.length;
         return post;
      });
      return posts;
   } catch (err) {
      console.log(err);
   }
};

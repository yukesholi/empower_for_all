const calculateAndSortPosts = async (posts) => {
   // Fetch all posts

   // Calculate a score for each post
   const scoredPosts = posts.map((post) => {
      const likeScore = post.likes.length * 1; // 1 point for each like
      const commentScore = post.comments.length * 2; // 2 points for each comment

      // Subtract 1 point for each day since the post was created
      const ageInDays =
         (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      const ageScore = -1 * ageInDays;

      const totalScore = likeScore + commentScore + ageScore;

      return { ...post._doc, score: totalScore, id: post._id.toString() };
   });

   // Sort the posts by score in descending order
   scoredPosts.sort((a, b) => b.score - a.score);

   return scoredPosts;
};

export default calculateAndSortPosts;

// library components
import Image from "next/image";
import Link from "next/link";

// icons
import { FaRegCommentAlt } from "react-icons/fa";
import userAvatar from "@/assets/images/user-avatar.png";

//server component inside client component
import PostImage from "@/components/shared/post/PostImage";
import PostRouter from "@/components/shared/post/PostRouter";
import CommentSection from "@/components/shared/post/CommentSection";
import Options from "@/components/shared/post/Options";

//utility function
import { formatDistanceToNow } from "date-fns";
import checkSession from "@/utils/checkSession";

//components
import Like from "./Like";

export default async function Post({ link = false, post, deleteable = false }) {
   const session = await checkSession();

   return (
      <div className="my-10">
         <div
            className={` w-full card glass px-3 py-2 hover:cursor-pointer z-0 ${
               link && "hover:shadow-xl"
            }`}
         >
            {/* user details */}
            <div className="flex items-center gap-4 my-2">
               {/* user avatar */}
               <div className="avatar">
                  <div className="w-10 rounded-full ">
                     {post?.user.image ? (
                        <Image
                           src={post?.user.image}
                           height={200}
                           width={200}
                           alt="profile image"
                        />
                     ) : (
                        <Image
                           src={userAvatar}
                           height={200}
                           width={200}
                           alt="profile image"
                        />
                     )}
                     {/* <Image src={``}/> */}
                  </div>
               </div>
               {/* user name */}
               <div className="font-semibold text-lg">{post?.user.name}</div>
               <span className="text-sm text-gray-600">
                  {" "}
                  {formatDistanceToNow(new Date(post?.createdAt), {
                     addSuffix: true,
                  })}
               </span>

               {deleteable && <Options postId={post?.id} />}
            </div>
            <p className="hover:cursor-text">
               {/* How to park your car at your garage? */}
               {post?.caption}
            </p>

            {
               <PostRouter link={link}>
                  <PostImage image={post?.image} />
               </PostRouter>
            }

            <div className="flex mx-5 my-5">
               {/* interaction panel */}
               {/* like */}

               <Like
                  likes={post?.likes.length}
                  postId={post?.id}
                  userId={session?.userId}
                  selfLike={post?.likes.includes(session?.userId)}
               />

               {/* comment */}

               <PostRouter link={link}>
                  <div className="flex items-center gap-2 px-2">
                     <FaRegCommentAlt className="transform duration-75 hover:scale-110 " />
                     {post?.comments.length}
                  </div>
               </PostRouter>
            </div>

            {/* comment section */}
            {!link && <CommentSection link={link} post={post} />}
         </div>
      </div>
   );
}

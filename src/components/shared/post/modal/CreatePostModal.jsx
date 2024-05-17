"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";

import { FaX } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

import { addPost } from "@/actions/postActions";
import toast from "react-hot-toast";

import notificationSound from "@/utils/notificationSound";

export default function CreatePost() {
   //initializing states
   const [selectedImages, setSelectedImages] = useState([]); // to store the selected images
   const [uploadedImage, setUploadedImage] = useState(false); // to store the uploaded image url from imgbb api
   const [submitting, setSubmitting] = useState(false); // form submittion status

   // initializing formik for form handling
   const { values, handleChange, handleSubmit } = useFormik({
      initialValues: {
         postType: "awareness",
         caption: "",
         image: "",
      },
      onSubmit: async (values, { resetForm }) => {
         values.image = uploadedImage;
         // const res = addEvent(values);
         const res = await addPost(values);
         if (res.success) {
            toast.success(res.message);
            //plays the success sound
            notificationSound();
            resetForm();
            setSelectedImages([]);
            dialogModalRef.current.close();
         }
      },
   });

   //the form is finally submitted to the backend after uploading the images to imgbb
   useEffect(() => {
      if (uploadedImage) {
         setSubmitting(false);
         const res = handleSubmit();
      }
   }, [uploadedImage]);
   //
   // form adjustment section
   const textareaRef = useRef();
   const dialogModalRef = useRef();

   useEffect(() => {
      //for adjusting caption textarea height
      if (textareaRef.current) {
         textareaRef.current.style.height = "auto";
         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }

      // to close the modal when i click outside the modal
      dialogModalRef.current.addEventListener("click", (e) => {
         if (e.target === dialogModalRef.current) {
            dialogModalRef.current.close();
         }
      });
   }, []);

   //
   // image upload section

   // deletes the image that is selected and is previewed
   function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
   }

   //selects the image and previews it
   const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
      const imagesArray = selectedFilesArray.map((file) => {
         return URL.createObjectURL(file);
      });

      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
   };

   //upload image to imgbb api
   //the form will be submitted after the image is uploaded to the imgbb api
   const uploadImages = async () => {
      try {
         setSubmitting(true);
         await Promise.all(
            selectedImages.map(async (image) => {
               const imageResponse = await fetch(image);
               const imageBlob = await imageResponse.blob();

               const formData = new FormData();
               formData.append("image", imageBlob);
               const imgbbRes = await fetch(
                  `${process.env.NEXT_PUBLIC_IMGBB_API}`,
                  {
                     method: "POST",
                     body: formData,
                  }
               );
               if (imgbbRes.ok && imgbbRes.status === 200) {
                  const imgbbJson = await imgbbRes.json();
                  const image = imgbbJson.data.image?.url;
                  setUploadedImage(image);
               }
            })
         );
      } catch (e) {
         console.log(e);
         toast.error("could not upload image");
      }
   };

   return (
      <div className="">
         {/* Open the modal using document.getElementById('ID').showModal() method */}
         <button
            className="btn tooltip tooltip-bottom tooltip-accent"
            data-tip="Create a post"
            onClick={() => document.getElementById("my_modal_1").showModal()}
         >
            + create
         </button>
         {/* </div> */}
         <dialog
            ref={dialogModalRef}
            id="my_modal_1"
            className="modal overflow-y-scroll"
         >
            <div className="modal-box">
               <div className="relative">
                  <h3 className="font-bold text-lg text-center">Create Post</h3>
                  <button
                     className="btn absolute -top-2 right-0"
                     onClick={() => {
                        document.getElementById("my_modal_1").close();
                     }}
                  >
                     <FaX />
                  </button>
               </div>

               {/* form for creating post */}
               <form method="dialog">
                  {/* type of post to be created */}
                  <select
                     className="select select-ghost max-w-xs focus:outline-none focus:border-0 w-fit"
                     name="postType"
                     id="postType"
                     value={values.postType}
                     onChange={handleChange}
                  >
                     <option disabled value="">
                        select the type of post{" "}
                     </option>
                     <option value={"awareness"}>Awareness</option>
                     <option value={"fundraiser"}>Fundraiser</option>
                     <option value={"businessPromotion"}>
                        Business Promotion
                     </option>
                  </select>
                  {/* caption for the post */}
                  <textarea
                     name="caption"
                     id="caption"
                     value={values.caption}
                     onChange={handleChange}
                     ref={textareaRef}
                     placeholder="What's on your mind?"
                     className="input input-ghost focus:border-0 focus:outline-none w-full resize-none overflow-hidden mt-5"
                     onInput={() => {
                        textareaRef.current.style.height = "auto";
                        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                     }}
                  />

                  <hr />

                  <div className="flex justify-center mt-10">
                     <div
                        className={`${selectedImages.length > 0 && "hidden"}`}
                     >
                        <label className="border-dotted border-black border-2 rounded-xl w-40 h-24 flex flex-col justify-center items-center cursor-pointer text-lg">
                           + Add Image
                           <br />
                           <input
                              type="file"
                              name="images"
                              onChange={onSelectFile}
                              accept="image/png , image/jpeg, image/webp"
                              className="hidden"
                           />
                        </label>
                     </div>
                  </div>
                  <div className="flex justify-center w-full">
                     {selectedImages &&
                        selectedImages.map((image) => (
                           <div
                              key={image}
                              className=" my-2 relative rounded-xl shadow-md"
                           >
                              <img
                                 src={image}
                                 width={100}
                                 height={100}
                                 alt="upload"
                                 style={{
                                    height: "100px",
                                    width: "100px",
                                    objectFit: "contain",
                                    objectPosition: "center",
                                 }}
                              />
                              <FaTrash
                                 className="absolute top-2 right-2 cursor-pointer border-none text-red-500 rounded-none "
                                 onClick={() => deleteHandler(image)}
                              />
                           </div>
                        ))}
                  </div>
                  <div className="modal-action">
                     {/* <form method="dialog" id="post_form"> */}
                     {/* if there is a button in form, it will close the modal */}
                     <button
                        type="submit"
                        className="btn btn-outline btn-success rounded-lg mx-2"
                        onClick={uploadImages}
                        aria-disabled={submitting}
                     >
                        Post
                     </button>
                     <button className="btn btn-error btn-outline rounded-lg mx-2">
                        close
                     </button>
                  </div>
               </form>
            </div>
         </dialog>
      </div>
   );
}

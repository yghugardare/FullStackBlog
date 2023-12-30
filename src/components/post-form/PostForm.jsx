import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Select, Input, RTE } from "../index";
import appwriteService from "../../appwrite/config";
// if user wants to update or add a post
// watch method will watch specified inputs and return their values. It is useful to render input value and for determining what to render by condition.
function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        // short circuiting syntax used to
        // conditionally render based updation
        // or creation
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    if (post) {
      //extract file
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        // delete the prev file
        appwriteService.deleteFile(post.featuredImage);
      }
      // update the existing post
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      // if updated navigate there
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        // create post logic
        // upload the file
        const file = await appwriteService.uploadFile(data.image[0]);
        if (file) {
          // if i have file, create fileId
          const fileId = file.$id;
          data.featuredImage = fileId;
          // then create new post with user Id
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });
          // if post is created then navigate me to the post
          if (dbPost) {
            navigate(`/post.${dbPost.$id}`);
          }
        }
      }
    }
  };
  // useCallback to optimize
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);
  useEffect(() => {
    // value represents all values in the form
    // so , i am creating a watch method, to watch
    // a particular "name" field of input for my
    // name or title of post to transform to slug
    // Eg) if name = intro to ai , slugTransform -> slug=intro-to-ai

    const subscription = watch((value, { name }) => {
      // value of Input where we {...register("title",{})}
      if (name === "title") {
        // setValue default method given by useHook form
        // to set value of a particalur selected field
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  // handleSubmit is HOF which takes submit as a function
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {/* if post is there then only give file preview */}

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

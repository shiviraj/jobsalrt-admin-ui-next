import React, {useState} from "react";
import EditPostDetails from "./EditPostDetails";
import EditBasicDetails from "./EditBasicDetails";
import EditObject from "./EditObject";
import EditArray from "./EditArray";
import EditOthersDetails from "./EditOthersDetails";
import API from "../../../API";
import {useToast} from "../../../common/components/ToastWrapper";

const EditTextPost = ({active, post, savePost, url, updates, checkUpdate}) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()

  console.log(checkUpdate, updates, "edit test")

  const handleUpdate = () => {
    setIsUpdating(true)
    API.post.updatePost(post, url)
      .then(() => toast.success("Successfully updated post!!"))
      .catch(() => toast.error("Failed to update post!!"))
      .then(() => setIsUpdating(false))
  }


  return <React.Fragment>

    {active.key === "basicDetails" &&
    <EditBasicDetails post={post} savePost={savePost} url={url} checkUpdate={checkUpdate} updates={updates}/>}
    {["vacancyDetails", "ageLimit", "feeDetails", "dates", "importantLinks"].map((key, index) => {
      return active.key === key &&
        <EditObject key={`key-${index}`} keyName={active.key} post={post} savePost={savePost} isUpdating={isUpdating}
                    updatePost={handleUpdate}/>
    })}
    {["howToApply", "selectionProcess"].map(key => {
      return active.key === key &&
        <EditArray key={active.key} keyName={active.key} post={post} savePost={savePost} url={url}/>
    })}
    {active.key === "others" && <EditOthersDetails post={post} savePost={savePost} url={url}/>}
    {active.key === "postDetails" && <EditPostDetails post={post} savePost={savePost} url={url}/>}
  </React.Fragment>
}

export default EditTextPost

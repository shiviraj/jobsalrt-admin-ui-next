import React, {useState} from "react";
import EditPostDetails from "./EditPostDetails";
import EditBasicDetails from "./EditBasicDetails";
import EditObject from "./EditObject";
import EditArray from "./EditArray";
import EditOthersDetails from "./EditOthersDetails";
import API from "../../../API";

const EditTextPost = ({active, post, savePost}) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = () => {
    setIsUpdating(true)
    API.post.updatePost(post)
      .then(() => ({}))
      .catch(() => ({}))
      .then(() => setIsUpdating(false))
  }


  return <React.Fragment>
    {active.key === "basicDetails" && <EditBasicDetails post={post} savePost={savePost}/>}
    {["vacancyDetails", "ageLimit", "feeDetails", "dates", "importantLinks"].map((key, index) => {
      return active.key === key &&
        <EditObject key={`key-${index}`} keyName={active.key} post={post} savePost={savePost} isUpdating={isUpdating}
                    updatePost={handleUpdate}/>
    })}
    {["howToApply", "selectionProcess"].map(key => {
      return active.key === key && <EditArray key={active.key} keyName={active.key} post={post} savePost={savePost}/>
    })}
    {active.key === "others" && <EditOthersDetails post={post} savePost={savePost}/>}
    {!active.key && <EditPostDetails post={post} savePost={savePost}/>}
  </React.Fragment>
}

export default EditTextPost

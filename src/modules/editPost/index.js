import React, {useEffect, useState} from 'react'
import {Divider, makeStyles, Typography} from "@material-ui/core";
import {useRouter} from "next/router";
import EditPostSkeleton from "./components/EditPostSkeleton";
import PostOptions from "./components/PostOptions";
import EditRawPost from "./components/EditRawPost";
import EditTextPost from "./components/EditTextPost";
import API from "../../API";
import {useToast} from "../../common/components/ToastWrapper";
import PostHeader from "./components/PostHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[300]
  },
  postContainer: {
    width: '78%',
    backgroundColor: theme.palette.common.white,
    paddingTop: theme.spacing(2),
  },
  divider: {marginTop: theme.spacing(1)},
  noPost: {margin: theme.spacing(20), color: theme.palette.error.light, textAlign: "center"},
}));

const EditPost = (props) => {
  const router = useRouter()
  const {url} = router.query
  const {post, loading, getPost, savePost, url: oldUrl} = props
  const classes = useStyles()
  const toast = useToast()
  const [active, setActive] = useState({key: "basicDetails", name: "Basic Details"})
  const [rawPost, setRawPost] = useState(false)
  const [checked, setChecked] = useState(false);
  const [updates, setUpdates] = useState(null)

  useEffect(() => {
    url && getPost(url)
  }, [url])

  const handleCheckUpdate = () => {
    if (!checked) {
      API.post.getUpdates(post.basicDetails.url)
        .then(update => {
          setUpdates(update)
          toast.success("Successfully fetched new updates")
        })
        .catch(() => toast.error("Failed to fetch new updates"))
    }
    setChecked(!checked);
  };

  if (loading) return <EditPostSkeleton/>
  if (!post) return <Typography variant="h1" className={classes.noPost}>No Post Found...</Typography>

  return (<div className={classes.root}>
      <div className={classes.postContainer}>
        <PostHeader checked={checked} post={post} active={active} handleCheckUpdate={handleCheckUpdate}
                    rawPost={rawPost} setRawPost={setRawPost}/>
        <Divider className={classes.divider}/>
        {
          rawPost
            ? <EditRawPost post={post} savePost={savePost} checkUpdate={checked} updates={updates}/>
            : <EditTextPost active={active} post={post} savePost={savePost} url={oldUrl} checkUpdate={checked}
                            updates={updates}/>
        }
      </div>

      <PostOptions setActive={setActive}/>
    </div>
  )
}

export default EditPost


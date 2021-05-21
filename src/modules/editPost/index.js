import React, {useEffect, useState} from 'react'
import {Button, Divider, makeStyles, Typography} from "@material-ui/core";
import {useRouter} from "next/router";
import EditPostSkeleton from "./components/EditPostSkeleton";
import PostOptions from "./components/PostOptions";
import EditRawPost from "./components/EditRawPost";
import EditTextPost from "./components/EditTextPost";

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
      "& > *": {paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2)}
    },
    divider: {marginTop: theme.spacing(1), marginBottom: theme.spacing(1)},
    titleContainer: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: 'space-between',
    },
    toggle: {marginLeft: theme.spacing(2)},
    noPost: {margin: theme.spacing(20), color: theme.palette.error.light, textAlign: "center"},
  }))
;

const EditPost = (props) => {
  const router = useRouter()
  const {url} = router.query
  const {post, loading, getPost, savePost, url: oldUrl} = props

  const classes = useStyles()

  useEffect(() => {
    url && getPost(url)
  }, [url])

  const [active, setActive] = useState({key: "basicDetails", name: "Basic Details"})
  const [rawPost, setRawPost] = useState(false)
  if (loading) return <EditPostSkeleton/>
  if (!post) return <Typography variant="h1" className={classes.noPost}>No Post Found...</Typography>

  return (<div className={classes.root}>

      <div className={classes.postContainer}>
        <div className={classes.titleContainer}>
          <div className={classes.titleContainer}>
            <Typography variant="h5">{active.name || "Post Details"}</Typography>
            <Button variant="contained" color="primary" className={classes.toggle} onClick={() => setRawPost(!rawPost)}>
              {rawPost ? "Edit as Text" : "Edit as json"}
            </Button>
          </div>
          <Button variant="contained" color="primary" component="a" href={post.source} target="_blank">View Post
            Source</Button>
        </div>
        <Divider className={classes.divider}/>
        {
          rawPost
            ? <EditRawPost post={post} savePost={savePost}/>
            : <EditTextPost active={active} post={post} savePost={savePost} url={oldUrl}/>
        }
      </div>

      <PostOptions setActive={setActive}/>
    </div>
  )
}

export default EditPost


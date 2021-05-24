import React, {useState} from 'react'
import {Button, Card, CardActions, CardContent, Modal, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import API from "../../../API";
import {useToast} from "../../../common/components/ToastWrapper";
import ButtonWithLoader from "../../../common/components/ButtonWithLoader";
import {truncate} from "../../../utils/utils";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0),
    backgroundColor: theme.palette.grey[100],
    maxWidth: "24%",
    minWidth: theme.spacing(36),
    border: `1px solid ${theme.palette.primary.extraLight}`,
    '&:hover': {
      boxShadow: theme.shadows[4],
      backgroundColor: theme.palette.grey[400]
    }
  },
  error: {
    backgroundColor: theme.palette.error.light,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    }
  },
  success: {
    backgroundColor: theme.palette.success.light,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    }
  },
  title: {textAlign: "justify", lineHeight: theme.spacing(0.15)},
  logoContainer: {
    display: 'flex',
    justifyContent: "center",
  },
  logo: {
    height: theme.spacing(8),
    maxWidth: theme.spacing(38)
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  modal: {
    position: 'absolute',
    width: theme.spacing(40),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '30%',
    left: '40%',
    "& > *": {
      margin: theme.spacing(2, 0)
    }
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    }
  }
}));

const Post = ({post, getPosts, postsCount}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const boxBackgrounds = {
    NOT_VERIFIED: classes.error,
    VERIFIED: classes.success,
    DISABLED: classes.disabled
  }

  const handleDelete = () => {
    setLoading(true)
    API.posts.deletePost(post.url)
      .then(() => {
        getPosts()
        postsCount()
        setOpen(false)
        toast.success("Successfully deleted post!!")
      })
      .catch(() => toast.error("failed to delete post!!"))
      .then(() => setLoading(false))
  }

  return <Card className={`${classes.root} ${boxBackgrounds[post.status]}`}>
    <CardContent>
      <Typography variant="h6" className={classes.title}>{truncate(50)(post.name)}</Typography>
    </CardContent>
    <CardContent className={classes.logoContainer}>
      <img className={classes.logo} src={post.postLogo} alt={post.postLogo}/>
    </CardContent>
    <CardContent>
      {post.advtNo && <Typography variant="body1"><b>Advt No :</b> &nbsp; {post.advtNo} </Typography>}
      <Typography variant="body1"><b>Form Type :</b> &nbsp; {post.formType} </Typography>
      {post.lastDate && <Typography variant="body1"><b>Last Date :</b> &nbsp; {post.lastDate} </Typography>}
      {post.company && <Typography variant="body1"><b>Company :</b> &nbsp; {truncate(32)(post.company)} </Typography>}
      {post.totalVacancies && <Typography variant="body1"><b>Vacancy :</b> &nbsp; {post.totalVacancies} </Typography>}
      {post.createdAt &&
      <Typography variant="body1"><b>Created At :</b> &nbsp; {post.createdAt.split("T")[0]} </Typography>}
      {post.postUpdateDate &&
      <Typography variant="body1"><b>Post Update At :</b> &nbsp; {post.postUpdateDate.split("T")[0]} </Typography>}
      <Typography variant="body1"><b>Total Views :</b> &nbsp; {post.totalViews} </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" className={classes.deleteButton} onClick={() => setOpen(true)}>Delete</Button>
      <Button variant="contained" color="primary" component="a" href={`/post/${post.url}`}>Edit</Button>
    </CardActions>
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={classes.modal}>
        <Typography variant="h5">Do you really want to delete?</Typography>
        <div className={classes.buttonContainer}>
          <Button variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
          <ButtonWithLoader loading={loading} variant="contained" className={classes.deleteButton}
                            onClick={handleDelete}>Delete</ButtonWithLoader>
        </div>
      </div>
    </Modal>
  </Card>
}

export default Post

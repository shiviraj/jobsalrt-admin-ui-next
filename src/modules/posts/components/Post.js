import React, {useState} from 'react'
import {Box, Button, Modal, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ButtonWithLoader from "../../../common/components/ButtonWithLoader";
import API from "../../../API";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    width: theme.spacing(40),
    border: `1px solid ${theme.palette.primary.extraLight}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  title: {
    textAlign: "justify",
  },
  logoContainer: {
    display: 'flex',
    justifyContent: "center",
    margin: theme.spacing(1),
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
      })
      .catch(() => {
        //TODO error Toast
      })
      .then(() => setLoading(false))
  }

  return <Box m={0.5} p={1} className={`${classes.root} ${boxBackgrounds[post.status]}`}>
    <Typography variant="h6" className={classes.title}>{post.name}</Typography>

    <div className={classes.logoContainer}>
      <img className={classes.logo} src={post.postLogo} alt={post.postLogo}/>
    </div>

    <div>
      {post.advtNo && <Typography variant="body1"><b>Advt No :</b> &nbsp; {post.advtNo} </Typography>}
      <Typography variant="body1"><b>Form Type :</b> &nbsp; {post.formType} </Typography>
      {post.lastDate && <Typography variant="body1"><b>Last Date :</b> &nbsp; {post.lastDate} </Typography>}
      {post.company && <Typography variant="body1"><b>Company :</b> &nbsp; {post.company} </Typography>}
      {post.totalVacancies && <Typography variant="body1"><b>Vacancy :</b> &nbsp; {post.totalVacancies} </Typography>}
      {post.qualification &&
      <Typography variant="body1"><b>Qualification :</b> &nbsp; {post.qualification} </Typography>}
      {post.location && <Typography variant="body1"><b>Location :</b> &nbsp; {post.location} </Typography>}
      {post.createdAt && <Typography variant="body1"><b>Created At :</b> &nbsp; {post.createdAt} </Typography>}
      {post.postUpdateDate &&
      <Typography variant="body1"><b>Post Update Date :</b> &nbsp; {post.postUpdateDate} </Typography>}
      <Typography variant="body1"><b>Total Views :</b> &nbsp; {post.totalViews} </Typography>

      <div className={classes.buttonContainer}>
        <Button variant="contained" className={classes.deleteButton} onClick={() => setOpen(true)}>Delete</Button>
        <Button variant="contained" color="primary" component="a" href={`/posts/${post.url}`}>Edit</Button>
      </div>
    </div>

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

  </Box>
}

export default Post

import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Modal, Typography} from "@material-ui/core";
import FormInput from "../../../common/components/FormInput";
import ButtonWithLoader from "../../../common/components/ButtonWithLoader";
import API from "../../../API";
import {SORT} from "../../../constants/sort";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '30%',
    left: '40%',
    "&>*": {
      margin: theme.spacing(1, 0)
    }
  },
}));

const AddNewPost = ({postsCount, getPosts}) => {
  const classes = useStyles();
  const [source, setSource] = useState("")
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    API.posts.addNewPost({source})
      .then(() => {
        getPosts({currentPage: 1, sortBy: SORT.sortBy.CREATED_AT, sortOrder: SORT.sortOrder.DESC, filters: {}})
        postsCount({currentPage: 1})
      })
      .catch(() => ({}))
      .then(() => {
        setLoading(false)
        setOpen(false);
      })
  }

  return (<div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Post</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className={classes.modal} onSubmit={handleSubmit}>
          <Typography variant="h5">Enter Post Source</Typography>
          <FormInput label="Source" value={source} onChange={setSource} required/>
          <ButtonWithLoader loading={loading} type="submit" variant="contained" color="primary" fullWidth>
            Add Post
          </ButtonWithLoader>
        </form>
      </Modal>
    </div>
  );
};

export default AddNewPost
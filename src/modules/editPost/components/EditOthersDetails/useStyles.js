import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  innerGrid: {padding: theme.spacing(2)},
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
  header: {
    display: "flex",
    alignItems: "center",
  },
  addButton: {
    marginLeft: theme.spacing(4),
  },
  divider: {marginTop: theme.spacing(1)},
  title: {
    fontSize: theme.spacing(3)
  },
  deleteButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2)
  },
  delete: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    }
  },
}));

export default useStyles

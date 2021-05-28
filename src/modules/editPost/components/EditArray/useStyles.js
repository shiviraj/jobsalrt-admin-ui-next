import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
  root: {margin: theme.spacing(1)},
  innerGrid: {padding: theme.spacing(2)},
  row: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  cell: {
    border: `1px solid ${theme.palette.grey[500]}`,
    backgroundColor: theme.palette.common.white,
    width: "100%"
  },
  actionCell: {
    display: "flex",
    width: theme.spacing(25),
    justifyContent: "space-around",
    alignItems: "center",
    border: `1px solid ${theme.palette.grey[500]}`,
  },
  button: {
    paddingRight: theme.spacing(1),
    margin: theme.spacing(.1),
    paddingLeft: theme.spacing(1),
  },
  addRowButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(1)
  }
}))

export default useStyles

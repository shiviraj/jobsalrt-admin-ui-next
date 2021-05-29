import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {margin: theme.spacing(1)},
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
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
    width: theme.spacing(30),
    justifyContent: "space-around",
    alignItems: "center",
    border: `1px solid ${theme.palette.grey[500]}`,
  },
  button: {
    margin: theme.spacing(.1),
    padding: theme.spacing(.5)
  },
  addRowButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(1)
  },
}))

export default useStyles

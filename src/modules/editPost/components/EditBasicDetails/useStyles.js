import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {display: "flex"},
  halfWidth: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    "&>*": {
      width: "48%"
    }
  },
  fullWidth: {
    "&>*": {
      width: "98%"
    }
  },
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
  innerGrid: {padding: theme.spacing(2)}
}))

export default useStyles

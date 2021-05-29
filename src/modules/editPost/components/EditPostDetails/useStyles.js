import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  innerGrid: {padding: theme.spacing(2)},
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
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
  divider: {marginTop: theme.spacing(1)},
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2)
  },
  submitButton: {
    margin: theme.spacing(2)
  },
  stateContainer: {
    display: "flex",
    flexDirection: "column",
    marginRight: theme.spacing(2)
  },
  createdAt: {
    margin: theme.spacing(-1.8, 0, 0, 6),
    fontSize: theme.spacing(1.5),
    textAlign: "right"
  }
}))

export default useStyles

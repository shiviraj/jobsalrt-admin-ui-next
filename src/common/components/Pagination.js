import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {FirstPage, LastPage, MoreHoriz, NavigateBefore, NavigateNext} from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
  button: {
    padding: theme.spacing(1),
    height: theme.spacing(4),
    width: theme.spacing(4),
    fontSize: theme.spacing(2.5),
    margin: theme.spacing(0.5)
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  }
}))

const Pagination = ({count, page, onChange}) => {
  const classes = useStyles()
  const [ranges, setRanges] = useState([])

  const generateRanges = (page, count, pages) => {
    if (count < 8) return pages
    if (page < 5) {
      return pages.slice(0, 5).concat(pages.slice(-1))
    }
    if (page > count - 4) {
      return pages.slice(0, 1).concat(pages.slice(-5))
    }
    return pages.slice(0, 1).concat(pages.slice(page - 2, page + 1)).concat(pages.slice(-1))
  };

  useEffect(() => {
    const pages = Array(count).fill("").map((_, index) => index + 1)
    setRanges(generateRanges(page, count, pages))
  }, [page, count])


  return (<div>
    <IconButton className={classes.button} disabled={page <= 1}
                onClick={(e) => onChange(1)}><FirstPage/></IconButton>
    <IconButton className={classes.button} disabled={page <= 1}
                onClick={(e) => onChange(page - 1)}><NavigateBefore/></IconButton>
    {
      ranges.map((pageNumber, index) => {
        return <React.Fragment key={`key-${index}`}>
          <IconButton className={`${classes.button} ${pageNumber === page ? classes.active : ""}`}
                      onClick={(e) => onChange(pageNumber)}>{pageNumber}</IconButton>
          {
            (ranges[index + 1] && ranges[index + 1] !== pageNumber + 1) &&
            < IconButton className={classes.button} disabled><MoreHoriz/></IconButton>
          }
        </React.Fragment>
      })
    }
    <IconButton className={classes.button} disabled={page >= count}
                onClick={(e) => onChange(page + 1)}><NavigateNext/></IconButton>
    <IconButton className={classes.button} disabled={page >= count}
                onClick={(e) => onChange(count)}><LastPage/></IconButton>
  </div>)
}

export default Pagination

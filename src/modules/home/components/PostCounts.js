import React, {useEffect, useState} from "react";
import API from "../../../API";
import PostSlider from "./PostSlider";
import {StyledTableCell, StyledTableRow} from "./StyledTable";
import {Button, CircularProgress, LinearProgress} from "@material-ui/core";
import {useRouter} from "next/router";

const PostCounts = ({setFilters, filters, disabledSlider, title}) => {
  const [loading, setLoading] = useState(false)
  const [verify, setVerify] = useState({})
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    API.posts.postsCount("", filters)
      .then((data) => {
        setVerify(data)
      }).catch(() => ({}))
      .then(() => setLoading(false))
  }, [])

  const viewPosts = () => {
    setFilters(filters)
    router.push("/posts").then()
  }

  return <StyledTableRow>
    <StyledTableCell component="th" scope="row">
      {title}
    </StyledTableCell>
    <StyledTableCell component="th" scope="row">
      {!disabledSlider
        ? loading ? <LinearProgress/> : <PostSlider value={verify.totalPost}/>
        : ""
      }
    </StyledTableCell>
    <StyledTableCell align="right">
      {loading ? <CircularProgress size={20} thickness={5}/> : verify.totalPost}
    </StyledTableCell>
    <StyledTableCell align="right">
      <Button onClick={viewPosts} color="primary" variant="contained">View All</Button>
    </StyledTableCell>
  </StyledTableRow>
}

export default PostCounts

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Table, TableBody, TableContainer, TableHead} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import {StyledTableCell} from "./components/StyledTable";
import PostCounts from "./components/PostCounts";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4),
  },
  table: {
    minWidth: 700,
  },
}));


const Home = ({setFilters}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right">Count</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <PostCounts title="Verification Required" setFilters={setFilters} filters={{status: ["NOT_VERIFIED"]}}/>
            <PostCounts title="Update Required" setFilters={setFilters} filters={{isUpdateAvailable: [true]}}/>
            <PostCounts title="Verified" setFilters={setFilters} filters={{status: ["VERIFIED"]}} disabledSlider/>
            <PostCounts title="Disabled" setFilters={setFilters} filters={{status: ["DISABLED"]}} disabledSlider/>
            <PostCounts title="Total Posts" setFilters={setFilters} filters={{}} disabledSlider/>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home



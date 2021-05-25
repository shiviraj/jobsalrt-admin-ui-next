import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {withStyles} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

const PrettoSlider = withStyles(theme => ({
  root: {
    color: theme.palette.success.dark,
    height: 8,
    pointerEvents: "none"
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    color: theme.palette.error.light,
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))
(Slider);


const PostSlider = ({value}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={value} step={1} min={0} max={10}/>
    </div>
  );
};

export default PostSlider

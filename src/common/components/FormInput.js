import React, {useState} from 'react';
import {makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%',
    },
  },
}));

const FormInput = ({onChange, label, value, ...props}) => {
  const classes = useStyles();

  const [text, setValue] = useState(value || '');
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    onChange(inputValue);
  };

  return (
    <div className={classes.root}>
      <TextField label={label} variant="outlined" onChange={handleChange} value={text}
                 {...props}  />
    </div>
  );
};

export default FormInput;

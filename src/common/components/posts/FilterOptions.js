import React from 'react'
import {Accordion, AccordionDetails, AccordionSummary, Chip, FormControl, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ExpandMore} from "@material-ui/icons";
import FormCheckBox from "../../components/FormCheckBox";

const useStyles = makeStyles(theme => ({
  title: {textTransform: "capitalize"},
  chip: {width: theme.spacing(12)},
}));


const FilterOptions = ({options, handleChange, keyName, title}) => {
  const classes = useStyles()

  const handleClearAll = () => {
    const selectedOptions = options.filter(option => option.checked);
    selectedOptions.forEach(option => handleChange(keyName, option.value))
  }

  return <Accordion square defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMore/>} aria-controls={keyName} id={keyName}>
      <Typography variant="h5" className={classes.title}>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <FormControl component="fieldset" key={keyName}>
        {options.some(option => option.checked) &&
        <Chip label="&#x2715; &nbsp; Clear All" className={classes.chip} onClick={handleClearAll}/>}
        {
          options.map((option, index) => {
            return <FormCheckBox key={`${option.name}_${index}`} value={option.value} label={option.name}
                                 checked={option.checked} onChange={(value) => handleChange(keyName, value)}/>
          })
        }
      </FormControl>
    </AccordionDetails>
  </Accordion>
}

export default FilterOptions

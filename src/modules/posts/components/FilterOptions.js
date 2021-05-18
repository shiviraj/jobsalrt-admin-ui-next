import React from 'react'
import {Accordion, AccordionDetails, AccordionSummary, Chip, FormControl, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ExpandMore} from "@material-ui/icons";
import FormCheckBox from "../../../common/components/FormCheckBox";

const useStyles = makeStyles(theme => ({
  title: {textTransform: "capitalize"},
  chip: {width: theme.spacing(12)},
}));


const FilterOptions = ({options, filters = [], onChange, title}) => {
  const classes = useStyles()

  const handleClearAll = () => {
    filters.forEach((value) => {
      onChange(value)
    })
  }

  return <Accordion square defaultExpanded>
    <AccordionSummary expandIcon={<ExpandMore/>}>
      <Typography variant="h5" className={classes.title}>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <FormControl component="fieldset">
        {filters && filters.length !== 0 &&
        <Chip label="&#x2715; &nbsp; Clear All" className={classes.chip} onClick={handleClearAll}/>}
        {
          options.map((option, index) => {
            return <FormCheckBox key={`${option.name}_${index}`} value={option.value} label={option.name}
                                 checked={filters.includes(option.value)} onChange={onChange}/>
          })
        }
      </FormControl>
    </AccordionDetails>
  </Accordion>
}

export default FilterOptions

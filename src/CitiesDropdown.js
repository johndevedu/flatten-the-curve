import React, { useState, useEffect } from "react";
import { getCities } from "./services/api.service";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 500,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 12 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};


function CitiesDropdown({city: selectedCities, handleChange}) {
  const classes = useStyles();
  
  const [cities, setCities] = useState([])
  // const [city, setCity] = useState('')

  useEffect(() => {
    const getter = async () => {
      const cities = await getCities();
      setCities(cities);
    }

    getter()
  }, [setCities])

  return (

    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-checkbox-label">Cities</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={selectedCities}
        onChange={({target}) => handleChange(target.value)}
        input={<Input />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {cities.map((item) => {
          if (!item) {
            return null
          }

          return (<MenuItem key={item.description} value={item.value}>
            <Checkbox checked={selectedCities.indexOf(item.value) > -1} />
            <ListItemText primary={item.description} />
          </MenuItem>);
        })}
      </Select>
    </FormControl>
  );
}

export default CitiesDropdown
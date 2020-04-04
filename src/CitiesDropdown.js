import React, { useState, useEffect } from "react";
import { getCities } from "./services/api.service";

export default function CitiesDropdown({city, handleChange}) {
  const [cities, setCities] = useState([])
  // const [city, setCity] = useState('')

  useEffect(() => {
    const getter = async () => {
      const cities = await getCities();
      setCities(cities);
    }

    getter()
  }, [setCities])

  // const onChange = city => {
  //   setCity(city);
  //   handleChange(city);
  // }

  const options = cities.map((item, index) => {
    if (!item) {
      return <option key={index}></option>
    }
    return <option key={item.description} value={item.value}>{item.description}</option>
  })

  return (
    // <select value={city} onChange={({target})=>onChange(target.value)}>
    <select value={city} onChange={({target})=>handleChange(target.value)}>
      {options}
    </select>
  );
}
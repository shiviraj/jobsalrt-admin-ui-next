const keyTitleDetails = [{key: "name", label: "Post Title", required: true},
  {key: "advtNo", label: "Advt No"},
  {key: "lastDate", label: "Last Date", type: "date", InputLabelProps: {shrink: true}},
  {key: "totalVacancies", label: "Vacancies", type: "number"},
  {key: "location", label: "Location"},
  {key: "company", label: "Company"},
  {key: "qualification", label: "Qualification"},
  {key: "minAgeLimit", label: "Age Limit (Min)", type: "date", InputLabelProps: {shrink: true}},
  {key: "maxAgeLimit", label: "Age Limit (Max)", type: 'date', InputLabelProps: {shrink: true}},
  {key: "postLogo", label: "Post Logo Url"},
]

const isSameObject = (obj1, obj2) => {
  return keyTitleDetails.every(({key}) => obj1[key] === obj2[key] || !obj2[key])
}

const findDiffKeys = (obj1, obj2) => {
  return keyTitleDetails.reduce((keys, {key}) => {
    if (obj1[key] !== obj2[key] && obj2[key]) keys.push(key)
    return keys
  }, [])
}

export {keyTitleDetails, isSameObject, findDiffKeys}

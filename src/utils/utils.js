const cloneObject = obj => JSON.parse(JSON.stringify(obj))

const truncate = (length) => {
  return (text) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };
}

export {cloneObject, truncate}

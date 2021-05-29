const isEqualLength = (list1, list2) => {
  return list1.length === list2.length
}

const isSameArray = (arr1, arr2) => {
  return isEqualLength(arr1, arr2) && arr1.every((item, index) => item === arr2[index])
}

const isSameObject = (obj1, obj2) => {
  const isSameBody = obj1.body.every((arr, index) => isSameArray(arr, obj2.body[index] || []));
  return isSameArray(obj1.header, obj2.header) && isSameBody
}

const indexesOfDifferentItems = (list1, list2 = []) => {
  if (list1.length > list2.length) {
    const temp = list1
    list1 = list2
    list2 = temp
  }
  return list2.reduce((result, item, index) => {
    if (item !== list1[index]) result.push(index)
    return result
  }, [])
}

const findDiffIndex = (obj1, obj2) => {
  const header = indexesOfDifferentItems(obj1.header, obj2.header)
  let body1 = obj1.body
  let body2 = obj2.body
  if (obj1.body.length < obj2.body.length) {
    body1 = obj2.body
    body2 = obj1.body
  }
  const body = body1.reduce((result, item, index) => {
    result.push(indexesOfDifferentItems(item, body2[index]))
    return result
  }, [])
  return {header, body}
}

export {isSameObject, findDiffIndex}

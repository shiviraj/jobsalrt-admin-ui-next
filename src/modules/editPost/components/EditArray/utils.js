const removeEmptyElement = list => list.filter(item => item.trim());

const isEqualLength = (list1, list2) => {
  list1 = removeEmptyElement(list1)
  list2 = removeEmptyElement(list2)
  return list1.length === list2.length
}

const indexesOfDifferentItems = (list1, list2) => {
  list1 = removeEmptyElement(list1)
  list2 = removeEmptyElement(list2)

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

export {isEqualLength, indexesOfDifferentItems}

export function queryString(qs) {
  const output = {};
  if (qs[qs.length-1] === '&') qs = qs.substring(0, qs.length-1);
  const pairs = qs.substring(1).split('&');
  pairs.forEach(( elem ) => {
    const keyval = elem.split('=');
    output[keyval[0]] = keyval[1];
  });

  return output;
}

export function findDateIndex (arrOfObj, date, field) {
  for (var objIndex = 0; objIndex < arrOfObj.length; objIndex++){
    if(arrOfObj[objIndex][field] === date){
      return objIndex
    }
  }
  return -1
}

export function queryString(qs) {
  const output = {};
  const pairs = qs.substring(1).split('&');
  pairs.forEach(( elem ) => {
    const keyval = elem.split('=');
    output[keyval[0]] = keyval[1];
  });

  return output;
}

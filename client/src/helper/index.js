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

// credit: https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript
export function getCookieValue(a) {
  var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

// credit: https://stackoverflow.com/a/1349426
export function keygen(len = 15) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function convertDateObjToCalendarVal(dateObj) {
  return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
}
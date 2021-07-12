const permute = (permutation) => {
  var length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
};
const genKey = (name) => {
  name = name.toLowerCase().trim().split(" ");
  name = name.filter((item) => item !== "");
  const permutation = permute(name);
  let result = [];
  permutation.forEach((item) => {
    let temp = "";
    item.forEach((part) => {
      for (var i = 0; i < part.length; i++) {
        temp += part.charAt(i);
        result.push(temp);
      }
    });
  });
  return result;
};

export default genKey;

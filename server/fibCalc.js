getFibonacciNumber = function(n) {
  if (n <= 0)
    return 0;
  else if (n === 1 || n === 2)
    return 1;
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
};

module.exports = getFibonacciNumber;

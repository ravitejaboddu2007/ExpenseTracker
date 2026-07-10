export function Practice() {
  const nums = [10, 20, 30, 40, 50];
  nums.forEach((num) => {
    console.log(num);
  });
  const doubled = nums.map((num) => {
    return num * 2;
  });
  console.log(doubled);
  nums.reduce((sum, num) => {
    return sum + num;
  }, 0);
  console.log(sum);
}

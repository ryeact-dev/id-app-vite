let arr = [
  { lastName: 'ee', firstName: 'zz' },
  { lastName: 'cc', firstName: 'az' },
  { lastName: 'd', firstName: 'bz' },
];

arr.sort((a, b) => {
  if (a.lastName < b.lastName) {
    return -1;
  }
  if (a.lastName > b.lastName) {
    return 1;
  }
  if (a.firstName < b.firstName) {
    return -1;
  }
  if (a.firstName > b.firstName) {
    return 1;
  }
  return 0;
});

console.log(arr);

// Descinding Order
let arr2 = [
  { lastName: 'ee', firstName: 'zz', middleInitial: 'a' },
  { lastName: 'cc', firstName: 'az', middleInitial: 'b' },
  { lastName: 'd', firstName: 'bz', middleInitial: 'c' },
];

arr2.sort((a, b) => {
  if (a.lastName > b.lastName) {
    return -1;
  }
  if (a.lastName < b.lastName) {
    return 1;
  }
  if (a.firstName > b.firstName) {
    return -1;
  }
  if (a.firstName < b.firstName) {
    return 1;
  }
  if (a.middleInitial > b.middleInitial) {
    return -1;
  }
  if (a.middleInitial < b.middleInitial) {
    return 1;
  }
  return 0;
});

console.log(arr);

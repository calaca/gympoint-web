export default str =>
  str
    .match(/\d+/g)
    .map(Number)
    .join()
    .replace(',', '');

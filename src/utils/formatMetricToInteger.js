export default str =>
  str
    .match(/\d+/g)
    .join()
    .replace(',', '');

const parser = (data) => {
  const Parser = new DOMParser();
  const parseData = Parser.parseFromString(data, 'application/xml');
  return parseData;
};

export default parser;

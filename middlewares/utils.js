const missingFields = (data) => {
    const missingFields = [];
    for (let key in data) {
      if (!data[key]) {
        missingFields.push(key);
      }
    }
    return missingFields;
  };

  module.exports = {
    missingFields,
  };
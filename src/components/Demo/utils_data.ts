const dataFilter = (dataType: string, newdata: any, currentdata: any) => {
  // Filter data to fit the requirements
  if (
    newdata === undefined ||
    newdata === null ||
    newdata.username === "" ||
    newdata.password === ""
  ) {
    return 400;
  }

  // Check if no data in dataSignal
  if (currentdata.length === 0) {
    return 202;
  }

  // Check if data exceeds cap of 10 entries in dataSignal
  if (currentdata.length >= 10) {
    return 401;
  }

  // Check if data already exists (duplicate)
  for (let i = 0; i < currentdata.length; i++) {
    if (currentdata[i].username === newdata.username) {
      return 409;
    }
  }

  // Otherwise return 200
  return 200;
};

export { dataFilter };

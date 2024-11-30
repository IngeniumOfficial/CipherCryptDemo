/* Update data to tempData, delete demoData */
const replaceLS = (newData: any) => {
  let tempObject: any = {};
  newData.forEach((item: any, index: any) => {
    tempObject[index] = item;
  });

  localStorage.setItem("tempData", JSON.stringify(tempObject));
  localStorage.removeItem("demoData");
  return;
};

/* Move data from tempData to demoData, delete tempData. If tempData doesn't exist, alert */
const reloadLS = () => {
  const tempData = localStorage.getItem("tempData");
  if (tempData) {
    const data = JSON.parse(tempData);
    localStorage.setItem("demoData", JSON.stringify(data));
    localStorage.removeItem("tempData");
    window.location.reload();
  } else {
    window.alert(
      "The data might have been corrupted or lost. Please enter new data."
    );
    return "empty";
  }
};

/* Update data to demoData */
const updateLS = (newData: any) => {
  let tempObject: any = {};
  newData.forEach((item: any, index: any) => {
    tempObject[index] = item;
  });

  localStorage.setItem("demoData", JSON.stringify(tempObject));
};

const checkLS = () => {
  if (localStorage.getItem("tempData")) {
    return "progress";
  }
  // If there is data in localstorage, return it
  const lsData = localStorage.getItem("demoData");
  if (lsData) {
    const data = JSON.parse(lsData);
    return data;
  } else {
    return "empty";
  }
};

export { replaceLS, reloadLS, updateLS, checkLS };

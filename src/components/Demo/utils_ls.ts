const replaceLS = (newData: any) => {
  let tempObject: any = {};
  newData.forEach((item: any, index: any) => {
    tempObject[index] = item;
  });

  localStorage.setItem("tempData", JSON.stringify(tempObject));
  localStorage.removeItem("demoData");
  return;
};

const reloadLS = () => {
  const tempData = localStorage.getItem("tempData");
  if (tempData) {
    const data = JSON.parse(tempData);
    localStorage.setItem("demoData", JSON.stringify(data));
    localStorage.removeItem("tempData");
    return "good";
  } else {
    window.alert(
      "The data might have been corrupted or lost. Please enter new data."
    );
    return "empty";
  }
};

const updateLS = (newData: any) => {
  let tempObject: any = {};
  newData.forEach((item: any, index: any) => {
    tempObject[index] = item;
  });

  localStorage.setItem("demoData", JSON.stringify(tempObject));
};

export { replaceLS, reloadLS, updateLS };

export const readTableData = (data, headers, clickEvent, clickEventKey) => {
  const tableData = {};
  const CLICK_EVENT = 'clickEvent';

  //Create columns
  const columns = [];
  if (headers != null) {
    let i = 0;
    for (let key in data[0]) {
      if (key !== CLICK_EVENT) {
        columns.push({
          label: headers[i++],
          field: key,
        });
      }
    }
  } else {
    for (let key in data[0]) {
      if (key !== CLICK_EVENT) {
        columns.push({
          label: keyToLabel(key),
          field: key,
        });
      }
    }
  }

  //Handle row data types
  for (let row of data) {
    for (let key of Object.keys(row)) {
      if (!isNaN(row[key]) && !isNaN(parseFloat(row[key]))) {
        row[key] = parseFloat(row[key]);
      }
    }
  }

  //Add click event
  if (clickEvent !== undefined) {
    for (let row of data) {
      row[CLICK_EVENT] = () => {
        clickEvent(row[clickEventKey]);
      };
    }
  }

  //Add rows and columns to data
  tableData['columns'] = columns;
  tableData['rows'] = data;

  return tableData;
};

const keyToLabel = (label) => {
  return label.replace(/_/g, ' ');
};

export const readTableData = (data) => {
  const tableData = {};

  //Create columns
  const columns = [];
  for (let key in data[0]) {
    columns.push({
      label: keyToLabel(key),
      field: key,
      sort: 'asc',
    });
  }

  //Add rows and columns to data
  tableData['columns'] = columns;
  tableData['rows'] = data;

  return tableData;
};

const keyToLabel = (label) => {
  return label.replace(/_/g, ' ');
};

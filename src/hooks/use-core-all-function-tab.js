import { useStaticQuery, graphql } from 'gatsby';

export const useCoreAllFunctionTab = () => {
  const { allCoreAllFunctionTabCsv } = useStaticQuery(
    graphql`
      query AllCoreAllFunctionTabCsv {
        allCoreAllFunctionTabCsv {
          nodes {
            Gene
            Signaling
            Transport
            Organization
            Metabolism
            Development
            Known_Functions
          }
        }
      }
    `
  );
  let data = turnCsvListIntoWrittenList(allCoreAllFunctionTabCsv.nodes, [
    'Known_Functions',
  ]);
  return data;
};

const turnCsvListIntoWrittenList = (data, listFields) => {
  let temp;
  for (let i = 0; i < data.length; i++) {
    //Turn csv list into written list
    for (let listField of listFields) {
      if (listField in data[i]) {
        temp = data[i][listField].replace(/'|\[|\]/g, '');
        data[i][listField] = temp.charAt(0).toUpperCase() + temp.slice(1);
      }
    }
  }
  return data;
};

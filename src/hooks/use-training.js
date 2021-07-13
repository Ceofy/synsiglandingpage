import { useStaticQuery, graphql } from 'gatsby';

export const useTraining = () => {
  const { allTrainingCsv } = useStaticQuery(
    graphql`
      query AllTrainingCsv {
        allTrainingCsv {
          nodes {
            genes
            training
          }
        }
      }
    `
  );
  return allTrainingCsv.nodes;
};

import { useStaticQuery, graphql } from 'gatsby';

export const usePredicted = () => {
  const { allPredictedCsv } = useStaticQuery(
    graphql`
      query AllPredictedCsv {
        allPredictedCsv {
          nodes {
            genes
            Synapse_Percentile
          }
        }
      }
    `
  );
  return allPredictedCsv.nodes;
};

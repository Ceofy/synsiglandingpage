import { useStaticQuery, graphql } from 'gatsby';

export const useCoreGenesWebsiteVal = () => {
  const { allCoreGenesWebsiteValCsv } = useStaticQuery(
    graphql`
      query AllCoreGenesWebsiteValCsv {
        allCoreGenesWebsiteValCsv {
          nodes {
            Gene
            Cortex
            Striatum
            Fetal
            NGN2
            SynGO
            GO_Synapse
            SynDB
            SynSysNet
          }
        }
      }
    `
  );
  return allCoreGenesWebsiteValCsv.nodes;
};

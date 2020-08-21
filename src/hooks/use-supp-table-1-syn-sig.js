import { useStaticQuery, graphql } from 'gatsby';

export const useSuppTable1SynSig = () => {
  const { allSuppTable1SynSigCsv } = useStaticQuery(
    graphql`
      query AllSuppTable1SynSigCsv {
        allSuppTable1SynSigCsv {
          nodes {
            Gene
            Average_Score
            Classification
            Cortex
            Striatum
            Fetal
            hiPSC
            SynGO
            GO_Synapse
            SynDB
            SynSysNet
          }
        }
      }
    `
  );
  return allSuppTable1SynSigCsv.nodes;
};

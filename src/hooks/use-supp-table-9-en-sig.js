import { useStaticQuery, graphql } from 'gatsby';

export const useSuppTable9EnSig = () => {
  const { allSuppTable9EnSigCsv } = useStaticQuery(
    graphql`
      query AllSuppTable9EnSigCsv {
        allSuppTable9EnSigCsv {
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
  return allSuppTable9EnSigCsv.nodes;
};

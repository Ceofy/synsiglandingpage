import { useStaticQuery, graphql } from 'gatsby';

export const useSuppTable1SynSig = () => {
  const { allSuppTable1SynSigCsv } = useStaticQuery(
    graphql`
      query AllSuppTable1SynSigCsv {
        allSuppTable1SynSigCsv {
          nodes {
            Gene
            Synapse_Status
            Synapse_Percentile
            Cortex
            Striatum
            Fetal
            hiPSC
            SynGO
            SynDB
            SynSysNet
          }
        }
      }
    `
  );
  return allSuppTable1SynSigCsv.nodes;
};

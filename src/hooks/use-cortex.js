import { useStaticQuery, graphql } from 'gatsby';

export const useCortex = () => {
  const { allCortexCsv } = useStaticQuery(
    graphql`
      query AllCortexCsv {
        allCortexCsv {
          nodes {
            Gene_Symbol
            CountOfPeptide1
            FirstOfClean_Peptide
            Spectral_count
            MSGF_SpecProb
            Protein_ID
            WT1
            WT2
            WT3
          }
        }
      }
    `
  );
  return allCortexCsv.nodes;
};

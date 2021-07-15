import { useStaticQuery, graphql } from 'gatsby';

export const useStriatum = () => {
  const { allStriatumCsv } = useStaticQuery(
    graphql`
      query AllStriatumCsv {
        allStriatumCsv {
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
  return allStriatumCsv.nodes;
};

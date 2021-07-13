import { useStaticQuery, graphql } from 'gatsby';

export const useTables5 = () => {
  const { allTables5Csv } = useStaticQuery(
    graphql`
      query AllTables5Csv {
        allTables5Csv {
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
  return allTables5Csv.nodes;
};

import { useStaticQuery, graphql } from 'gatsby';

export const useTables4 = () => {
  const { allTables4Csv } = useStaticQuery(
    graphql`
      query AllTables4Csv {
        allTables4Csv {
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
  return allTables4Csv.nodes;
};

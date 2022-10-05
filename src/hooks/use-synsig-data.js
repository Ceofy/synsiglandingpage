import { useStaticQuery, graphql } from 'gatsby';

export const useSynsigData = () => {
  const { allSynsigDataCsv } = useStaticQuery(
    graphql`
      query AllSynsigDataCsv {
        allSynsigDataCsv {
          nodes {
            genes
            avg_scores
            syngo
            syndb
            synsysnet
            cortex
            striatum
            fetal
            ngn2
            Lit_Sum
            Exp_Sum
            All_Sum
            SynSig
            Synapse_Status
            Synapse_Percentile
            name
            Receptor_Channel
            Kinase_Phosphatase
            Ubiquitin_E3
            Vesicle_Transporters
            GTP_ATP_Regulators
            Nucleic_Acid_Binding
            Translation
            Membrane_Cell_Adhesion
            Other_Regulators
            Scaffolds_Adaptors
            Cytoskeletal
            Calcium_Ion_Binding
            Other_Enzymes
            Other_protein_binders
            unknown_functions
            Function_Total
            MF_Terms
            training
          }
        }
      }
    `
  );
  return allSynsigDataCsv.nodes;
};

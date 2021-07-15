import React from 'react';
import styles from './userGuideStyles/userGuide.module.css';

const UserGuide = () => {
  return (
    <div className={styles.userGuide}>
      <h3>Training Genes:</h3>
      <p>
        We adopt the definition of synapse genes from SynGO, a recent
        expert-curated database of synapse genes. This definition includes any
        protein that is expressed in the synaptic cellular compartment. To
        identify novel synapse molecules, randomly chosen SynGO_CC (positive
        training genes) and non-SynGO_CC genes (negative training genes) were
        used to train the machine learning model.
      </p>
      <h3>Predicted Genes:</h3>
      <p>
        To avoid prediction bias, we restricted our search pool to genes that
        met the following criteria:
      </p>
      <ol>
        <li>Expressed in the human brain;</li>
        <li>Characterized by all the molecular features.</li>
      </ol>
      <p>
        The predicted genes are thus the genes in this pool and should have a
        synapse similarity score.
      </p>
      <h3>Prediction of SynSig genes:</h3>
      <p>
        SynSig contains synapse genes predicted using synaptic signatures in
        multi-omics data. The "Synapse Similarity Likelihood Score" shows the
        computed ranking of protein-coding genes, classifying each gene as
        either SynSig (likely to be synapse) or non-SynSig.
      </p>
      <h3>Synapse Proteomics Validation:</h3>
      <p>
        We supported our predictions using four synapse proteomics screens, each
        from a different experimental model. From the adult mouse brain, we
        harvested the cortex and striatum, and enriched for the postsynaptic
        density (PSD). From the fetal human brain and human induced-pluripotent
        stem cell-derived (hiPSC-derived) neurons, we enriched for the PSD. From
        all four PSD samples, we then conducted mass spectrometry analysis.
      </p>
    </div>
  );
};

export default UserGuide;

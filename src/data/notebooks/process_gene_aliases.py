import csv
import json

with open('./synsig_gene_aliases.csv') as f:

    reader = csv.reader(f)
    header = next(reader)
    alias_to_gene = {}
    gene_to_aliases = {}
    for row in reader:
        original_gene = row[0]
        aliases = row[1].replace('[', '').replace(']', '').replace('\'', '').split(', ')

        gene_to_aliases[original_gene] = []
        for alias in aliases:

            if alias != 'nan' and alias != '':
                alias_to_gene[alias] = original_gene
                gene_to_aliases[original_gene] = gene_to_aliases[original_gene] + [alias]
    
    print(alias_to_gene, gene_to_aliases)
    data = {
        'aliasesMap': alias_to_gene,
        'genesMap': gene_to_aliases
    }
    with open('./synsig_gene_aliases.js', 'w') as jsf:
        jsf.write('export const data = ')
        json.dump(data, jsf, indent=2)

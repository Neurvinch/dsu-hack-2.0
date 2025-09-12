import { MerkleTree } from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';

export const createMerkleTree = (data) => {
  const leaves = data.map(x => SHA256(x));
  const tree = new MerkleTree(leaves, SHA256);
  return tree;
};

export const getMerkleRoot = (tree) => {
  return tree.getRoot().toString('hex');
};

export const getMerkleProof = (tree, leaf) => {
  const hashedLeaf = SHA256(leaf);
  return tree.getProof(hashedLeaf).map(x => x.data.toString('hex'));
};

export const verifyMerkleProof = (tree, leaf, proof) => {
  const hashedLeaf = SHA256(leaf);
  return tree.verify(proof, hashedLeaf, tree.getRoot());
};
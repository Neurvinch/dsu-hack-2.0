import React, { useState, useEffect } from 'react';
import { createMerkleTree, getMerkleRoot, getMerkleProof, verifyMerkleProof } from './merkleUtils';

const MerkleTreeComponent = () => {
  const [data, setData] = useState(['apple', 'banana', 'cherry', 'date']);
  const [merkleTree, setMerkleTree] = useState(null);
  const [root, setRoot] = useState('');
  const [leafToProve, setLeafToProve] = useState('null');
  const [proof, setProof] = useState([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const tree = createMerkleTree(data);
    setMerkleTree(tree);
    setRoot(getMerkleRoot(tree));
  }, [data]);

  useEffect(() => {
    if (merkleTree && leafToProve) {
      const currentProof = getMerkleProof(merkleTree, leafToProve);
      setProof(currentProof);
      setIsValid(verifyMerkleProof(merkleTree, leafToProve, currentProof));
    }
  }, [merkleTree, leafToProve]);

  return (
    <div>
      <h1>Merkle Tree Example</h1>
      <div>
        <h2>Data:</h2>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {merkleTree && (
        <div>
          <h2>Merkle Root:</h2>
          <p>{root}</p>

          <h2>Prove Leaf:</h2>
          <input
            type="text"
            value={leafToProve}
            onChange={(e) => setLeafToProve(e.target.value)}
          />
          <p>Proof for "{leafToProve}": {proof.join(', ')}</p>
          <p>Proof is Valid: {isValid ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default MerkleTreeComponent;
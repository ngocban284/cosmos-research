import axios from "axios";

const getBlockFromHeight = async (height: number) => {
  const blockResponse = await axios.get(
    `https://rpc.orai.io/block?height=${height}`
  );
  const block = blockResponse.data.result.block;
  return block;
};

const getBlockHeader = async (height: number) => {
  const block = await getBlockFromHeight(height);
  const header = block.header;
  return header;
};

const getBlockEvidence = async (height: number) => {
  const block = await getBlockFromHeight(height);
  const evidence = block.evidence;
  return evidence;
};

const getBlockData = async (height: number) => {
  const block = await getBlockFromHeight(height);
  console.log(block);
  const data = block.data;
  return data;
};

const getPreveousValidatorSignatures = async (height: number) => {
  const block = await getBlockFromHeight(height);
  const lastCommit = block.last_commit;
  return lastCommit;
};

const getTxFromTxHash = async (txHash: string) => {
  const txResponse = await axios.get(`https://rpc.orai.io/tx?hash=${txHash}`);
  console.log(txResponse);
  return txResponse;
};

// const getBlockHeightFromTxHash = async (txHash: string) => {
//   const tx = await getTxFromTxHash(txHash);
//   const blockHeight = tx.block_height;
//   return blockHeight;
// };

getTxFromTxHash(
  "236863BCDC800DEB99200DA550F699263A01331D5276874DF0E7F6849D66980D"
);

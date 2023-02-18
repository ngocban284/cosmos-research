import axios from "axios";
const { sha256 } = require("@cosmjs/crypto");
const { toHex } = require("@cosmjs/encoding");

const getBlockFromHeight = async (height: number) => {
  const blockResponse = await axios.get(
    `https://rpc.orai.io/block?height=${height}`
  );

  return blockResponse;
};

const getTxDetails = async (txHash: string) => {
  const txs = await axios.get(
    `http://lcd.orai.io/cosmos/tx/v1beta1/txs/${txHash}`
  );
  console.log(txs);
  return txs;
};

// txs field in block
const getAllTxsFromBlock = async (height: number) => {
  const block = await getBlockFromHeight(height);
  const txs = block.data.result.block.data.txs;
  return txs;
};

//txs field in block after decode
const getAllTxHashOfBlock = async (height: number) => {
  const txs = await getAllTxsFromBlock(height);
  let listTxs: string[] = [];
  for (let i = 0; i < txs.length; i++) {
    const txHash = toHex(sha256(Buffer.from(txs[i], "base64")));
    listTxs.push(txHash);
  }

  return listTxs;
};

getAllTxHashOfBlock(10340037).then((res) => console.log(res));

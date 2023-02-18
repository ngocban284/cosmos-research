// get tx cosmos hub
import { SigningStargateClient, IndexedTx } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";

const getTxWithSigner = async (
  mnemonic: string,
  address: string,
  txHash: string
): Promise<void> => {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
  const [{ address: walletAddress }] = await wallet.getAccounts();
  if (address !== walletAddress) {
    throw new Error("The recovered address does not match the wallet address");
  }
  const client = await SigningStargateClient.connectWithSigner(
    "https://rpc.cosmos.network:443",
    wallet
  );
  let tx: IndexedTx = (await client.getTx(txHash))!;
  // sender
  const decodedTx: Tx = Tx.decode(tx.tx);
  const msgSend: MsgSend = MsgSend.decode(decodedTx.body!.messages[0].value);
  console.log("msgSend info: ", msgSend);
};

getTxWithSigner(
  "fresh artefact glue trial baby pear resource cost swamp style vanish ginger",
  "cosmos1yzhx2q6ns9jd4cngzg4f3ny2ds3pnglygkstep",
  "BD1E67528E1F25B07492D87C48514CEE62186727C7C5721CD0CDF948D1E24509"
);

const getTxWithoutSigner = async (txHash: string): Promise<void> => {
  const client = await SigningStargateClient.connect(
    "https://rpc.cosmos.network:443"
  );
  let tx: IndexedTx = (await client.getTx(txHash))!;
  // sender
  const decodedTx: Tx = Tx.decode(tx.tx);
  const msgSend: MsgSend = MsgSend.decode(decodedTx.body!.messages[0].value);
  console.log("msgSend info: ", msgSend);
};

getTxWithoutSigner(
  "BD1E67528E1F25B07492D87C48514CEE62186727C7C5721CD0CDF948D1E24509"
);

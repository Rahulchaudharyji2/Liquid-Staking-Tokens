const { 
  Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction, SystemProgram 
} = require("@solana/web3.js");
const { PRIVATE_KEY, TOKEN_MINT_ADDRESS } = require("./address");
const {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  createBurnCheckedInstruction,
} = require("@solana/spl-token");
const bs58 = require("bs58");
const { getMint } = require("@solana/spl-token");


const connection = new Connection("https://api.devnet.solana.com");
const Secret = bs58.default.decode(PRIVATE_KEY);
const wallet = Keypair.fromSecretKey(Secret);

const mint = new PublicKey(TOKEN_MINT_ADDRESS);

async function mintTokens(fromAddress, amount) {
  const recipient = new PublicKey(fromAddress);
  console.log("Trying to mint to recipient:", recipient.toBase58());

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,         
    mint,           
    recipient,      
    false          
    
  );
  console.log("Recipient token account:", tokenAccount.address.toBase58());
const mintInfo = await getMint(connection, mint);
  console.log("Mint Authority:", mintInfo.mintAuthority?.toBase58() || "None");
  console.log("Your Wallet:", wallet.publicKey.toBase58());

  if (!mintInfo.mintAuthority) {
    throw new Error("❌ This mint has no authority set. Cannot mint more tokens.");
  }

  if (mintInfo.mintAuthority.toBase58() !== wallet.publicKey.toBase58()) {
    throw new Error("❌ Wallet is not the mint authority. Use the correct authority keypair.");
  }
  await mintTo(
    connection,
    wallet,
    mint,
    tokenAccount.address,
    wallet.publicKey,
    amount,
    []              
  );
  console.log('Minted', amount, 'tokens to', fromAddress);
}

async function burnToken(amount) {
  const owner = wallet.publicKey;

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    mint,
    owner,
    false
  
  );
  console.log("Burning from token account:", tokenAccount.address.toBase58());

  const transaction = new Transaction().add(
    createBurnCheckedInstruction(
      tokenAccount.address,
      mint,
      owner,
      amount,
      9,
      []
    )
  );
  const signature = await sendAndConfirmTransaction(connection, transaction, [wallet]);
  console.log('Burned', amount, 'tokens. Transaction signature:', signature);
}

async function sendNativeToken(toAddress, amount) {
  const recipient = new PublicKey(toAddress);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: recipient,
      lamports: amount * 1e9 
    })
  );
  const signature = await sendAndConfirmTransaction(connection, transaction, [wallet]);
  console.log('Sent', amount, 'SOL to', toAddress, 'Transaction signature:', signature);
}

module.exports = {
  mintTokens,
  burnToken,
  sendNativeToken,
};
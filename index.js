require("dotenv").config();
const express = require("express")
const {PUBLIC_KEY}=require("./address");
const { mintTokens, burnToken, sendNativeToken } = require("./mintToken");
const app=express();
app.use(express.json())
const vault= process.env.VAULT;
app.post('/helius',async(req,res)=>{
    const helius_response= req.body;
     const incomingTxn = helius_response.nativeTransfers?.find(
    (x) => x.toUserAccount === vault
  );
  if (!incomingTxn) {
    return res.status(400).send("No matching transfer to vault");
  }
  const fromAddress= incomingTxn.fromUserAccount;
  const amount= incomingTxn.amount;
  const type = "received_native_sol";  
  try {
    if(type==="received_native_sol"){
        await mintTokens(fromAddress,amount)
    }else{
        await burnToken(amount);
        await sendNativeToken(fromAddress,amount)
    }
    res.send("Transaction Successfull")
    
  } catch (error) {
     console.error("Error processing transaction:", error);
    res.status(500).send("Internal Server Error");
  }
})
app.listen(3000,()=>{
    console.log("server is running at port 3000");
});
# 🔗 Liquid Staking Token (LST) Project

Welcome to my **Liquid Staking Token (LST)** project! 🚀  
This project is built on **Solana blockchain** and showcases how staking can be made more flexible through **liquid staking**.  

---

## 📌 What is LST (Liquid Staking Token)?
LSTs allow users to **stake their tokens** while still keeping them **liquid and transferable**.  
Instead of locking your tokens and losing liquidity, you receive a **liquid staking token** that can be:
- Traded
- Transferred
- Used in DeFi protocols  

This means your staked tokens are still **earning rewards**, while you can use LSTs elsewhere in the ecosystem.  

---

## ⚙️ Features
- ✅ **Minting Tokens** – Automatically mints LST when a user deposits SOL  
- ✅ **Burning Tokens** – Burn LST to redeem your staked SOL  
- ✅ **Vault System** – Secure vault that manages token staking  
- ✅ **Transfer Handling** – Detects native SOL transfers and mints equivalent LST  
- ✅ **Real-time Interaction** – Works with webhooks & APIs  

---

## 🛠️ Tech Stack
- **Blockchain:** Solana  
- **SDKs:** [Helius APIs](https://www.helius.dev)  
- **Backend:** Node.js + Express.js  
- **Wallets:** Backpack Wallet (for vault & user keys)  
- **Other Tools:** Webhooks, Postman for testing  

---

## 🚀 Benefits of LST
- 🔄 **Liquidity** – Use staked tokens without waiting for unstaking  
- 📈 **DeFi Utility** – Collateralize, lend, or trade with your LSTs  
- 💰 **Earnings** – Continue earning staking rewards while keeping liquidity  
- 🔐 **Security** – Vault-based structure for safe management  

---

## 📂 Project Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Add environment variables

Create a .env file in your project root:
```bash
PRIVATE_KEY=your_wallet_private_key
HELIUS_API_KEY=your_helius_key
VAULT_PUBLIC_KEY=your_vault_public_key
```
### 4️⃣ Start server
```bash
npm run dev
```
###📬 API Endpoints
Mint Tokens
```bash
POST /mint
```
Burn Tokens
```bash
POST /burn
```
Send Sol
```bash
POST /send
```
---

**Connect with me:**  
[LinkedIn](https://www.linkedin.com/in/rahulchaudharyji2/) | [GitHub](https://github.com/Rahulchaudharyji2)


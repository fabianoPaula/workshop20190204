import Transaction from "./transaction";
import Block from "./block";
import BlockChain from "./blockchain";

const genesisHash = (size) => {
	let text = ""; 
	for (var i = 0; i < size; i++)
    	text += "0";

  	return text;
}

let bc = new BlockChain(genesisHash(65), 3, "Felipe", 100)

let t1 = new Transaction("rodrigo", "Fabiano", 1000)
let t2 = new Transaction("Fabiano", "Felipe", 900)

bc.addTransaction(t1)
bc.addTransaction(t2)

bc.mineBlocks()

console.log(bc.getBlockchainInfo())

let t3 = new Transaction("lucas", "Fabiano", 800)
let t4 = new Transaction("Fabiano", "Miguel", 500)

bc.addTransaction(t3)
bc.addTransaction(t4)

bc.mineBlocks()

console.log(bc.getBlockchainInfo())


console.log(`Balance of Fabiano: ${bc.getBalanceOf("Fabiano")}`);
console.log(`Balance of Satoshi: ${bc.getBalanceOf("Satoshi")}`);
console.log(`Balance of Felipe: ${bc.getBalanceOf("Felipe")}`);

import Transaction from "./transaction";
import Block from "./block";
import _ from "underscore";

export default class Blockchain {

	constructor(genesisHash, difficulty, minerAddress,rewardMiner){
		this.genesisHash = genesisHash;
		this.lastHash = genesisHash;
		this.minerAddress = minerAddress;
		this.rewardMiner = rewardMiner;
		this.difficulty = difficulty;
		this.blocks = [];
		this.pendingTransactions = [];
	}

	mineBlocks(){
		this.addTransaction(new Transaction("Satoshi",this.minerAddress, this.rewardMiner))
		let block = new Block(this.lastHash,this.pendingTransactions);
		let hash = block.minerBlock(this.difficulty)
		this.blocks.push(block);
		this.lastHash = hash;
		this.pendingTransactions = [];
	}

	addTransaction(transaction){
		this.pendingTransactions.push(transaction);
	}

	getBlockchainInfo() {
		let result = `Blockchain\ngenesisHash: ${this.genesisHash}\nLastHash: ${this.lastHash}\nTotal Blocks: ${this.blocks.length}\n`;

		this.blocks.forEach((block) => {
			result += `${block.getBlockInfo()}\n`;
		})

		result += "\n";

		return result;
	}

	getBalanceOfDeprecated(address){
		let balance = 0;

		this.blocks.forEach((block) => {
			block.txList.forEach((tx) => {
				if (tx.from === address) {
					balance -= tx.amount;
				}else if (tx.to === address) {
					balance += tx.amount;
				}
			})
		})

		return balance;
	}

	getBalanceOf(address){
		let balance = _.reduce(
			_.filter(
				_.flatten(_.map(this.blocks, (block) => block.txList)),
				(tx) => tx.from === address || tx.to === address
			), 
			(prev, tx) => {
				if (tx.from === address) {
					return prev - tx.amount;
				}else if (tx.to === address) {
					return prev + tx.amount;
				}
			}, 
			0
		);

		return balance;
	}
}
import { zerosString } from "./helper";
import SHA256  from "crypto-js/sha256";

export default class Block {

	constructor(prevHash, txList) {
		this.prevHash = prevHash;
		this.txList = txList;
		this.timestamp = Date.now();
		this.nonce = 0;
		this.hash = "";
	}

	hashInfo() {
		return `prev hash ${this.prevHash}, txs: ${JSON.stringify(this.txList)}`;
	}

	minerBlock(difficulty){
		let hash = "wknefyugwefywieyf8wyefiwey";
		let success = zerosString(difficulty);
		let nonce = this.nonce;
		while( hash.substring(0,difficulty) !== success){
			hash = SHA256(`${this.prevHash}${this.timestamp}${JSON.stringify(this.txList)}${nonce}`).toString();
			nonce += 1;
		}
		this.nonce = nonce - 1;
		this.hash = hash;
		return this.hash;
	}

	getBlockInfo() {

		return `Block: ${this.hash}\n PrevHash: ${this.prevHash}\n txs: ${this.txList}\n nonce: ${this.nonce}`;
	}
}
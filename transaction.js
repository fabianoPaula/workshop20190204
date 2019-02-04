export default class Transaction {

	constructor(from, to, amount) {
		this.from = from;
		this.to = to; 
		this.amount = amount;
	}

	toString(){
		return `Transaction: ${this.from} to ${this.to} amount of ${this.amount} `;
	}
}


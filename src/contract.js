import React from 'react';
import web3 from './web3';
import lottery from './lottery'
class Contract extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			manager: '',
			players: '',
			balance: '',
			value: '',
			message: '',
		}
	}

	async componentDidMount() {
		const accounts = await web3.eth.getAccounts();
		// 相当于 call({from: account[0]})
		const manager  = await lottery.methods.manager().call();
		const players = await lottery.methods.getPlayers().call();
		const balance =  await web3.eth.getBalance(lottery.options.address);
		console.log('manager', manager)
		this.setState({ manager, players, balance })
	}
	onSubmit = async(event) => {
		//As usual we want to make sure that the form does not attempt to submit itself in the classic HTML. way.
		event.preventDefault();
		//when we send a transaction we unfortunately do have to retrieve our list of accounts from the web3 object and then specify the account that is going to be used to send money over to that particular
		const accounts = await web3.eth.getAccounts();
		this.setState({message: 'wating on transaction success...'})
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei(this.state.value)
		});
		this.setState({message: 'you have been entered'})		
	}

	pickWinner = async() => {
		const accounts = await web3.eth.getAccounts();
		this.setState({message: 'wating on picking a winner'});
		await lottery.methods.pickWinner().send({
			from: accounts[0]
		});
		this.setState({message: 'A winner has been picked'})
	}
	render() {
		web3.eth.getAccounts().then(console.log)
		return (
			<React.Fragment>
				<h2>contract</h2>
				<p>this contract is managerd by { this.state.manager}</p>
				<p>there are currently { this.state.players.length } &nbsp;
				people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')}</p>
				<hr></hr>
				<form onSubmit={this.onSubmit}>
					<h4> what to try your luck ?</h4>
					<div>
						<input 
							value={this.state.value}
							onChange={event=>this.setState({value: event.target.value})}></input>

					</div>
					<button>enter</button>
				</form>
				<hr/>
				<h4>Ready to pick a winner</h4>
				<button onClick={this.pickWinner}>pick a winner</button>

				<h1>{this.state.message}</h1>


    	</React.Fragment>
		);
	}
 }
 export default Contract;
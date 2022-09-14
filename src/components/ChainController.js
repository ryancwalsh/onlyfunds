import {Component} from "react";

class ChainController extends Component {

    constructor(props) {
        super(props)
        console.log("init")
    }

    // transaction log
    async componentDidMount(address) {
        // read all entities
    let res = await fetch(`https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?key=ckey_c8711f1dcaa34e67952cf876ae7`)
    console.log(address)
    console.log(res)

    }
    // eventlog
    async componentDidMount(address) {
    let res = await fetch(fetch("https://api.covalenthq.com/v1/1/events/address/${address}/?starting-block=1&ending-block=12240004&key=Get"))
    console.log(address)
    console.log(res)
    }


    render() {
        return 
    }
}

export default ChainController
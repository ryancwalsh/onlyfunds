import {Component} from "react";

class ChainController extends Component {

    constructor(props) {
        super(props)
        console.log("init")
    }

    async componentDidMount(address) {
        // read all entities
    let res = await fetch(`https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?key=ckey_c8711f1dcaa34e67952cf876ae7`)
    console.log(address)
    console.log(res)

}

    render() {
        return 
    }
}

export default ChainController
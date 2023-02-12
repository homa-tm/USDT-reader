'use strict';

const axios = require('axios');

const main = async (blockNumber) => {
    const usdtTransaction = [];
    const trxTransaction = [];
    
    
    try {
        const url = `https://api.trongrid.io/v1/blocks/${ blockNumber }/events?only_confirmed=0&limit=200`;
        const {data} = await axios.get(url);
        for (const tx of data.data) {
            if (tx.contract_address === "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t") {
                const newTx = {
                    transaction_id: tx.transaction_id,
                    from: tx.result.from,
                    to: tx.result.to,
                    value: tx.result.value,
                }
                usdtTransaction.push(newTx);
            } else if(!tx.contract_address || tx.contract_address === "") {
                const newTx = {
                    transaction_id: tx.transaction_id,
                    from: tx.result.from,
                    to: tx.result.to,
                    value: tx.result.value,
                }
                trxTransaction.push(newTx);
            }
        }
        
        const result = {
            "USDT_transaction": usdtTransaction,
            "TRX_transaction": trxTransaction,
            "block_number": blockNumber
        }
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

main(48478788);
import axios from 'axios'

let t = []

for(let i =0;i<5;i++){
  t.push({
    "transaction_hash": "0x893e250d3f6732df8c6f90ebf5a57181f25ed959a7b216492af3783152aaad5f",
    "log_index": 151,
    "from": "0x3a2e8d768dbac0f48964281b3a9bd34aec6b9ace",
    "to": "0xdc8dbca78a5da4f29ca4572dc4734c0048d61c2f",
    "tokenId": "123411",
    "tokenId_decimal": {
        "__type": "NumberDecimal",
        "value": "56838"
    },
    "address": "0xd4793c2a8991f9a8d2f4714e113194c2ddebfa50",
    "block_hash": "0x46c6f3d3cbd8b53a3a7234929abfc5c433219bafde2aa3ac25bb258e05ec2080",
    "block_number": 19188068,
    "transaction_index": 36,
    "block_timestamp": {
        "__type": "Date",
        "iso": "2022-07-02T04:04:43.000Z"
    },
    "confirmed": false,
    "updatedAt": "2022-07-02T04:04:47.403Z",
    "objectId": "PvrKfXLHLnGLIykDdZC2Pufz"
})
}

t.forEach(item=>{
  axios.post("https://testws.baotran17.repl.co/api/newitem",item)
})
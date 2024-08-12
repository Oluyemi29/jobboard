import React from 'react'
type Amount = {
    amount : number
}
const Currency = ({amount} : Amount) => {

  return new Intl.NumberFormat("en-US",{
    style : "currency",
    currency : "USD"
  }).format(amount)
}

export default Currency

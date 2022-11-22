import axios from 'axios'

export const createConnectAccount = async (token) =>
    await axios.post(`${process.env.REACT_APP_API}/create-connect-account`, {}, {
        headers: {
            Authorization: `Bearer ${token}`

        }
    })


//give us the user status
export const getAccountStatus = async (token) => axios.post(`${process.env.REACT_APP_API}/get-account-status`, {}, {
    headers: {
       Authorization: `Bearer ${token}` 
    }
})    

// getting the stripe user account balance
export const getAccountBalance = async (token) => axios.post(`${process.env.REACT_APP_API}/get-account-balance`, {}, {
    headers: {
       Authorization: `Bearer ${token}` 
    }
})    



// currency formatting

export const currencyFormatter = data =>{
    return (data.amount).toLocaleString(data.currency, {
    style:"currency",
    currency:data.currency
    })
}

// stripe payout settings 
export const payoutSetting = async (token) => await axios.post(`${process.env.REACT_APP_API}/payout-setting`, {},{
    headers: {
        Authorization: `Bearer ${token}`
    }
})


// get session id
export const getSessionId = async (token,hotelId) => await axios.post(`${process.env.REACT_APP_API}/stripe-session-id`, {hotelId}, {headers: {
        Authorization: `Bearer ${token}`
        }
    }
)

export const stripeSuccessRequest = async (token,hotelId) => await axios.post(`${process.env.REACT_APP_API}/stripe-success`, {hotelId}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
} )
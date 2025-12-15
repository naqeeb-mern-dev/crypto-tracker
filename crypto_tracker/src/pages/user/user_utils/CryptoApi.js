import axios from "axios"

export const getCryptoList = async (signal) => {
  try {
    const url = `${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/crypto-tracker/crypto-list`;

    let response = await axios.get(url, { signal });
    return response.data;

  } catch (err) {
    throw err;
  }
};

export const getCryptoListById = async (id) => {
  try {
    const url = `${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/crypto-tracker/crypto-list-id/${id}`;

    let response = await axios.get(url); 
    return response.data;

  } catch (err) {
    throw err;
  }
};

export const cryptoHighLightsUpdate = async (userId, coinId) => {
    try {
        const url = `${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/crypto-tracker/crypto-highlights-update/${userId}/${coinId}`;
        let response = await axios.post(url);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const cryptoHighLightsList = async (userId) => {
    try {
        const url = `${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/crypto-tracker/crypto-highlights-list/${userId}`;
        let response = await axios.get(url);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const cryptoHighLightsDelete = async (userId) => {
    try {
        const url = `${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/crypto-tracker/crypto-highlights-delete/${userId}`;
        let response = await axios.get(url);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const cryptoIcon = async (coinIds) => {
  try {
    // Ensure coinIds is ALWAYS an array
    const ids = Array.isArray(coinIds) ? coinIds : [coinIds];

    const url = `${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/crypto-tracker/crypto-icon-list?coinIds=${ids.join(',')}`;
    const response = await axios.get(url);

    return response.data.data; // returns {id: {logo: ...}, ...}
  } catch (err) {
    console.log('Icon API error:', err.response?.data || err);
    throw err;
  }
};


 
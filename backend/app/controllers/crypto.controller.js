let axios = require("axios");
const cryptoWishListModel = require("../models/crypto.models");

let crypto_list = async (req, res) => {
    try { 

        const response = await axios.get(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`,
            {
                headers: {
                    "X-CMC_PRO_API_KEY": process.env.SECRET_KEY_CRYPTO_AUTHORIZATION
                }
            }
        );

        return res.status(200).json({
            status: 1,
            message: "Success",
            data: response.data
        });

    } catch (err) {
        console.log("Error:", err.response?.data || err.message);
        return res.status(500).json({
            status: 0,
            message: err.response?.data || err.message
        });
    }
};

let crypto_list_by_id = async (req, res) => {
  try { 
    let id = req.params.id;

    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.SECRET_KEY_CRYPTO_AUTHORIZATION
        },
        params: {
          id: id,
          convert: "USD"
        }
      }
    );

    const coin = response.data.data[id];

    if (!coin) {
      return res.status(404).json({
        status: 0,
        message: `Coin with id ${id} not found`
      });
    }

    return res.status(200).json({
      status: 1,
      message: "Success",
      data: coin
    });

  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
    return res.status(500).json({
      status: 0,
      message: err.response?.data || err.message
    });
  }
};


let crypto_highlights_update = async (req, res) => {
    try {
        const { userId, coinId } = req.params;
 
        if (!userId || !coinId) {
            return res.status(400).json({
                status: 0,
                message: "User ID or Coin ID missing"
            });
        }

        const checkList = await cryptoWishListModel.find({ userId:userId, coinId:coinId });

        if (checkList.length > 0) {
            // Remove existing
            await cryptoWishListModel.deleteOne({ _id: checkList[0]._id });
            return res.status(200).json({
                status: 10,
                message: "Removed from highlights"
            });
        } else {
            // Add new
            const addHigh = new cryptoWishListModel({ userId, coinId });
            await addHigh.save();
            return res.status(201).json({
                status: 1,
                message: "Added to highlights"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, message: "Server Error" });
    }
};


let crypto_highlights_List = async (req, res) => {
  try {
    const id = req.params.id;
    
    if (!id) {
      return res.status(400).json({
        status: 0,
        message: "User ID is required"
      });
    }

    const checkList = await cryptoWishListModel.find({ userId: id });

    // Always return 200 with data array (even if empty)
    return res.status(200).json({
      status: 1,
      message: "Highlights fetched",
      data: checkList // [] if empty
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 0, message: "Server Error" });
  }
};

let crypto_highlights_user_delete = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                status: 0,
                message: "User ID missing"
            });
        }

        // Check if any record exists
        const checkList = await cryptoWishListModel.find({ userId });

        if (checkList.length === 0) {
            return res.status(404).json({
                status: 0,
                message: "No highlights found for this user"
            });
        }

        // Delete all records with this userId
        await cryptoWishListModel.deleteMany({ userId });

        return res.status(200).json({
            status: 10,
            message: "All highlights removed for this user"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, message: "Server Error" });
    }
};


// In-memory cache
let iconsCache = { data: {}, timestamp: 0 };
const cryptoIconList = async (req, res) => {
  try {
    const { coinIds } = req.query; // expects: ?coinIds=1,1027,52
    if (!coinIds) return res.status(400).json({ error: 'coinIds is required' });

    const ids = coinIds.split(',');
    const now = Date.now();
    const result = {};

    // Get cached icons
    const cacheValid = iconsCache.timestamp && now - iconsCache.timestamp < 60 * 60 * 1000;
    const missingIds = [];

    ids.forEach(id => {
      if (cacheValid && iconsCache.data[id]) {
        result[id] = iconsCache.data[id];
      } else {
        missingIds.push(id);
      }
    });

    // If some IDs are missing, fetch them from CoinMarketCap
    if (missingIds.length > 0) {
      const response = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${missingIds.join(',')}`,
        { headers: { 'X-CMC_PRO_API_KEY': process.env.SECRET_KEY_CRYPTO_AUTHORIZATION } }
      );

      for (const [id, info] of Object.entries(response.data.data)) {
        result[id] = { logo: info.logo };
        // update cache individually
        iconsCache.data[id] = { logo: info.logo };
      }

      // update timestamp only when fetching new data
      iconsCache.timestamp = now;
    }

    res.json({ data: result });
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};


module.exports = { crypto_list,crypto_list_by_id,crypto_highlights_List,crypto_highlights_update,cryptoIconList,crypto_highlights_user_delete };

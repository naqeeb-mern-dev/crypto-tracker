import axios from "axios"

export const userList = async(id)=>{
  try
  {
    console.log("userId",id)
    if(id)
    {
      const response = await axios.get(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-list/${id}`);
      return response.data
    }else
    {
      const response = await axios.get(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-list`);
      return response.data

    }
     
     
  }catch(err)
  {
    throw err.response || err;
  }
}
 

export const userInsert = async(formData)=>{
  try
  {
    const response = await axios.post(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-registeration`,formData);
    return response.data
  }catch(err)
  {
    throw err.response || err;
  }
}

export const userUpdate = async(formData,id)=>{
  try
  {
    console.log("userUpdate: ",formData,id)
    const response = await axios.put(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-update/${id}`,formData);
    return response.data
     
  }catch(err)
  {
    throw err.response || err;
  }
}
 

export const userDelete= async(id)=>{
  try
  {
    const response = await axios.delete(`${process.env.REACT_APP_CRYPTO_API_URL}/api/v1/user/user-delete/${id}`);
    return response.data
     
  }catch(err)
  {
    throw err.response || err;
  }
}
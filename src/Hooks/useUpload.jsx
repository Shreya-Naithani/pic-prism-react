import axios from "axios";

const useUpload = async({image,onUploadProgress})=>{
try {
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset","picPrism");
    formData.append("api_key","189756525943396");


    const config ={
        headers:{
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress : onUploadProgress,
        withCredentials:false,
    };
    const res = await axios.post(`https://api.cloudinary.com/v1_1/dshiqs0yq/image/upload`,formData,config);
    const data =await res.data;
  
    if(!data){
        return console.log("uploading image failed");
    }
    return{
        public_id : data.public_id,
        url: data.secure_url,
    }
} catch (error) {
    return error.message;
}
}



export default useUpload;
import axios from axios;

const useUpload = async({image,onUploadProgress})=>{
try {
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset",import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key",import.meta.env.VITE_CLOUDINARY_API_KEY);

    const config ={
        headers:{
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress : onUploadProgress,
        withCredentials:false,
    };
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`);
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
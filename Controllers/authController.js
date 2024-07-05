
//signup
export const signup = async(req,res)=>{
    try {
        res.status(200).json({message:"Login successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}








//login
export const login = async(req,res)=>{
    try {
        res.status(200).json({message:"Login successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
}
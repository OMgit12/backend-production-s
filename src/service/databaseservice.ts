import  config  from "../config/config";
import mongoose from "mongoose"; 


export default {
    connection: async () => {
        try {
            await mongoose.connect(config.DATABASE_URL as string);
        } catch (error) {
            throw error
        }
    }
}

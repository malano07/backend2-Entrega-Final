import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO,
    secret_jwt: process.env.SECRET_JWT
};





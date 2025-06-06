import dotenv from 'dotenv'
dotenv.config();

const config = {
    node_env : process.env.NODE_ENV,
    port : process.env.PORT,

    db_url : process.env.DB_URL,

    soltRound: process.env.SLTR,

    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_EXPIRES_IN,
    jwt_access_expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    
    reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
    
    smtp_auth_user: process.env.SMTP_AUTH_USER,
    smtP_auth_pass: process.env.SMTP_AUTH_PASS,

    cloude_name: process.env.CLOUDE_NAME,
    cloude_api_key: process.env.CLOUDE_API_KEY,
    cloude_api_secret: process.env.CLOUDE_API_SECRET
}

export {config};


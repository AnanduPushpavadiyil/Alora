import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

// Load environment variables from the .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Define the schema for environment variables using Joi
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('production', 'quality', 'uat', 'development', 'test')
    .required(),
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.string().required().description('Mongo DB url'),
  SERVER_URL: Joi.string().required().description('Server url').required(),
  JWT_SECRET: Joi.string().required().description('JWT secret key').required(),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
    .default(30)
    .description('minutes after which access tokens expire')
    .required(),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
    .default(30)
    .description('days after which refresh tokens expire')
    .required(),
  S3_BUCKETNAME: Joi.string().description('S3 bucket name'),
  AWS_SECRET_ACCESS_KEY: Joi.string().description('AWS Secret Access Key'),
  AWS_ACCESS_KEY_ID: Joi.string().description('AWS Access key'),
  AWS_REGION: Joi.string().description('AWS Region'),
  SMTP_HOST: Joi.string().description('SMTP server that will send the emails'),
  SMTP_PORT: Joi.number().description('port to connect to the email server'),
  SMTP_USERNAME: Joi.string().description('username for email server'),
  SMTP_PASSWORD: Joi.string().description('password for email server'),
  EMAIL_FROM: Joi.string().description(
    'the from field in the emails sent by the app'
  ),
  WALLET_PRIVATE_KEY: Joi.string().description('Web3 wallet privateKey'),
  WALLET_ADDRESS: Joi.string().description('Web3 wallet address'),
  MAGIC_SECRET: Joi.string().description('Magic secret key'),
}).unknown();

// TypeScript interface for the environment variables
// interface EnvVars {
//   NODE_ENV: 'production' | 'quality' | 'uat' | 'development' | 'test';
//   PORT: number;
//   MONGODB_URL: string;
//   SERVER_URL: string;
//   JWT_SECRET: string;
//   JWT_ACCESS_EXPIRATION_MINUTES: number;
//   JWT_REFRESH_EXPIRATION_DAYS: number;
//   S3_BUCKETNAME?: string;
//   AWS_SECRET_ACCESS_KEY?: string;
//   AWS_ACCESS_KEY_ID?: string;
//   AWS_REGION?: string;
//   SMTP_HOST?: string;
//   SMTP_PORT?: number;
//   SMTP_USERNAME?: string;
//   SMTP_PASSWORD?: string;
//   EMAIL_FROM?: string;
//   WALLET_PRIVATE_KEY?: string;
//   WALLET_ADDRESS?: string;
//   MAGIC_SECRET?: string;
// }

// Validate and extract the environment variables
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  // throw new Error(`Config validation error: ${error.message}`);
  //  NextResponse.json(
  //   { error: error.message || `Config validation error: ${error.message}`},
  //   { status: 500 }
  // );
}

// Export the configuration in a structured format
export const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  serverUrl: envVars.SERVER_URL,
  s3Bucket: envVars.S3_BUCKETNAME,
  privateKey: envVars.WALLET_PRIVATE_KEY,
  walletAddress: envVars.WALLET_ADDRESS,
  magicSecretKey: envVars.MAGIC_SECRET,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
  aws: {
    awsScretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    awsAccesskey: envVars.AWS_ACCESS_KEY_ID,
    awsRegion: envVars.AWS_REGION,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};

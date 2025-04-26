import dotenv from 'dotenv';

dotenv.config();

export default {
	development: {
		url: process.env.DATABASE_URL,
		dialect: process.env.DB_DIALECT,
		dialectOptions: { ssl: { require: true } },
	},
	production: {
		url: process.env.DATABASE_URL,
		dialect: process.env.DB_DIALECT,
		dialectOptions: { ssl: { require: true } },
	},
};

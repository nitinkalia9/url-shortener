import { response } from 'express';
import db from '../models/index.js';
import { emailRegex, GetRandomString } from '../utils/index.js';
import moment from 'moment';
/* signup */
export const Signup = async (req, res) => {
	try {
		const { first_name, last_name, email, password, phone } = req.body;
		/* check empty fields */
		if (!password || !email) {
			throw { status: 400, message: `Missing required params` };
		}
		if (password.length < 8) {
			throw { status: 400, message: `Password too short` };
		}
		if (!emailRegex.test(email)) {
			throw { status: 400, message: `Enter a valid email address` };
		}
		/* validate if user with same email already exists */
		const exists = await db.User.findOne({ raw: true, where: { email } });
		if (exists) {
			throw { status: 409, message: `Account with this email already exists` };
		}
		const user = await db.User.create({ first_name, last_name, email, password, phone });
		const user_id = user.id;
		let response = { id: user_id };
		try {
			const login_at = moment.utc();
			const expires_at = login_at.clone().add(7, 'days');
			const token = GetRandomString(16);
			await db.UserLogin.create({ user_id, token, login_at, expires_at });
			response.access_token = token;
		} catch (err) {
			/*  */
		}
		res.status(201).json({ data: response, is_success: true });
	} catch (err) {
		const status = err?.status || 500;
		const message = err?.message || 'Something went wrong, pls try again shortly.';
		res.status(status).json({ message });
	}
};
/* login */
export const Login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			throw { status: 400, message: 'Enter all the required Details' };
		}

		const user = await db.User.findOne({ where: { email } });
		if (!user) {
			throw { status: 401, message: 'Invalid Credentials' };
		}

		if (user.password != password) {
			throw { status: 401, message: 'Invalid Credentials' };
		}
		const login_at = moment.utc();
		const expires_at = moment.utc().add(7, 'days');
		const token = GetRandomString(16);
		await db.UserLogin.create({ user_id: user.id, token, login_at, expires_at });
		return res.status(200).json({
			message: 'User Logged In Successfully',
			data: {
				access_token: token,
			},
		});
	} catch (err) {
		console.log(err);
		const status = err?.status || 500;
		const message = err?.message || 'Something went wrong, pls try again shortly.';
		res.status(status).json({ message });
	}
};
/* forget password */
export const ForgretPasswordRequest = (req, res) => {
	try {
		/*  */
	} catch (err) {
		const status = err?.status || 500;
		const message = err?.message || 'Something went wrong, pls try again shortly.';
		res.status(status).json({ message });
	}
};

export const ForgretPasswordReset = (req, res) => {
	try {
		/*  */
	} catch (err) {
		const status = err?.status || 500;
		const message = err?.message || 'Something went wrong, pls try again shortly.';
		res.status(status).json({ message });
	}
};

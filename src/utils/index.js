import crypto from 'node:crypto';

export const emailRegex = /^\S+@\S+\.\S+$/;

export const GetRandomString = (length) => crypto.randomBytes(length).toString('hex');

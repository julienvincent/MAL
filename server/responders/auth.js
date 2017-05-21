const jwt = require("jsonwebtoken")

const {SECRET = "dev", PASSWORD = "admin"} = process.env

const GENERATE_TOKEN = async ({action}) => {
	const {password} = action.payload

	if (password !== PASSWORD) {
		return {
			type: "AUTH_ERROR",
			payload: {
				message: "Invalid password"
			},
			status: 401
		}
	}

	try {
		token = jwt.sign("AUTH", SECRET)

		return {
			type: "AUTH_SUCCESS",
			payload: {token},
         status: 200
		}
	} catch (err) {
		if (err) {
			return {
				type: "SIGN_ERROR",
				payload: {
					message: "Unable to sign token",
					error: err
				},
				status: 401
			}
		}
	}
}

module.exports = {
   GENERATE_TOKEN
}
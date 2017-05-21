const auth = require("./auth")
const state = require("./state")
const _ = require("lodash")

const responders = {
	...auth,
	...state
}

const dispatch = async ({action, viewer}) => {
	const responder = _.find(responders, (responder, type) => type == action.type)

	if (typeof action !== "object" || typeof action.type !== "string") {
		return {
			type: "ACTION_ERROR",
			payload: {
				message: "Invalid action"
			}
		}
	}

	if (!responder) {
		return {
			type: "RESPONDER_ERROR",
			payload: {
				message: "Unknown responder"
			}
		}
	}

	return await responder({action, viewer})
}

module.exports = dispatch

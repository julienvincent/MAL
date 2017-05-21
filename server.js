const http = require("http")
const url = require("url")
const next = require("next")
const dispatch = require("./server/responders")

const dev = process.env.NODE_ENV !== "production"
const app = next({dev})
const handle = app.getRequestHandler()

const handlePost = ({req, res, url}) => {
	let buffer = ""

	req.on("data", data => (buffer += data))
	req.on("end", async () => {
		try {
			const body = JSON.parse(buffer)

			let responseAction = {
				type: "REQUEST_ERROR",
				payload: {
					message: "Unknown request"
				},
				status: 500
			}

			switch (url.pathname) {
				case "/dispatch": {
					responseAction = await dispatch(body)
				}
			}

			res.writeHead(responseAction.status || 200, {
				"Content-Type": "application/json"
			})
			res.end(JSON.stringify(responseAction))
		} catch (e) {
			res.writeHead(500, {"Content-Type": "text/html"})
			res.end(
				JSON.stringify({
					type: "REQUEST_ERROR",
					payload: {
						message: "Invalid body. Expected action"
					},
					status: 500
				})
			)
		}
	})
}

app.prepare().then(() => {
	const listener = (req, res) => {
		const parsedUrl = url.parse(req.url, true)
		const {pathname, query} = parsedUrl

		if (req.method === "post") {
			return handlePost({req, res, url: parsedUrl})
		}

		handle(req, res, parsedUrl)
	}
	const server = http.createServer(listener)

	server.listen(3000, err => {
		if (err) throw err
		console.log("> Ready on http://localhost:3000")
	})
})

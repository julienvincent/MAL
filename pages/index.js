// @flow
import Head from "next/head"
import App from "./App"

const styles = {
	body: {
		width: "100%",
		height: "100vh",
		margin: 0
	}
}

export default () => (
	<html>
		<Head>
			<title>My Anime List</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>

		<body style={styles.body}>
			<App />
		</body>
	</html>
)

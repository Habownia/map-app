/* eslint-disable @next/next/no-head-element */

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head></head>
			<body>
				<nav>Aplikacja</nav>
				{children}
			</body>
		</html>
	);
}

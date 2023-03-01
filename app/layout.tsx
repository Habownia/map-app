/* eslint-disable @next/next/no-head-element */

import Nav from '../components/Nav';
import style from '../sass/Main.module.scss';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head></head>
			<body className={style.body}>
				<Nav />
				{children}
			</body>
		</html>
	);
}

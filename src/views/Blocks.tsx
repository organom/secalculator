import {Container, Stack} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';

export default function Blocks(props: { blocks: any[] }) {
	return (
		<Container>
			<Link to="/">Back</Link>
			<Stack direction="vertical" gap={2}>
				<div>Blocks</div>
			</Stack>
		</Container>
	);
}

import {Container, Stack} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';

export default function Components(props: { components: any[] }) {
	return (
		<Container>
			<Link to="/">Back</Link>
			<Stack direction="vertical" gap={2}>
				<div>Total Components loaded: {props.components.length}</div>
			</Stack>
		</Container>
	);
}

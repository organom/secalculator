import {Container, Stack} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';

export default function Blueprint(props: { blocks: any[], components: any[] }) {
	return (
		<Container>
			<Link to="/">Back</Link>
			<Stack direction="vertical" gap={2}>
				<div>Blueprint</div>
			</Stack>
		</Container>
	);
}

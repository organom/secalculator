import {Container, Stack} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';

export default function Components(props: { components: any[] }) {
	return (
		<Container>
			<Link to="/">Back</Link>
			<Stack direction="vertical" gap={4}>
				<Stack direction="horizontal" gap={3}>
					<div>Components</div>
				</Stack>
			</Stack>
		</Container>
	);
}

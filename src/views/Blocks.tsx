import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';

export default function Blocks(props: { blocks: any[] }) {
	return (
		<Container>
			<Link to="/">Back</Link>
			<div>Total Blocks loaded: {props.blocks.length}</div>
		</Container>
	);
}

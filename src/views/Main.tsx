import {Container, Stack} from 'react-bootstrap';
import React from 'react';

export default function Main(props: { blocks: any[], components: any[] }) {
	return (
		<div>
			<Stack direction="vertical" gap={2}>
				<div>Total Blocks loaded: {props.blocks.length}</div>
				<div>Total Components loaded: {props.components.length}</div>
			</Stack>
		</div>
	);
}

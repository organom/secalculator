import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';

import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

export default function Components(props: { components: any[] }) {
	return (
		<Container>
			<Link to="/">Back</Link>
			<div>Total Components loaded: {props.components.length}</div>
			<Table virtualized
				   height={400}
				   bordered={true}
				   data={props.components}
				   onRowClick={rowData => {
					   console.log(rowData);
				   }}>
				<Column resizable={true}>
					<HeaderCell>Code</HeaderCell>
					<Cell dataKey="Code" />
				</Column>

				<Column resizable={true}>
					<HeaderCell>Display Name</HeaderCell>
					<Cell dataKey="DisplayName" />
				</Column>

			</Table>
		</Container>
	);
}

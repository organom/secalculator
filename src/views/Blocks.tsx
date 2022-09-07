import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';

import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

export default function Blocks(props: { blocks: any[] }) {
	return (
		<Container>
			<Link to="/">Back</Link>
			<div>Total Blocks loaded: {props.blocks.length}</div>
			<Table virtualized
				   height={400}
				   bordered={true}
				   data={props.blocks}
				   onRowClick={rowData => {
					   console.log(rowData);
				   }}>
				<Column flexGrow={1} resizable>
					<HeaderCell>DisplayName</HeaderCell>
					<Cell dataKey="DisplayName" />
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>CubeSize</HeaderCell>
					<Cell dataKey="CubeSize" />
				</Column>
				<Column flexGrow={1} resizable>
					<HeaderCell>Type</HeaderCell>
					<Cell dataKey="Id.TypeId" />
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>PCU</HeaderCell>
					<Cell dataKey="PCU" />
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>BuildTimeSeconds</HeaderCell>
					<Cell dataKey="BuildTimeSeconds" />
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>RequiredPowerInput</HeaderCell>
					<Cell dataKey="RequiredPowerInput" />
				</Column>
			</Table>
		</Container>
	);
}

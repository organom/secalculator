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
				<Column flexGrow={2}>
					<HeaderCell>Name</HeaderCell>
					<Cell dataKey="DisplayName" />
				</Column>
				<Column align={'center'}>
					<HeaderCell>Size</HeaderCell>
					<Cell dataKey="CubeSize" />
				</Column>
				<Column flexGrow={1}>
					<HeaderCell>Type</HeaderCell>
					<Cell dataKey="Id.TypeId" />
				</Column>
				<Column flexGrow={1}>
					<HeaderCell>Subtype</HeaderCell>
					<Cell dataKey="Id.SubtypeId" />
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>PCU</HeaderCell>
					<Cell dataKey="PCU" />
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>Build(sec)</HeaderCell>
					<Cell dataKey="BuildTimeSeconds" />
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>Power</HeaderCell>
					<Cell dataKey="RequiredPowerInput" />
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>Pressurized</HeaderCell>
					<Cell>
						{rowData => ( <span>{rowData.IsPressurized ? 'Yes' : 'No'}</span> )}
					</Cell>
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>AirTight</HeaderCell>
					<Cell>
						{rowData => ( <span>{rowData.IsAirTight ? 'Yes' : 'No'}</span> )}
					</Cell>
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>Public</HeaderCell>
					<Cell>
						{rowData => ( <span>{rowData.Public ? 'Yes' : 'No'}</span> )}
					</Cell>
				</Column>
				<Column align={'center'} resizable>
					<HeaderCell>DLC</HeaderCell>
					<Cell dataKey="DLC" />
				</Column>
			</Table>
		</Container>
	);
}

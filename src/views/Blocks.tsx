import {Link} from 'react-router-dom';
import React, {useState} from 'react';

import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import {SortType} from 'rsuite-table/src/@types/common';

export default function Blocks(props: { blocks: any[] }) {
	const [loading, setLoading] = useState<boolean>(false);
	const [sortColumn, setSortColumn] = useState<string>('Name');
	const [sortType, setSortType] = useState<SortType | undefined>('asc');

	function getData(data: any[]): any[] {
		if (sortColumn && sortType) {
			return data.sort((a, b) => {
				let x = a[sortColumn];
				let y = b[sortColumn];
				if (typeof x === 'string') {
					x = x.charCodeAt(0);
				}
				if (typeof y === 'string') {
					y = y.charCodeAt(0);
				}
				return sortType === 'asc' ? x - y : y - x;
			});
		}
		return data;
	}

	function handleSortColumn(sortColumn: string, sortType: SortType | undefined) {
		setLoading(true);
		setTimeout(() => {
			setSortColumn(sortColumn);
			setSortType(sortType);
			setLoading(false);
		}, 10);
	}



	return (
		<div>
			<Link to="/">Back</Link>
			<div className="mb-3">Total Blocks loaded: {props.blocks.length}</div>
			<Table virtualized
				   bordered
				   height={800}
				   data={getData(props.blocks)}
				   sortColumn={sortColumn}
				   sortType={sortType}
				   onSortColumn={handleSortColumn}
				   loading={loading}
				   onRowClick={rowData => {
					   console.log(rowData);
				   }}>
				<Column resizable sortable>
					<HeaderCell>Name</HeaderCell>
					<Cell dataKey="DisplayName" />
				</Column>
				<Column align={'center'} resizable sortable>
					<HeaderCell>Size</HeaderCell>
					<Cell dataKey="CubeSize" />
				</Column>
				<Column resizable sortable>
					<HeaderCell>Type</HeaderCell>
					<Cell dataKey="Id.TypeId" />
				</Column>
				<Column resizable sortable>
					<HeaderCell>Subtype</HeaderCell>
					<Cell dataKey="Id.SubtypeId" />
				</Column>
				<Column align={'center'} resizable sortable>
					<HeaderCell>PCU</HeaderCell>
					<Cell dataKey="PCU" />
				</Column>
				<Column align={'center'} resizable sortable>
					<HeaderCell>Build(sec)</HeaderCell>
					<Cell dataKey="BuildTimeSeconds" />
				</Column>
				<Column align={'center'} resizable sortable>
					<HeaderCell>Power</HeaderCell>
					<Cell dataKey="RequiredPowerInput" />
				</Column>
				<Column align={'center'} resizable sortable>
					<HeaderCell>Pressurized</HeaderCell>
					<Cell>
						{rowData => ( <span>{rowData.IsPressurized ? 'Yes' : 'No'}</span> )}
					</Cell>
				</Column>
				<Column align={'center'} resizable sortable>
					<HeaderCell>AirTight</HeaderCell>
					<Cell>
						{rowData => ( <span>{rowData.IsAirTight ? 'Yes' : 'No'}</span> )}
					</Cell>
				</Column>
				<Column align={'center'} resizable sortable>
					<HeaderCell>Public</HeaderCell>
					<Cell>
						{rowData => ( <span>{rowData.Public ? 'Yes' : 'No'}</span> )}
					</Cell>
				</Column>
				<Column align={'center'} resizable sortable>
					<HeaderCell>DLC</HeaderCell>
					<Cell dataKey="DLC" />
				</Column>
			</Table>
		</div>
	);
}

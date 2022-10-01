import React, {useState} from 'react';

import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import {SortType} from 'rsuite-table/src/@types/common';

export default function Components(props: { components: any[] }) {
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
			<div className="mb-3">Total Components loaded: {props.components.length}</div>
			<Table virtualized
				   bordered
				   height={800}
				   data={getData(props.components)}
				   sortColumn={sortColumn}
				   sortType={sortType}
				   onSortColumn={handleSortColumn}
				   loading={loading}
				   onRowClick={rowData => {
					   console.log(rowData);
				   }}>
				<Column width={300} resizable sortable>
					<HeaderCell>Code</HeaderCell>
					<Cell dataKey="Code" />
				</Column>

				<Column width={300} resizable sortable>
					<HeaderCell>Display Name</HeaderCell>
					<Cell dataKey="DisplayName" />
				</Column>
			</Table>
		</div>
	);
}

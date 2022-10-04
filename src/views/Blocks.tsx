import React, {useState} from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import BoolFilter from '@inovua/reactdatagrid-community/BoolFilter'
import {bool, number} from '@inovua/reactdatagrid-community/filterTypes';
import {TypeColumn} from '@inovua/reactdatagrid-community/types/TypeColumn';
import {TypeFilterValue} from '@inovua/reactdatagrid-community/types/TypeFilterValue';

export default function Blocks(props: { blocks: any[] }) {
	const [loading, setLoading] = useState<boolean>(false);

	const gridStyle = { minHeight: 700 }
	const columns: TypeColumn[] = [
		{ name: 'Id.SubtypeId', header: 'Subtype', minWidth: 20, defaultFlex: 1, render: ({ data }) => data.Id.SubtypeId },
		{ name: 'Id.TypeId', header: 'Type', minWidth: 20, defaultFlex: 1, render: ({ data }) => data.Id.TypeId },
		{ name: 'CubeSize', header: 'Size', minWidth: 20, defaultFlex: 1 },
		{ name: 'PCU', header: 'PCU', type: 'number', filterEditor: NumberFilter, minWidth: 20, defaultFlex: 1 },
		{ name: 'BuildTimeSeconds', header: 'Build(sec)', type: 'number', filterEditor: NumberFilter, minWidth: 20, defaultFlex: 1 },
		{ name: 'RequiredPowerInput', header: 'Power', type: 'number', filterEditor: NumberFilter, minWidth: 20, defaultFlex: 1 },
		{ name: 'IsPressurized', header: 'Pressurized', sortable: false, minWidth: 20, defaultFlex: 1, type: 'boolean', filterEditor: BoolFilter, render: ({ value }) => value ? 'yes' : 'no' },
		{ name: 'IsAirTight', header: 'AirTight', sortable: false, minWidth: 20, defaultFlex: 1, type: 'boolean', filterEditor: BoolFilter, render: ({ value }) => value ? 'yes' : 'no' },
		{ name: 'DLC', header: 'DLC', minWidth: 20,  defaultFlex: 1 }
	]
	const filterValue: TypeFilterValue = [
		{ name: 'Id.SubtypeId', operator: 'contains', type: 'string', value: '', fn: ({ value, filterValue, data }) => data.Id.SubtypeId.toLowerCase().includes(filterValue.toLowerCase()) },
		{ name: 'Id.TypeId', operator: 'contains', type: 'string', value: '', fn: ({ value, filterValue, data }) => data.Id.TypeId.toLowerCase().includes(filterValue.toLowerCase()) },
		{ name: 'CubeSize', operator: 'startsWith', type: 'string', value: '' },
		{ name: 'PCU', operator: 'gte', type: 'number', value: number.emptyValue },
		{ name: 'BuildTimeSeconds', operator: 'gte', type: 'number', value: number.emptyValue },
		{ name: 'RequiredPowerInput', operator: 'gte', type: 'number', value: number.emptyValue },
		{ name: 'IsPressurized', operator: 'eq', type: 'boolean', value: bool.emptyValue },
		{ name: 'IsAirTight', operator: 'eq', type: 'boolean', value: bool.emptyValue },
		{ name: 'DLC', operator: 'startsWith', type: 'string', value: '' },
	];

	return (
		<div>
			<div className="mb-3">Total Blocks loaded: {props.blocks.length}</div>
			<ReactDataGrid
				idProperty="id"
				columns={columns}
				dataSource={props.blocks}
				style={gridStyle}
				allowUnsort={false}
				editable={true}
				loading={loading}
				defaultFilterValue={filterValue}
			/>
		</div>
	);
}

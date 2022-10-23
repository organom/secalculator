import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter'
import {number} from '@inovua/reactdatagrid-community/filterTypes';
import {TypeColumn} from '@inovua/reactdatagrid-community/types/TypeColumn';
import {TypeFilterValue} from '@inovua/reactdatagrid-community/types/TypeFilterValue';

export default function Components(props: { components: any[] }) {
	//const [loading, setLoading] = useState<boolean>(false);

	const columns: TypeColumn[] = [
		{ name: 'Id.SubtypeId', header: 'Subtype', minWidth: 20, defaultFlex: 2, render: ({ data }) => data.Id.SubtypeId },
		{ name: 'DisplayName', header: 'Display Name', minWidth: 20, defaultFlex: 1, render: ({ data }) => data.DisplayName.replace('DisplayName_Item_', '').replace('DisplayName_Block_', '')},
		{ name: 'Mass', header: 'Mass', minWidth: 20, defaultFlex: 1, type: 'number', filterEditor: NumberFilter },
		{ name: 'Volume', header: 'Volume', minWidth: 20, defaultFlex: 1, type: 'number', filterEditor: NumberFilter },
		{ name: 'MaxIntegrity', header: 'MaxIntegrity', minWidth: 20, defaultFlex: 1, type: 'number', filterEditor: NumberFilter },
		{ name: 'Health', header: 'Health', minWidth: 20, defaultFlex: 1, type: 'number', filterEditor: NumberFilter },
	];

	const filterValue: TypeFilterValue = [
		{ name: 'Id.SubtypeId', operator: 'contains', type: 'string', value: '', fn: ({ value, filterValue, data }) => data.Id.SubtypeId.toLowerCase().includes(filterValue.toLowerCase()) },
		{ name: 'DisplayName', operator: 'contains', type: 'string', value: ''},
		{ name: 'Mass', operator: 'eq', type: 'number', value: number.emptyValue },
		{ name: 'Volume', operator: 'eq', type: 'number', value: number.emptyValue },
		{ name: 'MaxIntegrity', operator: 'eq', type: 'number', value: number.emptyValue },
		{ name: 'Health', operator: 'eq', type: 'number', value: number.emptyValue }
	];

	const gridStyle = { minHeight: 700 }

	return (
		<div>
			<div className="mb-3">Total Components loaded: {props.components.length}</div>
			<ReactDataGrid
				idProperty="id"
				columns={columns}
				dataSource={props.components}
				style={gridStyle}
				allowUnsort={false}
				editable={true}
				//		loading={loading}
				defaultFilterValue={filterValue}
			/>
		</div>
	);
}

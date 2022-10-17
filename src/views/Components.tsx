import React from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import {TypeColumn} from '@inovua/reactdatagrid-community/types/TypeColumn';

export default function Components(props: { components: any[] }) {
	//const [loading, setLoading] = useState<boolean>(false);

	const columns: TypeColumn[] = [
		{ name: 'Id.SubtypeId', header: 'Subtype', minWidth: 20, defaultFlex: 2, render: ({ data }) => data.Id.SubtypeId },
		{ name: 'Mass', header: 'Mass', minWidth: 20, defaultFlex: 1 },
		{ name: 'Volume', header: 'Volume', minWidth: 20, defaultFlex: 1 },
		{ name: 'MaxIntegrity', header: 'MaxIntegrity', minWidth: 20, defaultFlex: 1 },
		{ name: 'Health', header: 'Health', minWidth: 20, defaultFlex: 1 },
	]
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
			/>
		</div>
	);
}

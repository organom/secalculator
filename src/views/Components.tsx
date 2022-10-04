import React, {useState} from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

export default function Components(props: { components: any[] }) {
	const [loading, setLoading] = useState<boolean>(false);

	const columns = [
		{ name: 'Code', header: 'Code', minWidth: 20, defaultFlex: 1 },
		{ name: 'DisplayName', header: 'Display Name', minWidth: 20, defaultFlex: 1 }
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
				loading={loading}
			/>
		</div>
	);
}

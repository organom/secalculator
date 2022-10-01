import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Navigate, Route, Routes} from 'react-router-dom';
import {Navbar,Container, Alert, Spinner, Stack} from 'react-bootstrap';
import Main from './views/Main';
import Blueprint from './views/Blueprint';
import Blocks from './views/Blocks';
import Components from './views/Components';
import {parseSBCFile} from './Helpers';

async function downloadAndParseBlockFile(url: string) {
	const response = await axios.get(url, {
		responseType: 'blob',
		headers: {'Content-Type': 'application/octet-stream'}
	});
	const blob = new Blob([response.data], {type: response.headers['content-type']});
	const parsedContent = await parseSBCFile(blob);
	return parsedContent.CubeBlocks.Definition || [];
}

async function loadBaseBlocks(filesPath: string) {
	const files = [ 'CubeBlocks', 'CubeBlocks_Armor', 'CubeBlocks_Armor_2', 'CubeBlocks_Automation', 'CubeBlocks_Communications', 'CubeBlocks_Control', 'CubeBlocks_DecorativePack',
		'CubeBlocks_DecorativePack2', 'CubeBlocks_Doors', 'CubeBlocks_Economy', 'CubeBlocks_Energy', 'CubeBlocks_Extras', 'CubeBlocks_Frostbite', 'CubeBlocks_Gravity', 'CubeBlocks_Interiors',
		'CubeBlocks_LCDPanels', 'CubeBlocks_Lights', 'CubeBlocks_Logistics', 'CubeBlocks_Mechanical', 'CubeBlocks_Medical', 'CubeBlocks_Production', 'CubeBlocks_ScrapRacePack',
		'CubeBlocks_SparksOfTheFuturePack', 'CubeBlocks_Symbols', 'CubeBlocks_Thrusters', 'CubeBlocks_Tools', 'CubeBlocks_Utility', 'CubeBlocks_Warfare1', 'CubeBlocks_Weapons', 'CubeBlocks_Wheels',
		'CubeBlocks_Windows', 'CubeBlocks_ArmorPanels', 'CubeBlocks_Armor_3', 'CubeBlocks_IndustrialPack', 'CubeBlocks_Warfare2']

	const promises = files.map(file => downloadAndParseBlockFile(`${filesPath}/${file}.sbc`));
	const results = await Promise.all(promises);
	return results.flat();
}

export default function App() {
	const filesPath: string = 'https://organom.github.io/secalculator/cubeblocks';
	const [blocks, setBlocks] = useState<any[]>([]);
	const [components, setComponents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadBaseBlocks(filesPath).then(blocks => {
			setBlocks(blocks);
			const components = blocks.map(x => x.Components.Component).flat();
			const uniqueComponents = [...new Set(components.map(t => t['@_Subtype']))];
			setComponents(uniqueComponents.map(t => {
				return {
					Code: t,
					DisplayName: t.replace(/([A-Z])/g, ' $1')
				};
			}));
			setLoading(false);
		});
	}, [filesPath])

	return (
		<div>
			<Navbar bg='dark' variant='dark' fixed='top' className="ps-3">
				<Navbar.Brand><Link to="/">SeCalculator</Link></Navbar.Brand>
				<Navbar.Toggle />
				{ !loading &&
					<Navbar.Collapse className='justify-content-end'>
						<Stack direction='horizontal' gap={3}>
							<div className="text-light">Blocks: {blocks.length}</div>
							<div className="text-light ">Components: {components.length}</div>
							<Link to="blueprint">Blueprint</Link>
							<Link to='blocks'>Blocks</Link>
							<Link to='components'>Components</Link>
							<a href='https://github.com/organom/secalculator'><i className="bi bi-github me-3"/></a>
						</Stack>
					</Navbar.Collapse> }
			</Navbar>
			<Alert key='danger' variant='danger' id='ErrorPanel' />
			<div className="my-auto mt-5 ms-3 me-3 mb-3">
				{ loading
					?
					<Container className="d-flex justify-content-center align-items-center">
						<Stack direction='horizontal'>
							<Spinner animation="border" /><h2 className="mx-4">Loading...</h2>
						</Stack>
					</Container>
					:
					<Routes>
						<Route index element={<Blueprint blocks={blocks} components={components}/>} />
						<Route path='blueprint' element={<Blueprint blocks={blocks} components={components}/>} />
						<Route path='blocks' element={<Blocks blocks={blocks}/>} />
						<Route path='components' element={<Components components={components}/>} />
						<Route path='*' element={<Navigate to="/"/>} />
					</Routes>
				}
			</div>
		</div>
	);
}

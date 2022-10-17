import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Navigate, Route, Routes} from 'react-router-dom';
import {Navbar,Container, Alert, Spinner, Stack} from 'react-bootstrap';
import Blueprint from './views/Blueprint';
import Blocks from './views/Blocks';
import Components from './views/Components';
import {parseSBCFile} from './Helpers';

const baseComponentsFiles = [ 'Components', 'Components_Economy'];
const baseCubeBlocksFiles = [ 'CubeBlocks', 'CubeBlocks_Armor', 'CubeBlocks_Armor_2', 'CubeBlocks_Automation', 'CubeBlocks_Communications', 'CubeBlocks_Control', 'CubeBlocks_DecorativePack',
	'CubeBlocks_DecorativePack2', 'CubeBlocks_Doors', 'CubeBlocks_Economy', 'CubeBlocks_Energy', 'CubeBlocks_Extras', 'CubeBlocks_Frostbite', 'CubeBlocks_Gravity', 'CubeBlocks_Interiors',
	'CubeBlocks_LCDPanels', 'CubeBlocks_Lights', 'CubeBlocks_Logistics', 'CubeBlocks_Mechanical', 'CubeBlocks_Medical', 'CubeBlocks_Production', 'CubeBlocks_ScrapRacePack',
	'CubeBlocks_SparksOfTheFuturePack', 'CubeBlocks_Symbols', 'CubeBlocks_Thrusters', 'CubeBlocks_Tools', 'CubeBlocks_Utility', 'CubeBlocks_Warfare1', 'CubeBlocks_Weapons', 'CubeBlocks_Wheels',
	'CubeBlocks_Windows', 'CubeBlocks_ArmorPanels', 'CubeBlocks_Armor_3', 'CubeBlocks_IndustrialPack', 'CubeBlocks_Warfare2']

async function loadSBCFiles(filesPath: string, files: string[]) {
	async function downloadAndParseBlockFile(url: string) {
		const response = await axios.get(url, {
			responseType: 'blob',
			headers: {'Content-Type': 'application/octet-stream'}
		});
		const blob = new Blob([response.data], {type: response.headers['content-type']});
		const parsedContent = await parseSBCFile(blob);
		return parsedContent.CubeBlocks.Definition || parsedContent.Components.Component || [];
	}

	const promises = files.map(file => downloadAndParseBlockFile(`${filesPath}/${file}.sbc`));
	const results = await Promise.all(promises);
	return results.flat();
}

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
	list.reduce((previous, currentItem) => {
		const group = getKey(currentItem);
		if (!previous[group]) previous[group] = [];
		previous[group].push(currentItem);
		return previous;
	}, {} as Record<K, T[]>);

export default function App() {
	const basePath: string = 'https://organom.github.io/secalculator';
	const [blocks, setBlocks] = useState<any[]>([]);
	const [components, setComponents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	async function loadMod(filesPath: string, componentsFiles: string[], cubeBlocksFiles: string[]) {
		const loaded = await Promise.all([loadSBCFiles(filesPath, cubeBlocksFiles), loadSBCFiles(filesPath, componentsFiles)]);

		// CubeBlocks
		const blockIds = new Set(loaded[0].map(d => ({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})));
		const newBlocks = [...blocks.filter(d => !blockIds.has({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})), ...loaded[0]];
		setBlocks(newBlocks);

		// Components
		const compIds = new Set(loaded[1].map(d => ({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})));
		const newComponents = [...components.filter(d => !compIds.has({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})), ...loaded[1]];

		// load dummy for components used but not defined in the mod
		const extraComponents = newBlocks.map(x => x.Components.Component).flat();
		const uniqueExtraComponents = [...new Set(extraComponents.map(t => t['@_Subtype']))];
		uniqueExtraComponents.forEach(c => {
			if (!newComponents.some(d => d.Id.SubtypeId === c)) {
				console.error(`Component ${c} not found, creating dummy`);
				newComponents.push({Id: {SubtypeId: c, TypeId: 'Component'}});
			}
		});
		setComponents(newComponents);
	}

	useEffect(() => {
		loadSBCFiles(basePath + '/cubeblocks', baseCubeBlocksFiles).then(blocks => {
			setBlocks(blocks);
			loadSBCFiles(basePath + '/components', baseComponentsFiles).then(components => {
				setComponents(components);

				loadMod(basePath + '/mods/2618476231/Data/Scripts', ['Components'], ['CubeBlocks_Assembler',
					'CubeBlocks_AtmosphericThruster', 'CubeBlocks_AtmosphericThrusterSciFi', 'CubeBlocks_Battery', 'CubeBlocks_Beacon', 'CubeBlocks_CargoContainerLarge',
					'CubeBlocks_CargoContainerMedium', 'CubeBlocks_CargoContainerSmall', 'CubeBlocks_Detector',	'CubeBlocks_Drill',	'CubeBlocks_Grinder',
					'CubeBlocks_Gyroscope',	'CubeBlocks_HydrogenEngine', 'CubeBlocks_HydrogenTank',	'CubeBlocks_HydrogenThruster', 'CubeBlocks_IndustrialPack',
					'CubeBlocks_IonThruster', 'CubeBlocks_IonThrusterSciFi', 'CubeBlocks_JumpDrive', 'CubeBlocks_OxygenGenerator', 'CubeBlocks_Reactor',
					'CubeBlocks_Refinery', 'CubeBlocks_SolarPanel', 'CubeBlocks_Spotlight', 'CubeBlocks_StoneIncinerator', 'CubeBlocks_Warfare2', 'CubeBlocks_WindTurbine']).then(() => {
					setLoading(false);
				});
			});
		});
	}, [basePath])

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

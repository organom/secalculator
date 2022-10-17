import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Navigate, Route, Routes} from 'react-router-dom';
import {Navbar,Container, Alert, Spinner, Stack} from 'react-bootstrap';
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
	return await parseSBCFile(blob);
}
async function parseCubeBlockFile(url: string) {
	const parsedContent = await downloadAndParseBlockFile(url);
	return parsedContent.CubeBlocks.Definition || [];
}
async function parseComponentFile(url: string) {
	const parsedContent = await downloadAndParseBlockFile(url);
	return parsedContent.Components.Component || [];
}

async function loadBaseComponents(filesPath: string) {
	const vanillaFiles = [ 'Components', 'Components_Economy']
	const promises = vanillaFiles.map(file => parseComponentFile(`${filesPath}/components/${file}.sbc`));
	const results = await Promise.all(promises);
	return results.flat();
}

async function loadBaseBlocks(filesPath: string) {
	const vanillaFiles = [ 'CubeBlocks', 'CubeBlocks_Armor', 'CubeBlocks_Armor_2', 'CubeBlocks_Automation', 'CubeBlocks_Communications', 'CubeBlocks_Control', 'CubeBlocks_DecorativePack',
		'CubeBlocks_DecorativePack2', 'CubeBlocks_Doors', 'CubeBlocks_Economy', 'CubeBlocks_Energy', 'CubeBlocks_Extras', 'CubeBlocks_Frostbite', 'CubeBlocks_Gravity', 'CubeBlocks_Interiors',
		'CubeBlocks_LCDPanels', 'CubeBlocks_Lights', 'CubeBlocks_Logistics', 'CubeBlocks_Mechanical', 'CubeBlocks_Medical', 'CubeBlocks_Production', 'CubeBlocks_ScrapRacePack',
		'CubeBlocks_SparksOfTheFuturePack', 'CubeBlocks_Symbols', 'CubeBlocks_Thrusters', 'CubeBlocks_Tools', 'CubeBlocks_Utility', 'CubeBlocks_Warfare1', 'CubeBlocks_Weapons', 'CubeBlocks_Wheels',
		'CubeBlocks_Windows', 'CubeBlocks_ArmorPanels', 'CubeBlocks_Armor_3', 'CubeBlocks_IndustrialPack', 'CubeBlocks_Warfare2']
	const promises = vanillaFiles.map(file => parseCubeBlockFile(`${filesPath}/cubeblocks/Vanilla/${file}.sbc`));
	const results = await Promise.all(promises);
	return results.flat();
}

async function loadSkunkWorksBlocks(filesPath: string) {
	const skunkWorksFiles = [ 'Aryx_AWE_CubeBlocks', 'CubeBlocks_MorePassages_PassageLux', 'CubeBlocks_Assembler', 'CubeBlocks_OxygenGenerator', 'CubeBlocks_AtmosphericThruster',
		'CubeBlocks_PassageIntersections_Expansion', 'CubeBlocks_AtmosphericThrusterSciFi', 'CubeBlocks_PassageIntersections_HalfPassageExpansion', 'CubeBlocks_Battery',
		'CubeBlocks_PassageIntersections_HalfPassages', 'CubeBlocks_Beacon', 'CubeBlocks_PassageIntersections_Lighted', 'CubeBlocks_CargoContainerLarge', 'CubeBlocks_PassageIntersections_LightedHalfPassages',
		'CubeBlocks_CargoContainerMedium', 'CubeBlocks_PassageIntersections_Passage', 'CubeBlocks_CargoContainerSmall', 'CubeBlocks_Reactor', 'CubeBlocks_Detector', 'CubeBlocks_RebelsGates',
		'CubeBlocks_DisplayCase', 'CubeBlocks_Refinery', 'CubeBlocks_Drill', 'CubeBlocks_RotaryDoor', 'CubeBlocks_Economy', 'CubeBlocks_SmallConveyors', 'CubeBlocks_Grinder', 'CubeBlocks_SolarPanel',
		'CubeBlocks_Gyroscope', 'CubeBlocks_Spotlight', 'CubeBlocks_HydrogenEngine', 'CubeBlocks_StoneIncinerator', 'CubeBlocks_HydrogenTank', 'CubeBlocks_Tools', 'CubeBlocks_HydrogenThruster',
		'CubeBlocks_Tools_ShipGrinder', 'CubeBlocks_IndustrialPack', 'CubeBlocks_Tools_SmallBlockDrill', 'CubeBlocks_IonThruster', 'CubeBlocks_Warfare2_2', 'CubeBlocks_IonThrusterSciFi', 'CubeBlocks_Warfare2',
		'CubeBlocks_JumpDrive', 'CubeBlocks_Weapons_2', 'CubeBlocks_LargeConveyors', 'CubeBlocks_Weapons', 'CubeBlocks_Logistics', 'CubeBlocks_WindTurbine', 'CubeBlocks_MorePassages_Passage2', 'FASNR_CubeBlocks',
		'CubeBlocks_MorePassages_Passage3', 'MA_Buster_Cubeblocks', 'CubeBlocks_MorePassages_Passage3Enc', 'MA_HeavyBridge_CubeBlocks', 'CubeBlocks_MorePassages_Passage3EncLight', 'ZardosConnector_CubeBlocks',
		'CubeBlocks_MorePassages_Passage3EncOffset' ];
	const promises = skunkWorksFiles.map(file => parseCubeBlockFile(`${filesPath}/cubeblocks/SkunkWorks/${file}.sbc`));
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
	const filesPath: string = 'https://organom.github.io/secalculator';
	const [blocks, setBlocks] = useState<any[]>([]);
	const [components, setComponents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadBaseBlocks(filesPath).then(blocks => {
			setBlocks(blocks);
			loadSkunkWorksBlocks(filesPath).then(skunkWorksBlocks => {
				const ids = new Set(skunkWorksBlocks.map(d => ({SubtypeId: d.Id.SubtypeId, TypeId: d.Id.TypeId})));
				const newBlocks = [...blocks.filter(d => !ids.has({SubtypeId: d.Id.SubtypeId, TypeId: d.Id.TypeId})), ...skunkWorksBlocks];

				console.log('Blocks');
				const test = groupBy(newBlocks, (x: any) => x.Id.SubtypeId);
				for (const property in test) {
					if(!property) {
						console.log(test[property])
						continue;
					}
					test[property].length > 1 && console.log(property, test[property].map(d => d.Id.TypeId));
				}

				setBlocks(newBlocks);
				loadBaseComponents(filesPath).then(components => {
					const extraComponents = newBlocks.map(x => x.Components.Component).flat();
					const uniqueExtraComponents = [...new Set(extraComponents.map(t => t['@_Subtype']))];
					uniqueExtraComponents.forEach(c => {
						if (!components.some(d => d.Id.SubtypeId === c)) {
							console.error(`Component ${c} not found, creating dummy`);
							components.push({Id: {SubtypeId: c, TypeId: 'Component'}});
						}
					});
					setComponents(components);
					setLoading(false);
				});
			});
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

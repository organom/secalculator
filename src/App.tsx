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
const skunkWorksModsConfig: { id: string; name: string, cubeBlockFiles: string[]; componentFiles: string[] }[] = [
	{
		id: '2618476231',
		name: 'Skunkworks Tiered Tech',
		componentFiles: ['Components'],
		cubeBlockFiles:	['CubeBlocks_Assembler', 'CubeBlocks_AtmosphericThruster', 'CubeBlocks_AtmosphericThrusterSciFi', 'CubeBlocks_Battery', 'CubeBlocks_Beacon',
			'CubeBlocks_CargoContainerLarge', 'CubeBlocks_CargoContainerMedium', 'CubeBlocks_CargoContainerSmall', 'CubeBlocks_Detector',	'CubeBlocks_Drill',
			'CubeBlocks_Grinder', 'CubeBlocks_Gyroscope', 'CubeBlocks_HydrogenEngine', 'CubeBlocks_HydrogenTank', 'CubeBlocks_HydrogenThruster', 'CubeBlocks_IndustrialPack',
			'CubeBlocks_IonThruster', 'CubeBlocks_IonThrusterSciFi', 'CubeBlocks_JumpDrive', 'CubeBlocks_OxygenGenerator', 'CubeBlocks_Reactor',
			'CubeBlocks_Refinery', 'CubeBlocks_SolarPanel', 'CubeBlocks_Spotlight', 'CubeBlocks_StoneIncinerator', 'CubeBlocks_Warfare2', 'CubeBlocks_WindTurbine']
	},
	{
		id: '1712885149',
		name: 'Welders+',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Tools']
	},
	{
		id: '1906186459',
		name: 'Drills+',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Tools']
	},
	{
		id: '1712884109',
		name: 'Grinders+',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Tools']
	},
	{
		id: '1931509062',
		name: 'WeaponCore - Replace Vanilla Weapons',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Weapons']
	},
	{
		id: '2741701803',
		name: 'Long Range Searchlight',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Warfare2']
	},
	{
		id: '2015575529',
		name: 'HangarMarket (Quantum Hangar)',
		componentFiles: [],
		cubeBlockFiles:	['MarketProjector']
	},
	{
		id: '2530716039',
		name: 'Aryx Weapon Enterprises [WeaponCore]',
		componentFiles: ['Aryx_AWE_Components'],
		cubeBlockFiles:	['Aryx_AWE_CubeBlocks']
	},
	{
		id: '2704991190',
		name: 'MorePassages',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_MorePassages_Passage2', 'CubeBlocks_MorePassages_Passage3', 'CubeBlocks_MorePassages_Passage3Enc',
			'CubeBlocks_MorePassages_Passage3EncLight', 'CubeBlocks_MorePassages_Passage3EncOffset', 'CubeBlocks_MorePassages_PassageLux']
	},
	{
		id: '2783691448',
		name: 'Zardos Connector Passageway & More',
		componentFiles: ['ForceField_Components'],
		cubeBlockFiles:	['ZardosConnector_Connector Junction', 'ZardosConnector_CubeBlocks']
	},
	{
		id: '2771417713',
		name: 'M&M Experimental',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Automation']
	},
	{
		id: '1864380341',
		name: 'AQD - Conveyor Expansion',
		componentFiles: [],
		cubeBlockFiles:	['AQD_ConveyorAccess', 'AQD_ConveyorCorner', 'AQD_ConveyorEndcap', 'AQD_ConveyorJunction',
			'AQD_ConveyorStraight', 'AQD_ConveyorT', 'AQD_ConveyorVent', 'AQD_ConveyorX', 'CubeBlocks_Logistics']
	},
	{
		id: '1359954841',
		name: 'Rotary Airlock',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_RotaryDoor']
	},
	{
		id: '946724937',
		name: 'PassageIntersections',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_PassageIntersections_Expansion', 'CubeBlocks_PassageIntersections_HalfPassageExpansion',
			'CubeBlocks_PassageIntersections_HalfPassages', 'CubeBlocks_PassageIntersections_Lighted',
			'CubeBlocks_PassageIntersections_LightedHalfPassages', 'CubeBlocks_PassageIntersections_Passage']
	},
	{
		id: '2492169567',
		name: '[MAD] More Conveyors No Angeled and Block Regroup',
		componentFiles: [],
		cubeBlockFiles:	['Large/CubeBlocks', 'Small/CubeBlocks']
	},
	{
		id: '1939935505',
		name: 'AQD - Armor Expansion',
		componentFiles: [],
		cubeBlockFiles:	['AQD_Corner_Split_2x1x1_Base', 'AQD_Corner_Split_2x1x1_Tip', 'AQD_Slab_Half_Corner_Split',
			'AQD_Slope3x1', 'AQD_Slope3x1_Corner', 'AQD_Slope3x1_InvCorner', 'AQD_Slope4x1',
			'AQD_Slope4x1_Corner', 'AQD_Slope4x1_InvCorner']
	},
	{
		id: '2799659022',
		name: 'Display Cases',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_DisplayCase']
	},
	{
		id: '2449073590',
		name: 'MA Buster Blocks',
		componentFiles: [],
		cubeBlockFiles:	['MA_Buster_Cubeblocks']
	},
	{
		id: '2433117767',
		name: 'Interface Block',
		componentFiles: [],
		cubeBlockFiles:	['AVTECH_Interface']
	},
	{
		id: '2494377866',
		name: 'Store Block - Create your own Trade Station',
		componentFiles: ['Components'],
		cubeBlockFiles:	['CubeBlocks/CubeBlocks_Economy']
	},
	{
		id: '1962611090',
		name: 'First Aid Station (No Respawn)',
		componentFiles: [],
		cubeBlockFiles:	['FASNR_CubeBlocks']
	},
	{
		id: '1962611090',
		name: 'First Aid Station (No Respawn)',
		componentFiles: [],
		cubeBlockFiles:	['FASNR_CubeBlocks']
	},
	{
		id: '2493525535',
		name: 'HydrogenThing',
		componentFiles: ['Components'],
		cubeBlockFiles:	[]
	},
	{
		id: '2806919267',
		name: 'Rebels Gates',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_RebelsGates']
	},
	{
		id: '1654963857',
		name: 'MA HeavyBridge',
		componentFiles: [],
		cubeBlockFiles:	['MA_HeavyBridge_CubeBlocks']
	},
	{
		id: '1365616918',
		name: 'Defense Shields - v2.0(38)',
		componentFiles: ['CompBlueprint'],
		cubeBlockFiles:	['BlocksCategories']
	}
];

async function loadSBCFiles(filesPath: string, files: string[]) {
	async function downloadAndParseBlockFile(url: string) {
		const response = await axios.get(url, {
			responseType: 'blob',
			headers: {'Content-Type': 'application/octet-stream'}
		});
		const blob = new Blob([response.data], {type: response.headers['content-type']});
		const parsedContent = await parseSBCFile(blob);
		return parsedContent?.CubeBlocks?.Definition || parsedContent?.Components?.Component || [];
	}

	const promises = files.map(file => downloadAndParseBlockFile(`${filesPath}/${file}.sbc`));
	const results = await Promise.all(promises);
	return results.flat();
}

async function loadMods(components: any[], blocks: any[], filesPath: string, modsConfig: { id: string; name: string, cubeBlockFiles: string[]; componentFiles: string[] }[]) {
	// CubeBlocks
	const loadedBlocks = await Promise.all(modsConfig.map(x => x.cubeBlockFiles?.length > 0 ? loadSBCFiles(filesPath + '/' + x.id + '/Data', x.cubeBlockFiles) : undefined).filter(x => x));
	const cubeBlocks = loadedBlocks.flat();
	const blockIds = new Set(cubeBlocks.map(d => ({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})));
	const newBlocks = [...blocks.filter(d => !blockIds.has({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})), ...cubeBlocks];

	// Components
	const loadedComponents = await Promise.all(modsConfig.map(x => x.componentFiles?.length > 0 ? loadSBCFiles(filesPath + '/' + x.id + '/Data', x.componentFiles) : undefined).filter(x => x));
	const componentsBlocks = loadedComponents.flat();
	const compIds = new Set(componentsBlocks.map(d => ({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})));
	const newComponents = [...components.filter(d => !compIds.has({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})), ...componentsBlocks];

	// load dummy object for components used but not defined
	const extraComponents = newBlocks.map(x => x.Components.Component).flat();
	const uniqueExtraComponents = [...new Set(extraComponents.map(t => t['@_Subtype']))];
	uniqueExtraComponents.forEach(c => {
		if (!newComponents.some(d => d.Id.SubtypeId === c)) {
			console.error(`Component ${c} not found, creating dummy`);
			newComponents.push({Id: {SubtypeId: c, TypeId: 'Component'}});
		}
	});

	return {blocks: newBlocks, components: newComponents};
}

export default function App() {
	const basePath: string = 'https://organom.github.io/secalculator';
	const [blocks, setBlocks] = useState<any[]>([]);
	const [components, setComponents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadSBCFiles(basePath + '/cubeblocks', baseCubeBlocksFiles).then(blocks => {
			loadSBCFiles(basePath + '/components', baseComponentsFiles).then(components => {

				loadMods(components, blocks, basePath + '/mods', skunkWorksModsConfig).then(result => {
					setComponents(result.components);
					setBlocks(result.blocks);
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

import React, {useState, useEffect} from 'react';
import {XMLParser} from 'fast-xml-parser';
import axios from 'axios';
import {Navigate, HashRouter, Route, Routes} from 'react-router-dom';
import {Navbar,Container, Alert, Spinner, Stack, Button} from 'react-bootstrap';
import Blueprint from './views/Blueprint';
import Blocks from './views/Blocks';
import Components from './views/Components';

async function downloadAndParseBlockFile(url: string) {
	const response = await axios.get(url, {
		responseType: 'blob',
		headers: {'Content-Type': 'application/octet-stream'}
	});
	const blob = new Blob([response.data], {type: response.headers['content-type']});
	const parser = new XMLParser({
		attributeNamePrefix: '@_',
		ignoreAttributes: false,
	});
	const jsonObj = await parser.parse(await blob.text());
	if (jsonObj.Definitions) {
		return jsonObj.Definitions.CubeBlocks.Definition;
	}
	return [];
}

async function loadBaseBlocks(filesPath: string) {
	const files = [ 'CubeBlocks', 'CubeBlocks_Armor', 'CubeBlocks_Armor_2', 'CubeBlocks_Automation', 'CubeBlocks_Communications', 'CubeBlocks_Control', 'CubeBlocks_DecorativePack',
		'CubeBlocks_DecorativePack2', 'CubeBlocks_Doors', 'CubeBlocks_Economy', 'CubeBlocks_Energy', 'CubeBlocks_Extras', 'CubeBlocks_Frostbite', 'CubeBlocks_Gravity', 'CubeBlocks_Interiors',
		'CubeBlocks_LCDPanels', 'CubeBlocks_Lights', 'CubeBlocks_Logistics', 'CubeBlocks_Mechanical', 'CubeBlocks_Medical', 'CubeBlocks_Production', 'CubeBlocks_ScrapRacePack', 'CubeBlocks_SparksOfTheFuturePack',
		'CubeBlocks_Symbols', 'CubeBlocks_Thrusters', 'CubeBlocks_Tools', 'CubeBlocks_Utility', 'CubeBlocks_Warfare1', 'CubeBlocks_Weapons', 'CubeBlocks_Wheels', 'CubeBlocks_Windows' ]

	const promises = files.map(file => downloadAndParseBlockFile(`${filesPath}/${file}.sbc`));
	const results = await Promise.all(promises);
	return results.flat();
}

export default function App() {
	const filesPath: string = 'https://organom.github.io/secalculator_nuxt/CubeBlocks';
	const [baseBlocks, setBaseBlocks] = useState<any[]>([]);
	const [baseComponents, setBaseComponents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadBaseBlocks(filesPath).then(blocks => {
			setBaseBlocks(blocks);
			setBaseComponents(blocks.map(x => x.Components.Component).flat());
			setLoading(false);
		});
	}, [filesPath])

	if (loading) {
		return (
			<div className='App'>
				<div>
					<h1 className='title'>
              secalculator
					</h1>
					<Spinner animation="border" /><h2 className="mx-4">Loading...</h2>
				</div>
			</div>
		);
	}

	return (
		<HashRouter>
			<Navbar bg='dark' variant='dark' fixed='top'>
				<Container>
					<Navbar.Brand href='/'>SeCalculator</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						<Stack direction='horizontal' gap={3}>
							<Button href={`/#/blueprint`}>Blueprint</Button>
							<Button href={`/#/blocks`}>Blocks</Button>
							<Button href={`/#/components`}>Components</Button>
							<Button href={`https://github.com/organom/secalculator`}>GitHub</Button>
						</Stack>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Alert key='danger' variant='danger' id='ErrorPanel' />
			<div className='my-auto mt-5'>
				<Routes>
					<Route path="/" element={<Stack className="min-vh-100 d-flex justify-content-center align-items-center" direction='vertical' gap={3}><div>Total Blocks loaded: { baseBlocks.length }</div><div>Total Components loaded: { baseComponents.length }</div></Stack>} />
					<Route path='/blueprint' element={<Blueprint blocks={baseBlocks} components={baseComponents}/>} />
					<Route path='/blocks' element={<Blocks blocks={baseBlocks}/>} />
					<Route path='/components' element={<Components components={baseComponents}/>} />
					<Route path='*' element={<Navigate to="/#/" replace={true}/>} />
				</Routes>
			</div>
		</HashRouter>
	);
}

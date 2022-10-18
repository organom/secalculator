import React, {useState, useEffect} from 'react';

import {Link, Navigate, Route, Routes} from 'react-router-dom';
import {Navbar,Container, Alert, Spinner, Stack} from 'react-bootstrap';
import Blueprint from './views/Blueprint';
import Blocks from './views/Blocks';
import Components from './views/Components';
import {loadCollection} from './helpers';
import {SE_COLLECTIONS, VANILLA_ID} from './config';

export default function App() {
	const [blocks, setBlocks] = useState<any[]>([]);
	const [components, setComponents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const useCollection = 2832253413; // TODO: move into selector and store on cookie

	useEffect(() => {
		// -1 is special case for vanilla collection -- always load
		loadCollection(SE_COLLECTIONS.filter(x => x.id === VANILLA_ID)[0])
			.then(result => {
				// Collections are always loaded on top of Vanilla Items
				if(useCollection) {
					loadCollection(SE_COLLECTIONS.filter(x => x.id === useCollection)[0], result.components, result.cubeBlocks).then(collectionResult => {
						setComponents(collectionResult.components);
						setBlocks(collectionResult.cubeBlocks);
						setLoading(false);
					});
				} else {
					setComponents(result.components);
					setBlocks(result.cubeBlocks);
					setLoading(false);
				}
			});
	});

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

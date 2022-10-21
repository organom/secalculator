import React, {useState, useEffect} from 'react';

import {Navigate, Route, Routes, NavLink} from 'react-router-dom';
import {Navbar, Container, Alert, Spinner, Stack, Nav, NavDropdown} from 'react-bootstrap';
import Blueprint from './views/Blueprint';
import Blocks from './views/Blocks';
import Components from './views/Components';
import {loadCollection, loadVanilla} from './helpers';
import {SE_COLLECTIONS, VANILLA_ID} from './config';

export default function App() {
	const [blocks, setBlocks] = useState<any[]>([]);
	const [components, setComponents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	const storedSelectedCollection = localStorage.getItem('SESelectedCollection');
	const [selectedCollection, setSelectedCollection] = useState<number>( (storedSelectedCollection && Number(storedSelectedCollection)) || VANILLA_ID);

	useEffect(() => {
		setLoading(true);
		loadVanilla().then(vanillaResult => {
			// Collections are always loaded on top of Vanilla Items
			if(selectedCollection !== VANILLA_ID) {
				loadCollection(SE_COLLECTIONS.filter(x => x.id === selectedCollection)[0], vanillaResult.components, vanillaResult.cubeBlocks).then(collectionResult => {
					setComponents(collectionResult.components);
					setBlocks(collectionResult.cubeBlocks);
					setLoading(false);
				});
			} else {
				setComponents(vanillaResult.components);
				setBlocks(vanillaResult.cubeBlocks);
				setLoading(false);
			}
		});
	}, [selectedCollection]);

	return (
		<div>
			<Navbar collapseOnSelect bg='dark' variant='dark' fixed='top' expand='md' className="ps-3">
				<Container fluid>
					<Navbar.Brand><Nav.Link href="/secalculator/"><img
						alt=""
						src="/secalculator/SECalculator.png"
						height="20"
						className="d-inline-block align-middle"
					/></Nav.Link></Navbar.Brand>
					<Navbar.Toggle aria-controls="navbar-collapse" />
					{!loading &&
						<Navbar.Collapse id="navbar-collapse">
							<Nav className="me-auto">
								<Navbar.Text className="me-2">Blocks: {blocks.length}</Navbar.Text>
								<Navbar.Text className="me-2">Components: {components.length}</Navbar.Text>
								<NavDropdown menuVariant="dark"
											 title={SE_COLLECTIONS.filter(x => x.id === selectedCollection)[0].name}
											 onSelect={(event) => {
												 if(event) {
													 localStorage.setItem('SESelectedCollection', event);
													 setSelectedCollection(Number(event));
												 }
											 }}>
									{SE_COLLECTIONS.map((collection) =>
										<NavDropdown.Item eventKey={collection.id} key={collection.id}>{collection.name}</NavDropdown.Item>
									)}
								</NavDropdown>
							</Nav>
							<Nav>
								<Nav.Link><NavLink className="text-light text-decoration-none" to="blueprint">Blueprint</NavLink></Nav.Link>
								<Nav.Link><NavLink className="text-light text-decoration-none" to='blocks'>Blocks</NavLink></Nav.Link>
								<Nav.Link><NavLink className="text-light text-decoration-none" to='components'>Components</NavLink></Nav.Link>
								<Nav.Link className="text-light" href='https://github.com/organom/secalculator'><i className="bi bi-github me-3"/></Nav.Link>
							</Nav>
						</Navbar.Collapse>
					}
				</Container>
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

export interface collectionDefinition{
	id: number;
	name: string;
	items: number[];
	downloadBaseUrl: string;
}

export interface itemDefinition{
	id: number;
	name: string;
	cubeBlockFiles: string[];
	componentFiles: string[];
}

export const SE_COLLECTIONS: collectionDefinition[] = [
	{
		id: -1,
		name: 'Vanilla',
		downloadBaseUrl: 'https://organom.github.io/secalculator/vanilla',
		items: [-1]
	},
	{
		id: 2832253413,
		name: 'SkunkWorks 4.0 Collection',
		downloadBaseUrl: 'https://organom.github.io/secalculator/workshop',
		items: [2618476231, 1712885149, 1906186459, 1712884109, 1931509062, 2741701803, 2015575529, 2530716039,
			2704991190, 2783691448, 2771417713, 1864380341, 1359954841, 946724937, 2492169567, 1939935505, 2799659022,
			2449073590, 2433117767, 1962611090, 1962611090, 2493525535, 2806919267, 1654963857, 1365616918]
	}
]

export const SE_ITEMS: itemDefinition[] = [
	{
		id: -1,
		name: 'Vanilla',
		componentFiles: [ 'Components', 'Components_Economy'],
		cubeBlockFiles:	[ 'CubeBlocks', 'CubeBlocks_Armor', 'CubeBlocks_Armor_2', 'CubeBlocks_Automation', 'CubeBlocks_Communications', 'CubeBlocks_Control', 'CubeBlocks_DecorativePack',
			'CubeBlocks_DecorativePack2', 'CubeBlocks_Doors', 'CubeBlocks_Economy', 'CubeBlocks_Energy', 'CubeBlocks_Extras', 'CubeBlocks_Frostbite', 'CubeBlocks_Gravity', 'CubeBlocks_Interiors',
			'CubeBlocks_LCDPanels', 'CubeBlocks_Lights', 'CubeBlocks_Logistics', 'CubeBlocks_Mechanical', 'CubeBlocks_Medical', 'CubeBlocks_Production', 'CubeBlocks_ScrapRacePack',
			'CubeBlocks_SparksOfTheFuturePack', 'CubeBlocks_Symbols', 'CubeBlocks_Thrusters', 'CubeBlocks_Tools', 'CubeBlocks_Utility', 'CubeBlocks_Warfare1', 'CubeBlocks_Weapons', 'CubeBlocks_Wheels',
			'CubeBlocks_Windows', 'CubeBlocks_ArmorPanels', 'CubeBlocks_Armor_3', 'CubeBlocks_IndustrialPack', 'CubeBlocks_Warfare2']
	},
	{
		id: 2618476231,
		name: 'Skunkworks Tiered Tech',
		componentFiles: ['Components'],
		cubeBlockFiles:	['CubeBlocks_Assembler', 'CubeBlocks_AtmosphericThruster', 'CubeBlocks_AtmosphericThrusterSciFi', 'CubeBlocks_Battery', 'CubeBlocks_Beacon',
			'CubeBlocks_CargoContainerLarge', 'CubeBlocks_CargoContainerMedium', 'CubeBlocks_CargoContainerSmall', 'CubeBlocks_Detector',	'CubeBlocks_Drill',
			'CubeBlocks_Grinder', 'CubeBlocks_Gyroscope', 'CubeBlocks_HydrogenEngine', 'CubeBlocks_HydrogenTank', 'CubeBlocks_HydrogenThruster', 'CubeBlocks_IndustrialPack',
			'CubeBlocks_IonThruster', 'CubeBlocks_IonThrusterSciFi', 'CubeBlocks_JumpDrive', 'CubeBlocks_OxygenGenerator', 'CubeBlocks_Reactor',
			'CubeBlocks_Refinery', 'CubeBlocks_SolarPanel', 'CubeBlocks_Spotlight', 'CubeBlocks_StoneIncinerator', 'CubeBlocks_Warfare2', 'CubeBlocks_WindTurbine']
	},
	{
		id: 1712885149,
		name: 'Welders+',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Tools']
	},
	{
		id: 1906186459,
		name: 'Drills+',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Tools']
	},
	{
		id: 1712884109,
		name: 'Grinders+',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Tools']
	},
	{
		id: 1931509062,
		name: 'WeaponCore - Replace Vanilla Weapons',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Weapons']
	},
	{
		id: 2741701803,
		name: 'Long Range Searchlight',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Warfare2']
	},
	{
		id: 2015575529,
		name: 'HangarMarket (Quantum Hangar)',
		componentFiles: [],
		cubeBlockFiles:	['MarketProjector']
	},
	{
		id: 2530716039,
		name: 'Aryx Weapon Enterprises [WeaponCore]',
		componentFiles: ['Aryx_AWE_Components'],
		cubeBlockFiles:	['Aryx_AWE_CubeBlocks']
	},
	{
		id: 2704991190,
		name: 'MorePassages',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_MorePassages_Passage2', 'CubeBlocks_MorePassages_Passage3', 'CubeBlocks_MorePassages_Passage3Enc',
			'CubeBlocks_MorePassages_Passage3EncLight', 'CubeBlocks_MorePassages_Passage3EncOffset', 'CubeBlocks_MorePassages_PassageLux']
	},
	{
		id: 2783691448,
		name: 'Zardos Connector Passageway & More',
		componentFiles: ['ForceField_Components'],
		cubeBlockFiles:	['ZardosConnector_Connector Junction', 'ZardosConnector_CubeBlocks']
	},
	{
		id: 2771417713,
		name: 'M&M Experimental',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_Automation']
	},
	{
		id: 1864380341,
		name: 'AQD - Conveyor Expansion',
		componentFiles: [],
		cubeBlockFiles:	['AQD_ConveyorAccess', 'AQD_ConveyorCorner', 'AQD_ConveyorEndcap', 'AQD_ConveyorJunction',
			'AQD_ConveyorStraight', 'AQD_ConveyorT', 'AQD_ConveyorVent', 'AQD_ConveyorX', 'CubeBlocks_Logistics']
	},
	{
		id: 1359954841,
		name: 'Rotary Airlock',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_RotaryDoor']
	},
	{
		id: 946724937,
		name: 'PassageIntersections',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_PassageIntersections_Expansion', 'CubeBlocks_PassageIntersections_HalfPassageExpansion',
			'CubeBlocks_PassageIntersections_HalfPassages', 'CubeBlocks_PassageIntersections_Lighted',
			'CubeBlocks_PassageIntersections_LightedHalfPassages', 'CubeBlocks_PassageIntersections_Passage']
	},
	{
		id: 2492169567,
		name: '[MAD] More Conveyors No Angeled and Block Regroup',
		componentFiles: [],
		cubeBlockFiles:	['Large/CubeBlocks', 'Small/CubeBlocks']
	},
	{
		id: 1939935505,
		name: 'AQD - Armor Expansion',
		componentFiles: [],
		cubeBlockFiles:	['AQD_Corner_Split_2x1x1_Base', 'AQD_Corner_Split_2x1x1_Tip', 'AQD_Slab_Half_Corner_Split',
			'AQD_Slope3x1', 'AQD_Slope3x1_Corner', 'AQD_Slope3x1_InvCorner', 'AQD_Slope4x1',
			'AQD_Slope4x1_Corner', 'AQD_Slope4x1_InvCorner']
	},
	{
		id: 2799659022,
		name: 'Display Cases',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_DisplayCase']
	},
	{
		id: 2449073590,
		name: 'MA Buster Blocks',
		componentFiles: [],
		cubeBlockFiles:	['MA_Buster_Cubeblocks']
	},
	{
		id: 2433117767,
		name: 'Interface Block',
		componentFiles: [],
		cubeBlockFiles:	['AVTECH_Interface']
	},
	{
		id: 1962611090,
		name: 'First Aid Station (No Respawn)',
		componentFiles: [],
		cubeBlockFiles:	['FASNR_CubeBlocks']
	},
	{
		id: 1962611090,
		name: 'First Aid Station (No Respawn)',
		componentFiles: [],
		cubeBlockFiles:	['FASNR_CubeBlocks']
	},
	{
		id: 2493525535,
		name: 'HydrogenThing',
		componentFiles: ['Components'],
		cubeBlockFiles:	[]
	},
	{
		id: 2806919267,
		name: 'Rebels Gates',
		componentFiles: [],
		cubeBlockFiles:	['CubeBlocks_RebelsGates']
	},
	{
		id: 1654963857,
		name: 'MA HeavyBridge',
		componentFiles: [],
		cubeBlockFiles:	['MA_HeavyBridge_CubeBlocks']
	},
	{
		id: 1365616918,
		name: 'Defense Shields - v2.0(38)',
		componentFiles: ['CompBlueprint'],
		cubeBlockFiles:	['BlocksCategories']
	}
];

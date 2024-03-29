import {Stack} from 'react-bootstrap';
import React, {useRef, useState} from 'react';
import {parseSBCFile} from '../helpers';

interface BlueprintData {
	Id: { '@_Subtype': string };
	WorkshopId: string;
	DisplayName: string;
	OwnerSteamId: string;
	DLC: string[];
}

interface GridCount {
	type: string;
	subtype: string;
	count: number;
}
interface BlueprintGrids {
	DisplayName: string;
	EntityId: string;
	GridSizeEnum: string;
	BlocksCount: GridCount[];
	ComponentsCount: GridCount[];
}

const charDivider = '::';

function ensureArray(element: any | any[]): any[] {
	return Array.isArray(element) ? element : [element];
}

function print(a: GridCount) {
	return a.subtype || a.type;
}

export default function Blueprint(props: { blocks: any[], components: any[] }) {
	const [blueprintFileName, setBlueprintFileName] = useState<string | undefined>();
	const [blueprint, setBlueprint] = useState<BlueprintData>();
	const [blueprintGrids, setBlueprintGrids] = useState<BlueprintGrids[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
		list.reduce((previous, currentItem) => {
			const group = getKey(currentItem);
			if (!previous[group]) previous[group] = [];
			previous[group].push(currentItem);
			return previous;
		}, {} as Record<K, T[]>);

	function handleUpload() {
		inputRef.current?.click();
	}
	async function handleDisplayFileDetails() {
		if(!inputRef.current?.files) return
		const parsedContent = await parseSBCFile(inputRef.current.files[0]);
		setBlueprintFileName(inputRef.current.files[0].name);

		const blueprint = parsedContent.ShipBlueprints.ShipBlueprint
		setBlueprint(blueprint);

		setBlueprintGrids(ensureArray(blueprint.CubeGrids.CubeGrid).map(grid => {
			const blocksCount = getBlockCount(grid.CubeBlocks.MyObjectBuilder_CubeBlock);
			grid['BlocksCount'] = blocksCount;
			grid['ComponentsCount'] = getComponentsCount(blocksCount);
			return grid;
		}));
	}

	function getBlockCount(cubeBlocks: any) {
		const groupdByType = groupBy(cubeBlocks, (x: any) => x['@_xsi:type'].replace('MyObjectBuilder_', '') + charDivider + x.SubtypeName)

		return Object.keys(groupdByType).map((key) => {
			if(!key) console.error('Block key is empty for block:', groupdByType[key]);
			return {subtype: key.split(charDivider)[1], type: key.split(charDivider)[0], count: groupdByType[key].length}
		})
	}
	function getComponentsCount(blueprintBlocks: any[]) {
		const componentList: {[k: string]: number} = {};
		blueprintBlocks.forEach((block: any) => {
			const realBlock = props.blocks.find((b: any) => b.Id.SubtypeId === block.subtype && (b.Id.TypeId === block.type || b.Id.TypeId === 'MyObjectBuilder_' + block.type));
			if(!realBlock) {
				console.error('Failed to find block ' + block.subtype + ' of type ' + block.type);
			} else {
				ensureArray(realBlock.Components.Component).forEach((component: any) => {
					const type = component['@_Type'] + charDivider + component['@_Subtype'];
					componentList[type] = (componentList[type] || 0) + (component['@_Count'] * block.count);
				});
			}
		});
		return Object.keys(componentList).map((key) => {
			return {subtype: key.split(charDivider)[1], type: key.split(charDivider)[0], count: componentList[key]}
		})
	}

	return (
		<div>
			<Stack direction="vertical" gap={2}>
				<div className="m-3">
					<label className="mx-3">Choose file:</label>
					<input ref={inputRef} onChange={handleDisplayFileDetails} className="d-none" type="file" />
					<button onClick={handleUpload} className="btn btn-outline-primary">Upload Blueprint</button>
					<label className="ms-4"> {blueprintFileName} </label>
				</div>
				<Stack direction={'vertical'}>
					{blueprint &&
						<div>
							<div><b>ID:</b> {blueprint.Id['@_Subtype']} ({blueprint.WorkshopId})</div>
							<div><b>Owner:</b> {blueprint.DisplayName} ({blueprint.OwnerSteamId})</div>
							<div><b>DLCs:</b> {blueprint.DLC?.toString()}</div>
						</div>
					}
					{blueprintGrids.map(grid =>
						<div key={grid.EntityId}>
							<hr/>
							<div><b>ID:</b> {grid.DisplayName} ({grid.EntityId})</div>
							<div><b>Size:</b> {grid.GridSizeEnum}</div>
							<Stack direction={'horizontal'} gap={5} className="mt-4 align-items-md-start">
								<div>
									<h4>Blocks:</h4>
									{ grid.BlocksCount.sort((a,b) => print(a).localeCompare(print(b))).map(block => <div key={print(block)}>{block.count} x {print(block)}</div>) }
								</div>
								<div>
									<h4>Components required:</h4>
									{ grid.ComponentsCount.sort((a,b) =>  print(a).localeCompare(print(b))).map(comp => <div key={print(comp)}>{comp.count} x {print(comp)}</div>) }
								</div>
							</Stack>
						</div>
					)}
				</Stack>
			</Stack>
		</div>
	);
}

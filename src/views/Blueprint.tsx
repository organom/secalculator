import {Stack} from 'react-bootstrap';
import React, {useRef, useState} from 'react';
import {parseSBCFile} from '../Helpers';

const charDivider = '::';

export default function Blueprint(props: { blocks: any[], components: any[] }) {

	const [blueprintFileName, setBlueprintFileName] = useState<string | undefined>();
	const [blueprint, setBlueprint] = useState<any>();
	const [blueprintBlocks, setBlueprintBlocks] = useState<{block: string, type: string, count: number}[]>([]);
	const [blueprintComponents, setBlueprintComponents] = useState<{component: string, type: string, count:number}[]>([]);

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
		setBlueprintFileName(inputRef.current.files[0].name);
		const parsedContent = await parseSBCFile(inputRef.current.files[0]);
		setBlueprint(parsedContent.ShipBlueprints.ShipBlueprint || {});
		console.log(parsedContent.ShipBlueprints.ShipBlueprint);

		const blueprintBlocks = getBlockCount(parsedContent.ShipBlueprints.ShipBlueprint.CubeGrids.CubeGrid.CubeBlocks.MyObjectBuilder_CubeBlock);
		setBlueprintBlocks(blueprintBlocks);

		const componentCount = getComponentsCount(blueprintBlocks);
		setBlueprintComponents(componentCount);
	}

	function getBlockCount(cubeBlocks: any) {
		const groupdByType = groupBy(cubeBlocks, (x: any) => x['@_xsi:type'].replace('MyObjectBuilder_', '') + charDivider + x.SubtypeName)

		return Object.keys(groupdByType).map((key) => {
			if(!key) console.log(groupdByType[key]);
			return {block: key.split(charDivider)[1], type: key.split(charDivider)[0], count: groupdByType[key].length}
		})
	}
	function getComponentsCount(blueprintBlocks: any[]) {
		const componentList: {[k: string]: number} = {};
		blueprintBlocks.forEach((block: any) => {
			const realBlock = props.blocks.find((b: any) => b.Id.SubtypeId === block.block);
			if(!realBlock) {
				console.error('Failed to find block ' + block.block);
			} else {
				realBlock.Components.Component.forEach((component: any) => {
					const type = component['@_Type'] + charDivider + component['@_Subtype'];
					const existingValue = componentList[type] || 0;
					componentList[type] = existingValue + (component['@_Count'] * block.count);
				});
			}
		});
		return Object.keys(componentList).map((key) => {
			return {component: key.split(charDivider)[1], type: key.split(charDivider)[0], count: componentList[key]}
		})
	}

	return (
		<div>
			<Stack direction="vertical" gap={2}>
				<div className="m-5">
					<label className="mx-3">Choose file:</label>
					<input ref={inputRef} onChange={handleDisplayFileDetails} className="d-none" type="file" />
					<button onClick={handleUpload} className="btn btn-outline-primary">Upload Blueprint</button>
					<label className="ms-4"> {blueprintFileName} </label>
				</div>
				{blueprint &&
					<Stack direction={'vertical'}>
						<div><b>ID:</b> {blueprint.Id['@_Subtype']} ({blueprint.WorkshopId})</div>
						<div><b>Owner:</b> {blueprint.DisplayName} ({blueprint.OwnerSteamId})</div>
						<div><b>DLCs:</b> {blueprint.DLC?.toString()}</div>
						<Stack direction={'horizontal'} gap={5} className="mt-4 align-items-md-start">
							<div>
								<h4>Blocks:</h4>
								{ blueprintBlocks.map(block => <div>{block.count} x {block.block || block.type}</div>) }
							</div>
							<div>
								<h4>Components required:</h4>
								{ blueprintComponents.map(comp => <div>{comp.count} x {comp.component || comp.type}</div>) }
							</div>
						</Stack>
					</Stack>
				}
			</Stack>
		</div>
	);
}

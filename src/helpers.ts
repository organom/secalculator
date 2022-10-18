import {XMLParser} from 'fast-xml-parser';
import {collectionDefinition, SE_COLLECTIONS, SE_ITEMS, VANILLA_ID} from './config';
import axios from 'axios';

export async function parseSBCFile(content: Blob | File) : Promise<any> {
	const parser = new XMLParser({
		attributeNamePrefix: '@_',
		ignoreAttributes: false,
	});
	const parsed = await parser.parse(await content.text());
	return parsed.Definitions;
}

export async function loadSBCFiles(filesPath: string, files: string[]) {
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


export async function loadVanilla() {
	const collection = SE_COLLECTIONS.filter(t => t.id === VANILLA_ID)[0];
	const items = SE_ITEMS.filter(x => collection.itemIds.includes(x.id));

	// CubeBlocks
	const loadedBlocks = await Promise.all(items.map(x => x.cubeBlockFiles?.length > 0 ? loadSBCFiles(collection.downloadBaseUrl, x.cubeBlockFiles) : undefined).filter(x => x));
	const newBlocks = loadedBlocks.flat();

	// Components
	const loadedComponents = await Promise.all(items.map(x => x.componentFiles?.length > 0 ? loadSBCFiles(collection.downloadBaseUrl, x.componentFiles) : undefined).filter(x => x));
	const newComponents = loadedComponents.flat();

	return {cubeBlocks: newBlocks, components: newComponents};
}

export async function loadCollection(collection: collectionDefinition, existingComponents: any[], existingCubeBlocks: any[]) {
	const items = SE_ITEMS.filter(x => collection.itemIds.includes(x.id));

	// CubeBlocks
	const loadedBlocks = await Promise.all(items.map(x => x.cubeBlockFiles?.length > 0 ? loadSBCFiles(collection.downloadBaseUrl + '/' + x.id + '/Data', x.cubeBlockFiles) : undefined).filter(x => x));
	const cubeBlocks = loadedBlocks.flat();
	const blockIds = new Set(cubeBlocks.map(d => ({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})));
	const newBlocks = [...existingCubeBlocks.filter(d => !blockIds.has({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})), ...cubeBlocks];

	// Components
	const loadedComponents = await Promise.all(items.map(x => x.componentFiles?.length > 0 ? loadSBCFiles(collection.downloadBaseUrl + '/' + x.id + '/Data', x.componentFiles) : undefined).filter(x => x));
	const componentsBlocks = loadedComponents.flat();
	const compIds = new Set(componentsBlocks.map(d => ({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})));
	const newComponents = [...existingComponents.filter(d => !compIds.has({TypeId: d.Id.TypeId, SubtypeId: d.Id.SubtypeId})), ...componentsBlocks];

	// load dummy object for components used but not defined
	const extraComponents = newBlocks.map(x => x.Components.Component).flat();
	const uniqueExtraComponents = [...new Set(extraComponents.map(t => t['@_Subtype']))];
	uniqueExtraComponents.forEach(c => {
		if (!newComponents.some(d => d.Id.SubtypeId === c)) {
			console.error(`Component ${c} not found, creating dummy`);
			newComponents.push({Id: {SubtypeId: c, TypeId: 'Component'}});
		}
	});

	return {cubeBlocks: newBlocks, components: newComponents};
}

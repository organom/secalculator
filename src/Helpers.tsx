import {XMLParser} from 'fast-xml-parser';

export async function parseSBCFile(content: Blob | File) : Promise<any> {
	const parser = new XMLParser({
		attributeNamePrefix: '@_',
		ignoreAttributes: false,
	});
	const parsed = await parser.parse(await content.text());
	return parsed.Definitions;
}

import React, {useState, useEffect} from 'react';
import {XMLParser} from 'fast-xml-parser';
import axios from 'axios';
import './App.css';

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
  const files = [ "CubeBlocks", "CubeBlocks_Armor", "CubeBlocks_Armor_2", "CubeBlocks_Automation", "CubeBlocks_Communications", "CubeBlocks_Control", "CubeBlocks_DecorativePack",
    "CubeBlocks_DecorativePack2", "CubeBlocks_Doors", "CubeBlocks_Economy", "CubeBlocks_Energy", "CubeBlocks_Extras", "CubeBlocks_Frostbite", "CubeBlocks_Gravity", "CubeBlocks_Interiors",
    "CubeBlocks_LCDPanels", "CubeBlocks_Lights", "CubeBlocks_Logistics", "CubeBlocks_Mechanical", "CubeBlocks_Medical", "CubeBlocks_Production", "CubeBlocks_ScrapRacePack", "CubeBlocks_SparksOfTheFuturePack",
    "CubeBlocks_Symbols", "CubeBlocks_Thrusters", "CubeBlocks_Tools", "CubeBlocks_Utility", "CubeBlocks_Warfare1", "CubeBlocks_Weapons", "CubeBlocks_Wheels", "CubeBlocks_Windows" ]

  const promises = files.map(file => downloadAndParseBlockFile(`${filesPath}/${file}.sbc`));
  const results = await Promise.all(promises);
  return results.flat();
}

export default function App() {
  const filesPath: string = 'https://organom.github.io/secalculator_nuxt/CubeBlocks';
  const [baseBlocks, setBaseBlocks] = useState<any[]>([]);
  const [components, setComponents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBaseBlocks(filesPath).then(blocks => {
      setBaseBlocks(blocks);
      setComponents(blocks.map(x => x.Components.Component).flat());
      setLoading(false);
    });
  }, [filesPath])

  if (loading) {
    return (
        <div className="App">
          <div>
            <h1 className="title">
              secalculator
            </h1>
            <h2 className="subtitle">
            Loading...
            </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div>
        <h1 className="title">
          secalculator
        </h1>
        <h2 className="subtitle">
          Space Engineers Calculator
        </h2>
        <div className="links">
          <button className="button--grey">Blueprint</button>
          <button className="button--grey">Blocks</button>
          <button className="button--grey">Components</button>
          <button className="button--grey">GitHub</button>
        </div>
        <h2>&nbsp;</h2>
        <div>Total Blocks loaded: { baseBlocks.length }</div>
        <div>Total Components loaded: { components.length }</div>
      </div>
    </div>
  );
}

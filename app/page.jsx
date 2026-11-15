import fs from 'node:fs';import path from 'node:path';import Script from 'next/script';
export default function Home(){const markup=fs.readFileSync(path.join(process.cwd(),'assets','framer-body.html'),'utf8');return <><div dangerouslySetInnerHTML={{__html:markup}}/><Script src='/interactions.js' strategy='afterInteractive'/></>};

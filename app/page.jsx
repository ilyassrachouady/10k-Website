import parse from 'html-react-parser';
import Script from 'next/script';
import { bodyHtml } from './content';
export default function Home(){return <><Script src='/script.js' strategy='afterInteractive'/>{parse(bodyHtml)}</>}

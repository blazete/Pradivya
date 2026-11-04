import './association-marquee.css';
import { withBase } from '../lib/base';
const associations=[
  {name:'University of Chicago',image:withBase('/associations/uchicago.png'),relationship:'DEEP TECH ACCELERATOR'},
  {name:'Microsoft',image:withBase('/associations/microsoft.svg'),relationship:'INDUSTRY NETWORK'},
  {name:'Google',image:withBase('/associations/google.svg'),relationship:'INDUSTRY NETWORK'},
  {name:'ZF',image:withBase('/associations/zf.svg'),relationship:'INNOVATION NETWORK'},
  {name:'IIT Kanpur · SIIC',image:withBase('/associations/IIT.png'),relationship:'INCUBATION'},
  {name:'Indian Railways',image:withBase('/associations/rail.png'),relationship:'RAILWAY PROJECTS'},
  {name:'IIM Lucknow Incubator',image:withBase('/associations/IIM.png'),relationship:'INCUBATION & FUNDING'},
  {name:'Nasdaq Entrepreneurial Center',image:withBase('/associations/nasdaq.png'),relationship:'ENTREPRENEURSHIP PROGRAM'},
  {name:'ARENA2036',image:withBase('/associations/arena.png'),relationship:'RESEARCH NETWORK'},
  {name:'move+ Accelerator',image:withBase('/img/move.png'),relationship:'ACCELERATOR'},
  {name:'SIDBI',image:withBase('/associations/sidbi.png'),relationship:'FUNDING'},
  {name:'Pentland',image:withBase('/associations/pentland.png'),relationship:'FUNDING'},
];
export default function AssociationMarquee(){
  return <section id="thesis" className="association-marquee" aria-label="Pradivya's industry and innovation network"><div className="association-window" tabIndex={0} aria-label="Associated organizations. Hover or focus to pause scrolling."><div className="association-track">{[0,1].map(copy=><ul key={copy} className="association-group" aria-hidden={copy===1}>{associations.map(item=><li key={item.name}><img src={item.image} alt={copy===0?`${item.name} — ${item.relationship.toLowerCase()}`:''} loading="lazy"/></li>)}</ul>)}</div></div></section>;
}

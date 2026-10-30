import './association-marquee.css';
const associations=[
  {name:'IIT Kanpur · SIIC',image:'/associations/IIT.png',relationship:'INCUBATION'},
  {name:'Indian Railways',image:'/associations/rail.png',relationship:'RAILWAY PROJECTS'},
  {name:'IIM Lucknow Incubator',image:'/associations/IIM.png',relationship:'INCUBATION & FUNDING'},
  {name:'Nasdaq Entrepreneurial Center',image:'/associations/nasdaq.png',relationship:'ENTREPRENEURSHIP PROGRAM'},
  {name:'ARENA2036',image:'/associations/arena.png',relationship:'RESEARCH NETWORK'},
  {name:'move+ Accelerator',image:'/img/move.png',relationship:'ACCELERATOR'},
  {name:'SIDBI',image:'/associations/sidbi.png',relationship:'FUNDING'},
  {name:'Pentland',image:'/associations/pentland.png',relationship:'FUNDING'},
];
export default function AssociationMarquee(){
  return <section className="association-marquee" aria-label="Pradivya's industry and innovation network"><div className="association-window" tabIndex={0} aria-label="Associated organizations. Hover or focus to pause scrolling."><div className="association-track">{[0,1].map(copy=><ul key={copy} className="association-group" aria-hidden={copy===1}>{associations.map(item=><li key={item.name}><img src={item.image} alt={copy===0?`${item.name} — ${item.relationship.toLowerCase()}`:''} loading="lazy"/></li>)}</ul>)}</div></div></section>;
}

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
const items = [
 ['Automotive & EV','Bring visual, acoustic and vibration signals into production inspection.','/img/ards3.webp'],
 ['Semiconductors','Explore multisensory signals for precision manufacturing workflows.','/img/plateformarc.webp'],
 ['Energy & utilities','Understand equipment condition through more than one sensing modality.','/img/ArenaHalle_Netzwerk.webp'],
 ['Aerospace','Explore inspection workflows where component integrity matters.','/img/ards3.webp'],
 ['Steel & heavy industry','Bring condition signals closer to maintenance decisions.','/img/toolkit1.webp'],
 ['Food & pharma','Explore inspection needs across quality-sensitive production lines.','/img/toolkit2.webp'],
 ['Rail & infrastructure','Connect wayside inspection with actionable component insight.','/img/ards3.webp'],
];
export default function IndustryExplorer(){const [active,setActive]=useState(0);return <section className="industry-explorer" id="industries"><header><div><span className="eyebrow">WHERE IT MATTERS</span><h2>Every line.<br/>Every industry.</h2><p>Wherever a missed defect is costly, more than one sense can matter.</p></div><a href="#contact">Explore <ArrowUpRight size={14}/></a></header><div className="industry-explorer-grid"><div className="industry-options">{items.map(([name,copy],i)=><button key={name} onClick={()=>setActive(i)} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} aria-expanded={active===i} className={active===i?'selected':''}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{name}</strong><div className="industry-option-description"><p>{copy}</p></div></div><ArrowUpRight size={16}/></button>)}</div><figure className="industry-scene" key={active}><img loading="lazy" decoding="async" width="900" height="600" src={items[active][2]} alt={items[active][0]+' inspection context'}/><figcaption><span>EXPLORE THE APPLICATION</span><strong>{items[active][0]}</strong><small>Illustrative application context</small></figcaption></figure></div></section>}

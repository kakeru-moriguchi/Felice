import {existsSync} from 'node:fs';import path from 'node:path';import {images} from '@/lib/site';
export function Photo({kind,label,className=''}:{kind:keyof typeof images;label:string;className?:string}){const src=images[kind];const exists=existsSync(path.join(process.cwd(),'public',src.replace(/^\//,'')));return <div className={`photo photo-${kind} ${className}`} style={exists?{backgroundImage:`url(${src})`}:undefined} role="img" aria-label={exists?label:`${label}の写真掲載予定`}>{!exists&&<span className="photo-note">{label} / PHOTO COMING SOON</span>}</div>}


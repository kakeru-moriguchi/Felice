export type Post = { id: string; title: string; slug: string; publishedAt: string; category: string; excerpt: string; body: string; eyecatch?: { url: string; width?: number; height?: number } };
const samples: Post[] = [
 {id:'sample-1',slug:'welcome',title:'Feliceへようこそ',publishedAt:'2026-09-01',category:'お知らせ',excerpt:'大塚駅近くの完全個室サロンFeliceから、サロンについてご案内します。',body:'<p>Feliceは、大塚駅徒歩1分の完全個室プライベートサロンです。看護師としての経験と皮膚科勤務で培った知識を活かし、お一人おひとりのお悩みに寄り添います。</p><p>脱毛、フェイシャル、よもぎ蒸し、整体まで。ご自身のペースで、どうぞ気軽にお越しください。</p>'},
 {id:'sample-2',slug:'private-room',title:'完全個室で過ごす、私だけの時間',publishedAt:'2026-08-25',category:'サロンのこと',excerpt:'周りを気にせず、ゆったりと過ごせるプライベート空間をご用意しています。',body:'<p>Feliceでは、カウンセリングから施術まで完全個室でご案内しています。お肌のお悩みも、リフレッシュしたい気持ちも、安心してお話しください。</p>'},
 {id:'sample-3',slug:'pay-as-you-go',title:'都度払いで、無理なく通えるサロン',publishedAt:'2026-08-18',category:'ご案内',excerpt:'高額なコース契約はなく、必要なときにご利用いただけます。',body:'<p>Feliceの施術は都度払い。ご自身の予定やお肌の状態に合わせて、無理のないペースでお通いいただけます。</p>'}
];
type CMSPost = Omit<Post,'excerpt'> & { content?: string; description?: string };
function plain(html: string) { return html.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim().slice(0,110); }
function configured() { return Boolean(process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY); }
async function cms<T>(path: string): Promise<T> { const res = await fetch(`https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/${path}`,{headers:{'X-MICROCMS-API-KEY':process.env.MICROCMS_API_KEY!},next:{revalidate:300}}); if(!res.ok) throw new Error(`microCMS ${res.status}`); return res.json(); }
function normalize(p: CMSPost): Post { const body=p.content || p.body || ''; return {id:p.id,slug:p.slug || p.id,title:p.title,publishedAt:p.publishedAt,category:p.category || 'ブログ',excerpt:p.description || plain(body),body,eyecatch:p.eyecatch}; }
export async function getPosts(): Promise<Post[]> { if(!configured()) return samples; try { const data=await cms<{contents:CMSPost[]}>('blogs?limit=100&orders=-publishedAt'); return data.contents.map(normalize); } catch(e) { console.error(e); return samples; } }
export async function getPost(slug:string): Promise<Post|undefined> { return (await getPosts()).find(p=>p.slug===slug || p.id===slug); }

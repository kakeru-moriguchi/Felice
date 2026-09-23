'use client';
import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/lib/site';
const links=[['HOME','/'],['セラピスト紹介','/therapist'],['ホットペッパービューティー',site.hotpepper],['店舗情報','/shop'],['ブログ','/blog'],['お問い合わせ','/contact'],['特定商取引法に基づく表記','/legal']];
export function Header(){const [open,setOpen]=useState(false);return <><header className="header"><div className="header-inner"><Link className="brand" href="/" onClick={()=>setOpen(false)}>Felice<span>PRIVATE BEAUTY SALON</span></Link><nav className={open?'nav open':'nav'} aria-label="グローバルメニュー">{links.map(([label,href])=><Link key={label} href={href} onClick={()=>setOpen(false)} target={href.startsWith('http')?'_blank':undefined} rel={href.startsWith('http')?'noopener noreferrer':undefined}>{label}</Link>)}<a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></nav><button className="menu-toggle" aria-label={open?'メニューを閉じる':'メニューを開く'} aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/><span/></button></div></header>{open&&<button className="nav-backdrop" aria-label="メニューを閉じる" onClick={()=>setOpen(false)}/>}</>}

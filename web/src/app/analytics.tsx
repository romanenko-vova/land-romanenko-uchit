'use client'
import Script from 'next/script'

export default function Analytics() {
  const YM = process.env.NEXT_PUBLIC_YM_ID
  if (!YM) return null
  return (
    <Script id="ym-init" strategy="afterInteractive">{`
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j=0; j<document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
      ym(${YM}, 'init', {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true});
    `}</Script>
  )
}



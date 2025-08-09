'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCoverflow, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default function Home() {
  const [sending, setSending] = useState(false)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] })
  const ySphere1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const ySphere2 = useTransform(scrollYProgress, [0, 1], [0, 80])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setSending(true)
    try {
      // В проде запрос идёт через реверс-прокси на /api
      await fetch('/api/lead', { method: 'POST', body: form })
      alert('Заявка отправлена!')
      ;(e.target as HTMLFormElement).reset()
    } finally {
      setSending(false)
    }
  }

  const portfolio = [
    { src: '/portfolio/timur_bot.png', title: 'maksudov_timur_basketboll_bot — подбор кроссовок', link: 'https://t.me/maksudov_timur_basketboll_bot' },
    { src: '/portfolio/misha_site.png', title: 'Чат в реальном времени', link: 'https://misha-site.ru' },
    { src: '/portfolio/numer_bot.png', title: 'Бот-номерология', link: 'https://t.me/yur_numer_bot' },
    { src: '/portfolio/espire_shop.png', title: 'Магазин кроссовок', link: 'https://espire-shop.ru' },
  ]

  const reviews = [
    { name: 'Тимур', text: 'Очень хороший репетитор — хорошо и понятно объясняет. Уроки и ДЗ интересные, не скучно уже 6 месяцев.', avatar: '/reviews/timur.jpg', projectLink: 'https://t.me/maksudov_timur_basketboll_bot', contact: '@i1i1i1iij' },
    { name: 'Сева', text: `Владимир очень приятный и сильный преподаватель, с ним приятно и интересно проходить и обучаться новому материалу и изучать современные технологии и виды разработки в сфере IT. Человек точно понимает всё о чём рассказывает, и его знания выходят далеко за рамки даже самых сложных тем, что позволяет ему качественно изложить материал и ответить на все вопросы ученика, и даже намного больше. Также особенно хотелось бы отметить участие Владимира как преподавателя в моём личном карьерном продвижении — всегда готов ответить на любые вопросы, посоветовать и поддержать. Особенно хотелось бы затронуть вопрос цены: за подобный уровень занятий она демократична и полностью оправдана. Всем, кто ищет своего проводника в мир разработки, смело могу рекомендовать Владимира — не пожалеете!`, avatar: '/reviews/seva.jpg', projectLink: 'https://t.me/yur_numer_bot', contact: '@htamplav' },
  ]

  function ReviewCard({ r }: { r: { name: string; text: string; avatar: string; projectLink?: string; contact?: string } }) {
    const [expanded, setExpanded] = useState(false)
    const isLong = r.text.length > 260
    const shown = expanded || !isLong ? r.text : r.text.slice(0, 260) + '…'
    return (
      <div className="rounded-xl border border-white/10 p-6 bg-black/30">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
            <Image src={r.avatar} alt={r.name} fill className="object-cover" />
          </div>
          <div>
            <div className="font-semibold">{r.name}</div>
            <div className="text-xs text-white/60 flex gap-3 mt-0.5">
              {r.projectLink && (
                <a className="underline decoration-dotted" href={r.projectLink} target="_blank" rel="noreferrer">Проект</a>
              )}
              {r.contact && (
                <a className="underline decoration-dotted" href={`https://t.me/${r.contact.replace('@','')}`} target="_blank" rel="noreferrer">Связаться {r.contact}</a>
              )}
            </div>
          </div>
        </div>
        <p className="mt-3 text-white/80">{shown}</p>
        {isLong && (
          <button onClick={() => setExpanded(v=>!v)} className="mt-2 text-sm text-white/70 underline decoration-dotted">
            {expanded ? 'Свернуть' : 'Ещё'}
          </button>
        )}
      </div>
    )
  }

  function TiltCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement | null>(null)
    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rotX = (0.5 - py) * 10
      const rotY = (px - 0.5) * 12
      el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`
    }
    const reset = () => {
      const el = ref.current
      if (!el) return
      el.style.transform = 'rotateX(0deg) rotateY(0deg)'
    }
    return (
      <div style={{ perspective: '1000px' }}>
        <div ref={ref} onMouseMove={handleMove} onMouseLeave={reset} className="transition-transform duration-200 will-change-transform">
          {children}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#07051A] text-white">
      {/* Header */}
      <div className="sticky top-0 z-30 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-black text-xl">Романенко учит</div>
          <nav className="hidden md:flex gap-6 text-sm opacity-80">
            <a href="#cases">Кейсы</a>
            <a href="#about">Обо мне</a>
            <a href="#form">Записаться</a>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" ref={heroRef}>
        {/* Градиентные сферы */}
        <motion.div style={{ y: ySphere1 }} className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl"/>
        <motion.div style={{ y: ySphere2 }} className="pointer-events-none absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-indigo-600/20 rounded-full blur-3xl"/>
        {/* Шиммер-линии */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60"/>
        <div className="pointer-events-none absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent animate-[shimmer_6s_linear_infinite]"/>
        <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Романенко учит: я учу, а ты понимаешь
            </h1>
            <p className="mt-5 text-white/80 text-lg">
              Быстрый вход в IT через реальные проекты: Telegram‑боты, Django и FastAPI. Для школьников 12–18 лет. Онлайн, группы и индивидуально.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#form" className="px-5 py-3 rounded-lg bg-white text-black font-semibold">Записаться</a>
              <a href="#cases" className="px-5 py-3 rounded-lg border border-white/20">Посмотреть кейсы</a>
            </div>
          </motion.div>
          <motion.div className="relative aspect-square" initial={{opacity:0, scale:0.95}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}}>
            <Image src="/me.png" alt="Романенко Владимир" fill className="object-contain rounded-2xl border border-white/10" />
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/10 to-transparent blur-2xl"/>
          </motion.div>
        </div>
      </section>

      {/* Бегущая строка */}
      <section aria-hidden className="relative overflow-hidden border-y border-white/10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#07051A] to-transparent z-10"/>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#07051A] to-transparent z-10"/>
        <div className="whitespace-nowrap flex gap-10 py-3 animate-marquee will-change-transform">
          {Array.from({length:8}).map((_,i)=> (
            <span key={i} className="text-white/70 text-sm">Python • Django • FastAPI • Next.js • Telegram • Python telegram bot</span>
          ))}
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-5xl font-bold">Кейсы учеников</h2>
        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1}
          className="mt-8 !pb-12"
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 768: { slidesPerView: 1.4 } }}
        >
          {portfolio.map((p) => (
            <SwiperSlide key={p.src}>
              <a href={p.link} target="_blank" rel="noreferrer" className="block group">
                <TiltCard>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                  <Image src={p.src} alt={p.title} width={1200} height={700} className="w-full h-[420px] object-cover" />
                  <div className="p-6">
                    <div className="text-xl font-semibold">{p.title}</div>
                  </div>
                </div>
                </TiltCard>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Обо мне</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div className="space-y-4 text-lg text-white/85" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
            <p>Я — Владимир Романенко. 8 лет обучаю программированию (боты, Django, FastAPI). Веду школьников 12–18 от первых строк кода до реальных проектов.</p>
            <p>Методика: выучи 8 базовых тем, затем сразу практика в проектах. Формат — онлайн, группы и индивидуально.</p>
            <ul className="list-disc pl-6 opacity-90">
              <li>Индивидуальные и групповые занятия</li>
              <li>Учимся на боевых задачах бизнеса</li>
              <li>Помогаю получить первые заказы</li>
            </ul>
          </motion.div>
          <motion.div className="rounded-xl border border-white/10 p-6 bg-black/30" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6, delay:0.1}}>
            <div className="font-semibold mb-3">8 базовых тем</div>
            <ol className="list-decimal pl-6 space-y-1 text-white/85">
              <li>Переменные</li>
              <li>Условия</li>
              <li>Цикл while</li>
              <li>Цикл for</li>
              <li>Строки</li>
              <li>Списки</li>
              <li>Словари</li>
              <li>Функции</li>
            </ol>
            <div className="mt-4 text-sm text-white/60">Результат за 2–3 месяца — уверенная база Python.</div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Достижения</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{n:'8 лет', d:'в обучении'}, {n:'100+ уроков', d:'в записях'}, {n:'Реальные кейсы', d:'боты и сайты учеников'}].map((s)=> (
            <motion.div key={s.n} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6">
              <div className="absolute -inset-1 bg-gradient-to-br from-fuchsia-500/10 via-indigo-500/10 to-transparent blur-2xl"/>
              <div className="relative">
                <div className="text-3xl font-extrabold">{s.n}</div>
                <div className="text-white/70 mt-1">{s.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-bold mb-2">Отзывы</h2>
        <p className="text-white/70 mb-6">Ниже прикрепляю контакты моих учеников — можете написать и спросить о качестве уроков.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <ReviewCard key={r.name} r={r} />
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Тарифы</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 p-6 bg-black/30">
            <div className="text-xl font-semibold">Старт (группа)</div>
            <div className="mt-2 text-white/70">1 занятие в неделю</div>
            <div className="mt-3 text-2xl font-bold">6 900 ₽/мес</div>
          </div>
          <div className="rounded-xl border border-white/10 p-6 bg-black/30">
            <div className="text-xl font-semibold">Про (группа)</div>
            <div className="mt-2 text-white/70">2 занятия в неделю</div>
            <div className="mt-3 text-2xl font-bold">9 900 ₽/мес</div>
          </div>
          <div className="rounded-xl border border-white/10 p-6 bg-black/30">
            <div className="text-xl font-semibold">Индивидуальные</div>
            <div className="mt-2 text-white/70">1‑на‑1, персональная программа</div>
            <div className="mt-3 text-2xl font-bold">от 20 000 ₽/мес</div>
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="form" className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Записаться на консультацию</h2>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <input name="name" required placeholder="Твоё имя" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3"/>
          <input name="phone" placeholder="Телефон" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3"/>
          <input name="tg" placeholder="Telegram @username" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:col-span-2"/>
          <textarea name="message" placeholder="Коротко про цель обучения" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:col-span-2"/>
          <button disabled={sending} className="mt-2 md:col-span-2 px-5 py-3 rounded-lg bg-fuchsia-500 hover:bg-fuchsia-600 font-semibold disabled:opacity-60">
            {sending ? 'Отправляю...' : 'Отправить'}
          </button>
        </form>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-white/60 border-t border-white/10">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Романенко учит</div>
          <div className="text-sm">
            ИП Романенко Владимир Юрьевич · TG-канал: <a className="underline" href="https://t.me/romanenko_uchit" target="_blank">@romanenko_uchit</a> · ЛС: <a className="underline" href="https://t.me/romanenko_vova" target="_blank">@romanenko_vova</a>
          </div>
        </div>
      </footer>

      {/* Глобальные keyframes */}
      <style jsx global>{`
        @keyframes shimmer { from { transform: translateY(-10%);} to { transform: translateY(10%);} }
        @keyframes float { 0% { transform: translateY(0);} 50% { transform: translateY(-12px);} 100% { transform: translateY(0);} }
        .animate-marquee { animation: marquee 25s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </main>
  )
}

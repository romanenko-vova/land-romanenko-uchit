import Image from 'next/image'
import program from '@/config/program.json'
import QuizForm from './QuizForm'

export const metadata = {
  title: 'FASTTRACK по Telegram‑ботам — Zero Sprint + Core',
  description: 'Один поток — два входа: Zero Sprint (2 недели) и Core Fasttrack (8 недель). Практика, проекты под спрос и реальный заказ в эфире.'
}

function Currency({ value }: { value: number }) {
  return <>{value.toLocaleString('ru-RU')} ₽</>
}

export default function FasttrackPage() {
  const pricing = program.pricing
  const tg = program.telegramUser
  return (
    <main className="min-h-screen bg-[#07051A] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl"/>
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-indigo-600/20 rounded-full blur-3xl"/>
        <div className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              FASTTRACK по Telegram‑ботам: от нуля до первых заказов
            </h1>
            <p className="mt-4 text-white/80 text-lg">
              Один поток — два входа: Zero Sprint для новичков (2 недели) и Core Fasttrack (8 недель). Практика, свои проекты (не «50 одинаковых»), в финале — реальный заказ в эфире.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#quiz" className="px-5 py-3 rounded-lg bg-white text-black font-semibold">Пройти квиз и попасть в поток</a>
              <a href={`https://t.me/${tg}`} target="_blank" className="px-5 py-3 rounded-lg border border-white/20">Написать @{tg}</a>
            </div>
            <div className="mt-4 text-sm text-white/60">600+ в коммьюнити · отзывы и демо — скоро</div>
          </div>
          <div className="relative aspect-square">
            <Image src="/window.svg" alt="Fasttrack" fill className="object-contain opacity-90" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-12 border-t border-white/10">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Почему это работает</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {t:'2 эфира/нед и дедлайны', d:'Дисциплина и стабильный прогресс'},
            {t:'Проекты под реальный спрос', d:'Портфолио не «как у всех»'},
            {t:'Реальный заказ в эфире', d:'Видно всё: ТЗ → сдача → оплата'},
          ].map(b=> (
            <div key={b.t} className="rounded-xl border border-white/10 p-6 bg-black/30">
              <div className="text-xl font-semibold">{b.t}</div>
              <div className="text-white/70 mt-1">{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Program summary */}
      <section className="mx-auto max-w-6xl px-4 py-12 border-t border-white/10">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Формат потока</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 p-6 bg-black/30">
            <div className="font-semibold text-fuchsia-300">Zero Sprint · 2 недели</div>
            <ul className="list-disc pl-5 mt-3 text-white/80 space-y-1">
              <li>Типы, условия, циклы, функции; настройка окружения; первый хендлер</li>
              <li>Состояние диалога, inline‑кнопки; мини‑бот «анкета → Google Sheets»</li>
              <li>Чекпоинт: мини‑проект + короткий тест. Прошедшие вливаются в Core.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 p-6 bg-black/30">
            <div className="font-semibold text-indigo-300">Core Fasttrack · 8 недель</div>
            <ul className="list-disc pl-5 mt-3 text-white/80 space-y-1">
              <li>Каркас, FSM, клавиатуры, SQLite; бот‑напоминалка</li>
              <li>2 «продающихся» кейса (бронь/заявки, рассылки, анкеты с интеграцией)</li>
              <li>Платежи (инвойсы), деплой, логи, APScheduler</li>
              <li>Фриланс: отклики, цены, предоплата; финальный реальный заказ</li>
            </ul>
          </div>
        </div>
        <div className="mt-3 text-sm text-white/60">Часовой пояс: {program.timezone}. {program.scheduleHint}</div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-12 border-t border-white/10">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Тарифы</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            name:'Basic', price: pricing.basic, features:[
              'Группа: 2 эфира/нед', 'Записи и чат с ответами', 'Код‑клиники'
            ]
          },{
            name:'PRO', price: pricing.pro, features:[
              'Всё из Basic', '2× индивидуальные сессии/мес (60 мин)', 'Личное ревью двух проектов'
            ]
          },{
            name:'VIP', price: pricing.vip, features:[
              'Всё из PRO', '4× индивидуальные сессии/мес (60 мин)', 'Приоритетные ответы, персональный роадмап'
            ]
          }].map(card => (
            <div key={card.name} className="rounded-xl border border-white/10 p-6 bg-black/30">
              <div className="text-xl font-semibold">{card.name}</div>
              <div className="mt-3 text-3xl font-extrabold"><Currency value={card.price} /></div>
              <ul className="mt-3 space-y-1 text-white/80 list-disc pl-5">
                {card.features.map(f=> <li key={f}>{f}</li>)}
              </ul>
              <a href="#quiz" className="mt-5 inline-block px-4 py-2 rounded-lg bg-white text-black font-semibold">Записаться на тариф</a>
              <div className="mt-2 text-xs text-white/60">Места в PRO/VIP ограничены. Уточнять при наборе.</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz" className="mx-auto max-w-6xl px-4 py-12 border-t border-white/10">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Квиз‑отсев</h2>
        <QuizForm telegramUser={tg} />
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-12 border-t border-white/10">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">FAQ</h2>
        <div className="space-y-4">
          {[
            {q:'Можно с нуля?', a:'Да, через Zero Sprint (2 недели), затем вливаетесь в Core.'},
            {q:'Если мало времени?', a:'При <5 ч/нед рекомендуем пройти Zero Sprint и дособрать первый бот — потом в Core.'},
            {q:'Что если пропустил эфир?', a:'Запись + конспект + код‑клиника.'},
            {q:'Будут платежи/подписки?', a:'В fasttrack — базовые инвойсы и формы; рекуррентки — в полном курсе.'},
            {q:'Вернёте деньги?', a:'Возврат за неотработанные занятия и по оферте.'},
            {q:'Чем отличаются PRO/VIP?', a:'Индивидуальные созвоны (2×/мес и 4×/мес), приоритет и персональный план.'},
          ].map(item=> (
            <div key={item.q} className="rounded-xl border border-white/10 p-6 bg-black/30">
              <div className="font-semibold">{item.q}</div>
              <div className="text-white/80 mt-1">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-3 left-0 right-0 px-4 md:hidden z-30">
        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-2">
          <a href="#quiz" className="px-4 py-3 text-center rounded-lg bg-white text-black font-semibold">Пройти квиз</a>
          <a href={`https://t.me/${tg}`} target="_blank" className="px-4 py-3 text-center rounded-lg border border-white/20">Написать в Telegram</a>
        </div>
      </div>
    </main>
  )
}



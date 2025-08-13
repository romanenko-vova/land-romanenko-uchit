'use client'
import Link from 'next/link'

export default function QuizForm({ telegramUser }: { telegramUser: string }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Спасибо! Мы на связи.')
  }
  return (
    <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <input name="name" required placeholder="Имя" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3"/>
      <input name="tg" required placeholder="Telegram @username" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3"/>
      <input name="email" type="email" placeholder="Email (необязательно)" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:col-span-2"/>
      <select name="level" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:col-span-2">
        <option>Уровень по Python/ботам: совсем старт</option>
        <option>Писал(а) ботов/код</option>
        <option>Делал(а) коммерцию</option>
      </select>
      <select name="hours" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:col-span-2">
        <option>Часы/нед: 2–3</option>
        <option>4–6</option>
        <option>7–10</option>
        <option>10+</option>
      </select>
      <select name="goal" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:col-span-2">
        <option>Цель: для себя</option>
        <option>Портфолио</option>
        <option>Фриланс‑доход</option>
      </select>
      <select name="tasks" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:col-span-2">
        <option>Анкеты/лиды</option>
        <option>Бронь/расписание</option>
        <option>Уведомления/рассылки</option>
        <option>Простой платный доступ</option>
      </select>
      <label className="md:col-span-2 text-sm text-white/80 flex items-center gap-2">
        <input type="checkbox" required className="accent-fuchsia-500"/> Согласен с <Link href="/oferta" className="underline">офертой</Link> и политикой конфиденциальности
      </label>
      <button className="mt-2 md:col-span-2 px-5 py-3 rounded-lg bg-fuchsia-500 hover:bg-fuchsia-600 font-semibold">Отправить и получить программу</button>
      <div className="md:col-span-2 text-sm text-white/70">После отправки откроется контакт: <a className="underline" href={`https://t.me/${telegramUser}`} target="_blank">@{telegramUser}</a></div>
    </form>
  )
}



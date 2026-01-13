'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Letter = {
    id: string
    content: string
    sender_name: string
    created_at: string
}

// TODO: [Future Enhancement]
// When enough public letters are collected (e.g., > 30), replace this DUMMY_LETTERS with a real DB query.
// Query: supabase.from('letters').select('*').eq('is_public', true).order('random()').limit(3)
const DUMMY_LETTERS = [
    { id: '1', content: "새해 복 많이 받아! 올 한 해도 건강하고 행복했으면 좋겠어.", sender_name: "지수", created_at: "2026-01-01" },
    { id: '2', content: "많이 힘들었지? 넌 충분히 잘하고 있어.", sender_name: "익명의 친구", created_at: "2026-01-02" },
    { id: '3', content: "우리 우정 변치 말자. 사랑해!", sender_name: "미영", created_at: "2026-01-03" },
    { id: '4', content: "느린 우체통이라니 낭만적이다.", sender_name: "철수", created_at: "2026-01-04" },
    { id: '5', content: "앞으로의 날들도 기대돼.", sender_name: "민호", created_at: "2026-01-05" },
    { id: '6', content: "항상 응원할게.", sender_name: "영희", created_at: "2026-01-06" },
    { id: '7', content: "오늘 하루도 수고했어.", sender_name: "수진", created_at: "2026-01-07" },
    { id: '8', content: "내일은 더 좋은 일이 생길 거야.", sender_name: "현우", created_at: "2026-01-08" },
    { id: '9', content: "오랜만이야, 잘 지내지?", sender_name: "동창", created_at: "2026-01-09" },
]

export default function RandomLetters() {
    const [letters, setLetters] = useState<Letter[]>([])

    useEffect(() => {
        // Initial shuffle
        setLetters(DUMMY_LETTERS.sort(() => 0.5 - Math.random()).slice(0, 3))

        const interval = setInterval(() => {
            // Randomly pick 3 distinct letters
            const shuffled = [...DUMMY_LETTERS].sort(() => 0.5 - Math.random())
            setLetters(shuffled.slice(0, 3))
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full mb-12 min-h-[160px]">
            <AnimatePresence mode="popLayout">
                {letters.map((letter, i) => (
                    <motion.div
                        key={`${letter.id}-${i}`} // Force re-render for animation
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="glass-card p-6 flex flex-col justify-between"
                    >
                        <p className="text-slate-300 text-sm italic mb-4 line-clamp-3">"{letter.content}"</p>
                        <div className="text-right">
                            <span className="text-xs text-slate-500 font-bold">- {letter.sender_name}</span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

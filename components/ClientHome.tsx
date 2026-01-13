'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Star, LogOut, Send } from 'lucide-react'
import RandomLetters from './RandomLetters'
import { signOut } from '@/app/actions'

type User = {
    id: string
} | null

export default function ClientHome({ user, hasMailbox, mailboxKey }: { user: User, hasMailbox: boolean, mailboxKey: string | null }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {user && (
                <div className="absolute top-6 right-6 z-20">
                    <button onClick={() => signOut()} className="text-sm text-slate-400 hover:text-white flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all">
                        <LogOut className="w-4 h-4" /> 로그아웃
                    </button>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center w-full max-w-5xl mx-auto space-y-8 z-10 flex flex-col items-center"
            >
                <div className="space-y-6 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-white/90 mb-4 border border-white/10 shadow-lg shadow-primary/5"
                    >
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>느린 우체통 서비스 MVP v1.2</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
                        마음을 전하는 <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 text-glow">
                            느린 우체통
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-lg mx-auto font-light">
                        말로 다 하지 못한 진심을<br />
                        활짝 열린 당신만의 우체통에 담아보세요.
                    </p>
                </div>

                {/* Random Letters Carousel */}
                <div className="w-full py-8">
                    <RandomLetters />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                    {user && hasMailbox ? (
                        <div className="flex gap-4">
                            <Link href={`/dashboard`} className="btn-primary w-full sm:w-auto group text-lg px-8 py-4">
                                <Mail className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                                내 우체통 보러가기
                            </Link>
                            <Link href="/write" className="btn-glass w-full sm:w-auto group text-lg px-8 py-4">
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                편지 쓰러 가기
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Link href="/write" className="btn-glass w-full sm:w-auto group text-lg px-8 py-4">
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                편지 쓰러 가기
                            </Link>
                            <Link href="/make" className="btn-primary w-full sm:w-auto group text-lg px-8 py-4">
                                <Mail className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
                                {user ? "내 우체통 만들기" : "내 우체통 만들기 (로그인)"}
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>

            <footer className="absolute bottom-6 text-center text-slate-600 text-sm">
                Built with Next.js + Supabase
            </footer>
        </main>
    )
}

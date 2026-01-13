'use client'

import { useActionState, useEffect, useState } from 'react'
import { sendLetter } from '@/app/actions'
import Link from 'next/link'
import { Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const initialState = {
    error: '',
    success: false,
}

export default function LetterForm({ mailboxKey, mailboxName }: { mailboxKey: string, mailboxName: string }) {
    const sendLetterWithKey = sendLetter.bind(null, mailboxKey)
    // Casting to any to avoid strict type mismatch with bind in Next 15
    const [state, formAction, isPending] = useActionState(sendLetterWithKey as any, initialState)
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        if (state?.success) {
            setShowSuccess(true)
        }
    }, [state])

    if (showSuccess) {
        return (
            <div className="glass-card w-full max-w-md text-center py-12 px-8 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">편지가 전달되었어요</h2>
                <p className="text-slate-300 mb-8">
                    소중한 마음을 안전하게 우체통에 넣었습니다.<br />
                    곧 상대방에게 도착할 거예요.
                </p>
                <Link
                    href="/"
                    className="btn-primary w-full inline-flex justify-center"
                >
                    <Sparkles className="w-5 h-5" /> 메인으로 돌아가기
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full max-w-lg">
            <div className="text-center mb-10 space-y-2">
                <h1 className="text-4xl font-bold text-white drop-shadow-md tracking-tight">
                    {mailboxName}의 우체통
                </h1>
                <p className="text-slate-400">
                    이곳에 당신의 진심을 남겨주세요.
                </p>
            </div>

            <div className="glass-card">
                <form action={formAction} className="space-y-6">
                    <div className="space-y-4">


                        <div className="space-y-2">
                            <label htmlFor="senderName" className="block text-sm font-medium text-slate-300 ml-1">
                                보내는 사람 닉네임 <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="senderName"
                                id="senderName"
                                placeholder="당신의 이름 또는 별명"
                                className="input-base"
                                required
                                maxLength={30}
                            />
                        </div>


                        <div className="space-y-2">
                            <label htmlFor="openDate" className="block text-sm font-medium text-slate-300 ml-1">
                                언제 열어볼까요? <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                name="openDate"
                                id="openDate"
                                className="input-base"
                                required
                                min={new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="block text-sm font-medium text-slate-300 ml-1">
                            편지 내용
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            rows={8}
                            placeholder="하고 싶은 이야기를 자유롭게 적어주세요..."
                            className="input-base resize-none leading-relaxed"
                            required
                            maxLength={2000}
                        />
                    </div>

                    <div className="flex items-center gap-2 pl-1">
                        <input
                            type="checkbox"
                            name="isPublic"
                            id="isPublic"
                            className="w-4 h-4 rounded border-slate-500 text-primary focus:ring-primary/50 bg-white/5"
                        />
                        <label htmlFor="isPublic" className="text-sm text-slate-300 cursor-pointer select-none">
                            익명으로 메인 페이지 공개를 허용합니다 (선택)
                        </label>
                    </div>

                    {state?.error && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="btn-primary w-full text-lg py-4"
                    >
                        {isPending ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> 전송 중...</>
                        ) : (
                            <><Send className="w-5 h-5" /> 편지 보내기</>
                        )}
                    </button>
                </form>
            </div >
        </div >
    )
}

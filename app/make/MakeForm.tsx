'use client'

import { useActionState } from 'react'
import { createMailbox } from '@/app/actions'
import { Mail, Loader2, ArrowRight } from 'lucide-react'

const initialState = {
    error: '',
}

export default function MakeForm() {
    const [state, formAction, isPending] = useActionState(createMailbox as any, initialState)

    return (
        <div className="glass-card w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="text-center">
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20 shadow-lg shadow-primary/10">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-white">우체통 만들기</h2>
                <p className="text-slate-400 mt-2">나만의 특별한 우체통을 만들어보세요.</p>
            </div>

            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="aka" className="block text-sm font-medium text-slate-300 ml-1">
                        우체통 이름 (URL 주소)
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500">
                            /
                        </div>
                        <input
                            type="text"
                            name="aka"
                            id="aka"
                            placeholder="my-mailbox"
                            className="input-base pl-8"
                            required
                            minLength={2}
                            maxLength={20}
                            pattern="[a-zA-Z0-9-]+"
                            autoComplete="off"
                        />
                    </div>
                    <p className="text-xs text-slate-500 ml-1">
                        영문, 숫자, 하이픈(-)만 가능 (예: jisu-letter)
                    </p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="notificationEmail" className="block text-sm font-medium text-slate-300 ml-1">
                        알림 이메일 <span className="text-slate-600 text-xs">(선택사항)</span>
                    </label>
                    <input
                        type="email"
                        name="notificationEmail"
                        id="notificationEmail"
                        placeholder="example@email.com"
                        className="input-base"
                    />
                    <p className="text-xs text-slate-500 ml-1">
                        입력하시면 편지가 도착했을 때 이메일로 알려드려요.
                    </p>
                </div>

                {state?.error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                        <span className="block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        {state.error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary w-full text-lg py-4"
                >
                    {isPending ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> 생성 중...</>
                    ) : (
                        <>우체통 생성하기</>
                    )}
                </button>
            </form>
        </div>
    )
}

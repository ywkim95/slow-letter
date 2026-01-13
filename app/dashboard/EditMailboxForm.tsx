'use client'

import { useActionState, useState, useEffect } from 'react'
import { updateMailboxAka } from '@/app/actions'
import { Pencil, Loader2, Check } from 'lucide-react'

const initialState = {
    error: '',
    success: false,
    message: '',
    newAka: ''
}

export default function EditMailboxForm({ currentAka, mailboxId }: { currentAka: string, mailboxId: string }) {
    const [state, formAction, isPending] = useActionState(updateMailboxAka as any, initialState)
    const [isEditing, setIsEditing] = useState(false)
    const [aka, setAka] = useState(currentAka)

    useEffect(() => {
        if (state?.success && state.newAka) {
            setIsEditing(false)
            setAka(state.newAka)
        }
    }, [state])

    if (!isEditing) {
        return (
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white tracking-tight">{aka}의 우체통</h1>
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="이름 변경하기"
                >
                    <Pencil className="w-4 h-4" />
                </button>
            </div>
        )
    }

    return (
        <form action={formAction} className="flex items-center gap-2">
            <input type="hidden" name="mailboxId" value={mailboxId} />
            <input
                type="text"
                name="aka"
                defaultValue={aka}
                className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-lg focus:outline-none focus:border-primary/50 w-full max-w-[200px]"
                autoFocus
                minLength={2}
                maxLength={20}
            />
            <button
                type="submit"
                disabled={isPending}
                className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 disabled:opacity-50 transition-colors"
                title="저장"
            >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
            </button>
            <button
                type="button"
                onClick={() => {
                    setIsEditing(false)
                    setAka(currentAka)
                }}
                className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-sm"
            >
                취소
            </button>
            {state?.error && (
                <div className="absolute top-full mt-2 text-xs text-red-400 bg-red-950/80 px-2 py-1 rounded">
                    {state.error}
                </div>
            )}
        </form>
    )
}

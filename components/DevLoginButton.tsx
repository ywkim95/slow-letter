'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FlaskConical } from 'lucide-react'

export default function DevLoginButton() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleDevLogin = async () => {
        setLoading(true)
        const email = 'test@example.com'
        const password = 'password1234'

        // 1. Try Login
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (signInError) {
            // 2. If Failed (likely user doesn't exist), Try SignUp
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            })

            if (signUpError) {
                alert('테스트 로그인 실패: ' + signUpError.message)
                setLoading(false)
                return
            }
        }

        // Refresh to trigger server middleware/session check
        router.refresh()
    }

    if (process.env.NODE_ENV === 'production') return null

    return (
        <button
            onClick={handleDevLogin}
            disabled={loading}
            className="mt-4 text-xs text-slate-500 hover:text-slate-300 underline flex items-center gap-1 mx-auto"
        >
            <FlaskConical className="w-3 h-3" />
            {loading ? '테스트 계정 접속 중...' : 'Kakao 설정 없이 테스트 계정으로 로그인 (개발용)'}
        </button>
    )
}

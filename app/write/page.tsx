import Link from 'next/link'
import GeneralLetterForm from './GeneralLetterForm'

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] right-[20%] w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse" />
                <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <GeneralLetterForm />

            <footer className="mt-12 text-center text-slate-600 text-sm">
                <Link href="/" className="hover:text-slate-400 transition-colors">
                    © Slow Letter Service
                </Link>
            </footer>
        </div>
    )
}

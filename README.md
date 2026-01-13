# 📮 Slow Letter (느린 우체통)

> "당신의 진심이 닿을 때까지, 잠시 기다림을 선물합니다."

**Slow Letter**는 디지털 세상에서 잊혀가는 '기다림의 미학'을 되살리는 웹 서비스입니다.  
밤하늘의 별처럼 소중한 마음을 담아, 지정된 날짜에 열어볼 수 있는 편지를 보내보세요.

![Preview](https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop) 
*(예시 이미지)*

## ✨ 주요 기능

### 1. 💌 느린 편지 보내기
- **익명성 보장**: 누구나 부담 없이 마음을 전할 수 있습니다.
- **오픈 날짜 설정**: 편지를 바로 읽을 수 없습니다. 최소 3일 뒤부터 열람 가능합니다.
- **두 가지 발송 방식**:
  - **직접 주소 입력**: 친구의 이메일만 알면 바로 보낼 수 있습니다 (`/write`).
  - **우체통 링크**: 친구가 공유해준 링크(`/uuid`)를 통해 보낼 수 있습니다.

### 2. 📮 나만의 우체통 만들기
- **구글 로그인**으로 간편하게 내 우체통을 생성할 수 있습니다.
- **고유 링크 공유**: `slow-letter.com/uuid` 형태의 고유 주소를 친구들에게 공유하세요.
- **이름 변경 자유**: 우체통 이름(AKA)을 언제든 바꿔도, 공유된 링크는 유지됩니다.

### 3. 🌌 감성적인 UI/UX
- **Night Sky 테마**: 깊은 밤, 별이 쏟아지는 듯한 몽환적인 디자인.
- **부드러운 인터랙션**: Framer Motion을 활용한 감성적인 애니메이션.

---

## 🛠 기술 스택 (Tech Stack)

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Glassmorphism design)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Lucide React

---

## 🚀 시작하기 (Getting Started)

### 1. 프로젝트 클론
```bash
git clone https://github.com/ywkim95/slow-letter.git
cd slow-letter/web
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정 (.env.local)
프로젝트 루트에 `.env.local` 파일을 생성하고 Supabase 키를 입력하세요.
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속하여 확인합니다.

---

## 🗄️ 데이터베이스 구조 (Database Schema)

이 프로젝트는 3개의 핵심 테이블로 구성됩니다.

1.  **Users (`users`)**: 사용자 정보 (Supabase Auth 연동)
2.  **Mailboxes (`mailboxes`)**: 사용자별 우체통 (UUID, 별칭, 알림 설정)
3.  **Letters (`letters`)**: 편지 데이터 (내용, 보낸이, 오픈 날짜, 공개 여부)

---

## 🎨 Future Features (로드맵)
- [ ] 편지 도착 시 이메일 알림 연동 (Resend/Nodemailer)
- [ ] 공개 허용된 편지들의 랜덤 롤링 기능 (현재는 데모 데이터)
- [ ] 다양한 우체통 스킨(테마) 변경 기능

---

Build with 💫 by **Slow Letter Team**

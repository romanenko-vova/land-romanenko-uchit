import { ImageResponse } from 'next/og'

export function GET() {
  const width = 1200
  const height = 630
  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(1200px 600px at 0% 100%, rgba(236,72,153,0.25), transparent), radial-gradient(1200px 600px at 100% 0%, rgba(99,102,241,0.25), transparent), #07051A',
          color: '#fff',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', padding: 40, width: '100%' }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 900,
              letterSpacing: -1,
              marginBottom: 12,
            }}
          >
            Романенко учит
          </div>
          <div style={{ fontSize: 30, color: '#c084fc' }}>
            Telegram‑боты • Django • FastAPI
          </div>
        </div>
      </div>
    ),
    { width, height }
  )
}



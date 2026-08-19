import {
  AbsoluteFill,
  Composition,
  Easing,
  Folder,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

const FONT_FAMILY = 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
const MONO_FAMILY = 'JetBrains Mono, SFMono-Regular, Menlo, Consolas, ui-monospace, monospace'

type ProjectMarketingProps = {
  eyebrow: string
  title: string
  variant: 'kanban' | 'finder' | 'dashboard' | 'orm'
}

function WindowBar({ dark, label }: { dark: boolean; label: string }) {
  return (
    <div
      style={{
        alignItems: 'center',
        borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(22,19,16,0.1)',
        display: 'flex',
        gap: 9,
        height: 46,
        padding: '0 17px',
      }}
    >
      <span style={{ background: '#ff7c67', borderRadius: 99, height: 7, width: 7 }} />
      <span style={{ background: '#ffd166', borderRadius: 99, height: 7, width: 7 }} />
      <span style={{ background: '#63d99b', borderRadius: 99, height: 7, width: 7 }} />
      <span
        style={{
          color: dark ? 'rgba(255,255,255,0.48)' : 'rgba(22,19,16,0.5)',
          fontFamily: FONT_FAMILY,
          fontSize: 12,
          fontWeight: 650,
          marginLeft: 7,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function KodlDemo() {
  const frame = useCurrentFrame()

  return (
    <div style={{ background: '#f7f4ee', height: '100%', padding: '18px 20px 20px' }}>
      <div style={{ alignItems: 'center', display: 'flex', gap: 20 }}>
        <strong style={{ color: '#171410', fontSize: 18, letterSpacing: '-0.03em' }}>Sprint 12</strong>
        {['Kanban', 'Backlog', 'GitHub', 'Chat'].map((item, index) => (
          <span
            key={item}
            style={{
              color: index === 0 ? '#a93800' : '#777066',
              fontSize: 12,
              fontWeight: index === 0 ? 750 : 600,
            }}
          >
            {item}
          </span>
        ))}
        <span style={{ background: '#fff0ea', borderRadius: 99, color: '#a93800', fontSize: 11, fontWeight: 750, marginLeft: 'auto', padding: '7px 10px' }}>
          GitHub synchronisé
        </span>
      </div>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 16 }}>
        {['À faire · 3', 'En cours · 2', 'Terminé · 6'].map((column, columnIndex) => (
          <div key={column} style={{ background: '#ede9e1', borderRadius: 12, height: 246, padding: 12 }}>
            <div style={{ color: '#6f685f', fontSize: 11, fontWeight: 750, marginBottom: 11, textTransform: 'uppercase' }}>{column}</div>
            {[0, 1].map((cardIndex) => (
              <div
                key={cardIndex}
                style={{
                  background: columnIndex === 1 && cardIndex === 0 ? 'linear-gradient(135deg, #ff7a45, #ff4d70)' : '#fffdf9',
                  border: '1px solid rgba(22,19,16,0.08)',
                  borderRadius: 9,
                  boxShadow: '0 8px 20px rgba(50,42,35,0.06)',
                  height: cardIndex === 0 ? 76 : 62,
                  marginBottom: 9,
                  opacity: interpolate(frame, [8 + columnIndex * 9 + cardIndex * 6, 22 + columnIndex * 9 + cardIndex * 6], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  padding: 11,
                  translate: interpolate(frame, [8 + columnIndex * 9 + cardIndex * 6, 27 + columnIndex * 9 + cardIndex * 6], ['0px 14px', '0px 0px'], {
                    easing: Easing.spring({ damping: 190 }),
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              >
                <div style={{ background: columnIndex === 1 && cardIndex === 0 ? '#ffffff' : '#27231f', borderRadius: 99, height: 6, opacity: 0.82, width: cardIndex === 0 ? '78%' : '58%' }} />
                <div style={{ background: columnIndex === 1 && cardIndex === 0 ? 'rgba(255,255,255,0.58)' : '#cbc5bc', borderRadius: 99, height: 5, marginTop: 11, width: '44%' }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function FinderDemo() {
  const frame = useCurrentFrame()
  const query = '.code'
  const visibleQuery = query.slice(0, Math.max(0, Math.min(query.length, Math.floor((frame - 10) / 3))))
  const results = ['Visual Studio Code', 'Code - Insiders', 'Codium']

  return (
    <div style={{ alignItems: 'center', background: 'radial-gradient(circle at 30% 20%, #394978, #17162f 72%)', display: 'flex', height: '100%', justifyContent: 'center', padding: '28px 56px' }}>
      <div style={{ background: '#131315', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 14, boxShadow: '0 30px 90px rgba(0,0,0,0.42)', overflow: 'hidden', width: '82%' }}>
        <div style={{ alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 12, height: 68, padding: '0 22px' }}>
          <span style={{ color: '#7489df', fontSize: 23 }}>⌕</span>
          <span style={{ color: '#ffffff', fontSize: 22, fontWeight: 600 }}>{visibleQuery}</span>
          <span style={{ background: '#8da2ff', height: 25, opacity: frame % 18 < 9 ? 1 : 0.2, width: 2 }} />
          <span style={{ border: '1px solid rgba(255,255,255,0.13)', borderRadius: 6, color: 'rgba(255,255,255,0.45)', fontSize: 10, marginLeft: 'auto', padding: '5px 8px' }}>ALT + SPACE</span>
        </div>
        {results.map((result, index) => (
          <div
            key={result}
            style={{
              alignItems: 'center',
              background: index === 0 ? 'rgba(116,137,223,0.18)' : 'transparent',
              borderBottom: index < results.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              color: index === 0 ? '#ffffff' : 'rgba(255,255,255,0.56)',
              display: 'flex',
              fontSize: 16,
              fontWeight: 600,
              height: 57,
              opacity: interpolate(frame, [31 + index * 7, 44 + index * 7], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              padding: '0 22px',
              translate: interpolate(frame, [31 + index * 7, 49 + index * 7], ['12px 0px', '0px 0px'], {
                easing: Easing.spring({ damping: 200 }),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <span style={{ background: index === 0 ? '#3275c4' : '#28282d', borderRadius: 7, height: 28, marginRight: 12, width: 28 }} />
            {result}
          </div>
        ))}
        <div style={{ color: 'rgba(255,255,255,0.34)', fontSize: 10, padding: '9px 22px' }}>3 applications · ↑↓ naviguer · ↵ ouvrir</div>
      </div>
    </div>
  )
}

function SeigosDemo() {
  const frame = useCurrentFrame()

  return (
    <div style={{ background: '#f6f7fb', display: 'grid', gap: 13, gridTemplateColumns: '1.25fr 0.75fr', height: '100%', padding: 17 }}>
      <div style={{ background: '#ffffff', borderRadius: 12, boxShadow: '0 9px 26px rgba(20,38,70,0.07)', padding: 17 }}>
        <div style={{ alignItems: 'center', color: '#111217', display: 'flex', fontSize: 14, fontWeight: 780, gap: 9 }}>
          <span style={{ background: '#1268ed', borderRadius: 7, height: 24, width: 24 }} />
          Revenus et dépenses
        </div>
        <div style={{ alignItems: 'end', display: 'flex', gap: 10, height: 186, marginTop: 18 }}>
          {[0.46, 0.7, 0.58, 0.86, 0.62, 1].map((height, index) => (
            <div key={height} style={{ alignItems: 'end', display: 'flex', gap: 4, height: '100%', width: 38 }}>
              <div
                style={{
                  background: '#8cb7f5',
                  borderRadius: '6px 6px 2px 2px',
                  height: interpolate(frame, [12 + index * 4, 42 + index * 4], [5, 148 * height], {
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  width: 20,
                }}
              />
              <div
                style={{
                  background: '#1268ed',
                  borderRadius: '5px 5px 2px 2px',
                  height: interpolate(frame, [20 + index * 4, 49 + index * 4], [4, 72 * height], {
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  width: 14,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 13 }}>
        <div style={{ background: '#ffffff', borderRadius: 12, boxShadow: '0 9px 26px rgba(20,38,70,0.07)', padding: 16 }}>
          <div style={{ color: '#5f6571', fontSize: 10, fontWeight: 780, letterSpacing: '0.08em' }}>PROJETS ACTIFS</div>
          {['Atelier A', 'Chantier B', 'Conseil C'].map((project, index) => (
            <div key={project} style={{ alignItems: 'center', display: 'flex', gap: 8, marginTop: 14 }}>
              <span style={{ background: index === 2 ? '#8445d8' : '#ffe8dc', borderRadius: 6, height: 23, width: 23 }} />
              <span style={{ color: '#252831', fontSize: 11, fontWeight: 650 }}>{project}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#1268ed', borderRadius: 12, color: '#ffffff', padding: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 750, opacity: 0.76 }}>MARGE PRÉVISIONNELLE</div>
          <div style={{ fontSize: 34, fontWeight: 780, letterSpacing: '-0.05em', marginTop: 8 }}>+18,4%</div>
          <div style={{ background: 'rgba(255,255,255,0.22)', borderRadius: 99, height: 6, marginTop: 12, overflow: 'hidden' }}>
            <div style={{ background: '#ffffff', borderRadius: 99, height: '100%', width: `${interpolate(frame, [42, 72], [5, 78], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

const LUA_TOKEN = /("[^"]*"|\b(?:local|function|end|return|true|false|nil)\b|\b\d+\b)/g

function luaTokenColor(token: string) {
  if (token.startsWith('"')) return '#f1fa8c'
  if (/^(local|function|end|return|true|false|nil)$/.test(token)) return '#ff79c6'
  if (/^\d+$/.test(token)) return '#bd93f9'
  return '#f8f8f2'
}

function LuaCode({ text }: { text: string }) {
  return (
    <>
      {text
        .split(LUA_TOKEN)
        .filter((token) => Boolean(token))
        .map((token, index) => (
          <span key={`${token}-${index}`} style={{ color: luaTokenColor(token) }}>
            {token}
          </span>
        ))}
    </>
  )
}

function OrvexDemo() {
  const frame = useCurrentFrame()
  const sqlLines = [
    'SELECT u.*, v.plate FROM users u',
    'LEFT JOIN vehicles v',
    '  ON v.owner = u.identifier',
    "WHERE u.identifier = 'license:abc123'",
    '  AND u.money > 500',
    'ORDER BY u.money DESC LIMIT 10;',
  ]
  const luaLines = [
    'local User = OrvexORM.model("users", {',
    '  identifier = "string",',
    '  money = "number",',
    '})',
    '',
    'local player = User.find({',
    '  identifier = "license:abc123",',
    '})',
    'player:update({ money = 1000 })',
  ]
  const stats = ['Relations', 'Migrations', 'Cache TTL', '< 0,01 ms / requête']

  return (
    <div style={{ background: '#282a36', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'grid', flex: 1, gridTemplateColumns: '0.92fr 1.08fr', minHeight: 0 }}>
        <div style={{ borderRight: '1px solid rgba(248,248,242,0.08)', padding: '16px 18px', position: 'relative' }}>
          <div style={{ color: '#6272a4', fontFamily: FONT_FAMILY, fontSize: 10, fontWeight: 780, letterSpacing: '0.14em' }}>
            SQL ÉCRIT À LA MAIN
          </div>
          <div style={{ marginTop: 14, position: 'relative' }}>
            {sqlLines.map((line, index) => (
              <div
                key={line}
                style={{
                  color: '#8b93b8',
                  fontFamily: MONO_FAMILY,
                  fontSize: 12.5,
                  lineHeight: '26px',
                  opacity:
                    interpolate(frame, [2 + index * 3, 12 + index * 3], [0, 1], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }) *
                    interpolate(frame, [46 + index * 4, 62 + index * 4], [1, 0], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  translate: interpolate(frame, [46 + index * 4, 68 + index * 4], ['0px 0px', '-14px 0px'], {
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  whiteSpace: 'pre',
                }}
              >
                {line}
              </div>
            ))}
          </div>
          <div
            style={{
              left: 18,
              opacity: interpolate(frame, [70, 88], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              position: 'absolute',
              right: 18,
              top: 96,
              translate: interpolate(frame, [70, 94], ['0px 10px', '0px 0px'], {
                easing: Easing.spring({ damping: 200 }),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <div style={{ color: '#50fa7b', fontFamily: MONO_FAMILY, fontSize: 34, fontWeight: 700, letterSpacing: '-0.04em' }}>
              0
            </div>
            <div style={{ color: '#f8f8f2', fontFamily: FONT_FAMILY, fontSize: 15, fontWeight: 730, marginTop: 4 }}>
              requête SQL écrite
            </div>
            <div style={{ color: 'rgba(248,248,242,0.5)', fontFamily: FONT_FAMILY, fontSize: 11.5, lineHeight: '18px', marginTop: 9 }}>
              Le query builder génère le SQL,
              <br />
              les relations et le cache suivent.
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 18px' }}>
          <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
            <span style={{ background: '#bd93f9', borderRadius: 5, height: 16, width: 16 }} />
            <span style={{ color: '#f8f8f2', fontFamily: FONT_FAMILY, fontSize: 10, fontWeight: 780, letterSpacing: '0.14em' }}>
              ORVEXORM · LUA
            </span>
          </div>
          <div style={{ marginTop: 14 }}>
            {luaLines.map((line, index) => {
              const start = 24 + index * 9
              const typed = line.slice(0, Math.max(0, Math.min(line.length, Math.floor((frame - start) * 1.9))))
              const isTyping = frame >= start && typed.length < line.length

              return (
                <div
                  key={`${line}-${index}`}
                  style={{
                    fontFamily: MONO_FAMILY,
                    fontSize: 13,
                    lineHeight: '26px',
                    minHeight: 26,
                    whiteSpace: 'pre',
                  }}
                >
                  <LuaCode text={typed} />
                  {isTyping ? (
                    <span
                      style={{
                        background: '#bd93f9',
                        display: 'inline-block',
                        height: 15,
                        opacity: frame % 16 < 8 ? 1 : 0.25,
                        translate: '0px 2px',
                        width: 2,
                      }}
                    />
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          alignItems: 'center',
          borderTop: '1px solid rgba(248,248,242,0.08)',
          display: 'flex',
          gap: 9,
          height: 54,
          padding: '0 18px',
        }}
      >
        {stats.map((stat, index) => (
          <span
            key={stat}
            style={{
              background: index === stats.length - 1 ? 'rgba(80,250,123,0.13)' : 'rgba(248,248,242,0.06)',
              border: index === stats.length - 1 ? '1px solid rgba(80,250,123,0.35)' : '1px solid rgba(248,248,242,0.1)',
              borderRadius: 99,
              color: index === stats.length - 1 ? '#50fa7b' : 'rgba(248,248,242,0.68)',
              fontFamily: FONT_FAMILY,
              fontSize: 11,
              fontWeight: 700,
              opacity: interpolate(frame, [76 + index * 6, 90 + index * 6], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              padding: '7px 12px',
              translate: interpolate(frame, [76 + index * 6, 96 + index * 6], ['0px 10px', '0px 0px'], {
                easing: Easing.spring({ damping: 200 }),
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {stat}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectMarketing({ eyebrow, title, variant }: ProjectMarketingProps) {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const isDark = variant === 'finder' || variant === 'orm'
  const palette = variant === 'kanban'
    ? { accent: '#ff6b35', background: '#faf9f7', ink: '#171410', window: '#ffffff' }
    : variant === 'dashboard'
      ? { accent: '#1268ed', background: '#eef3fb', ink: '#111217', window: '#ffffff' }
      : variant === 'orm'
        ? { accent: '#bd93f9', background: '#1b1a26', ink: '#f8f8f2', window: '#282a36' }
        : { accent: '#8da2ff', background: '#17162f', ink: '#ffffff', window: '#17171a' }

  return (
    <AbsoluteFill
      name={`${title} preview`}
      style={{
        background: palette.background,
        color: palette.ink,
        fontFamily: FONT_FAMILY,
        opacity: interpolate(frame, [0, 8, durationInFrames - 10, durationInFrames - 1], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
        padding: 34,
      }}
    >
      <Interactive.Div name="Project heading" style={{ alignItems: 'end', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ color: palette.accent, fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{eyebrow}</div>
          <div style={{ fontSize: 42, fontWeight: 730, letterSpacing: '-0.045em', marginTop: 7 }}>{title}</div>
        </div>
        <div style={{ border: isDark ? '1px solid rgba(255,255,255,0.17)' : '1px solid rgba(22,19,16,0.14)', borderRadius: 99, fontSize: 11, fontWeight: 750, padding: '8px 12px' }}>APERÇU PRODUIT</div>
      </Interactive.Div>

      <Interactive.Div
        name="Application window"
        style={{
          background: palette.window,
          border: isDark ? '1px solid rgba(255,255,255,0.13)' : '1px solid rgba(22,19,16,0.1)',
          borderRadius: 17,
          bottom: 34,
          boxShadow: isDark ? '0 25px 80px rgba(0,0,0,0.34)' : '0 25px 70px rgba(28,23,18,0.12)',
          left: 34,
          overflow: 'hidden',
          position: 'absolute',
          right: 34,
          top: 128,
          translate: interpolate(frame, [0, 24], ['0px 26px', '0px 0px'], {
            easing: Easing.spring({ damping: 190 }),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <WindowBar
          dark={isDark}
          label={
            variant === 'kanban'
              ? 'kodl.fr · Là où le code rencontre la clarté'
              : variant === 'dashboard'
                ? 'SEIGOS · Pilotage en temps réel'
                : variant === 'orm'
                  ? 'OrvexORM · L’ORM qui fait disparaître le SQL'
                  : 'Finder · Alt + Espace'
          }
        />
        <div style={{ height: 'calc(100% - 46px)' }}>
          {variant === 'kanban' ? <KodlDemo /> : null}
          {variant === 'finder' ? <FinderDemo /> : null}
          {variant === 'orm' ? <OrvexDemo /> : null}
          {variant === 'dashboard' ? <SeigosDemo /> : null}
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  )
}

export function RemotionRoot() {
  return (
    <Folder name="Project-Previews">
      <Composition
        id="KodlPreview"
        component={ProjectMarketing}
        durationInFrames={135}
        fps={30}
        width={960}
        height={600}
        defaultProps={{ eyebrow: 'Gestion de projet pour développeurs', title: 'Kodl', variant: 'kanban' }}
      />
      <Composition
        id="FinderPreview"
        component={ProjectMarketing}
        durationInFrames={135}
        fps={30}
        width={960}
        height={600}
        defaultProps={{ eyebrow: 'Spotlight pour Linux', title: 'Finder', variant: 'finder' }}
      />
      <Composition
        id="SeigosPreview"
        component={ProjectMarketing}
        durationInFrames={135}
        fps={30}
        width={960}
        height={600}
        defaultProps={{ eyebrow: 'Pilotage des TPE et PME', title: 'SEIGOS', variant: 'dashboard' }}
      />
      <Composition
        id="OrvexOrmPreview"
        component={ProjectMarketing}
        durationInFrames={135}
        fps={30}
        width={960}
        height={600}
        defaultProps={{ eyebrow: 'ORM Lua pour FiveM', title: 'OrvexORM', variant: 'orm' }}
      />
    </Folder>
  )
}

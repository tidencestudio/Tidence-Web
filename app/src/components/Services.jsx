const items = [
  {
    label: '01 — DESIGN',
    text: 'Clean interfaces, built around each business.',
  },
  {
    label: '02 — DEVELOPMENT',
    text: 'Fast, solid sites that are easy to maintain.',
  },
  {
    label: '03 — GROWTH',
    text: 'Long-term partnership, not just a one-off delivery.',
  },
];

export default function Services() {
  return (
    <section style={{ background: '#EEF3F2', padding: '4rem 2rem' }}>
      <div
        style={{
          maxWidth: 920,
          margin: '0 auto',
          display: 'flex',
          gap: '3rem',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {items.map(({ label, text }) => (
          <div key={label} style={{ flex: 1, minWidth: 200 }}>
            <div
              style={{
                fontSize: 13,
                letterSpacing: 1,
                color: '#2E8B93',
                marginBottom: 12,
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: 15, color: '#123240', lineHeight: 1.6 }}>
              {text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

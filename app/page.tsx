export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome</h1>
      <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
        This is your new project. Start building in the app directory.
      </p>
      <a href="/api/health" style={{ color: '#2563eb', textDecoration: 'underline' }}>
        API health check
      </a>
    </main>
  );
}

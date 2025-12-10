export default function NotFound() {
  return (
    <div style={{ padding: '3rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Page not found</h1>
      <p style={{ color: '#555' }}>The page you requested does not exist.</p>
      <a href="/" style={{ color: '#2563eb', textDecoration: 'underline', marginTop: '0.75rem', display: 'inline-block' }}>
        Go to home
      </a>
    </div>
  );
}

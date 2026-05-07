export default function ErrorPage({ message }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "red" }}>Error</h2>
      <p>{message}</p>
    </div>
  );
}
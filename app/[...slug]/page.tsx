export default async function Page({ params }) {
  const { slug } = params;

  return <div>Slug: {slug}</div>;
}

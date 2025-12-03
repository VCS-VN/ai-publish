export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <div>Slug: {slug}</div>;
}

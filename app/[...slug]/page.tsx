import { redirect } from 'next/navigation';

export default async function Page({ params }) {
  const { slug } = await params;
  return <div>Slug: {slug}</div>;
}

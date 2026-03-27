import ClientViewer from '@/components/ClientViewer';
import { Metadata } from 'next';

// This is required in Next.js 15 where params is a Promise.
// We await it to extract the id properly before passing to the client component.

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Product ${id}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ClientViewer productId={id} />;
}

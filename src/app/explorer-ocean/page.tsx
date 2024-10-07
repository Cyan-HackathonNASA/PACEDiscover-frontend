import dynamic from 'next/dynamic';

const EarthScene = dynamic(() => import('@/components/three/EarthScene'), {
  ssr: false,
});

export default function ExplorerOcean() {
  return (
    <section className="h-screen">
      <EarthScene />
    </section>
  );
}

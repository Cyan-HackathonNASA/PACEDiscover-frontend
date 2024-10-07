import dynamic from 'next/dynamic';

const EarthScene = dynamic(() => import('@/components/three/EarthScene'), {
  ssr: false,
});

export default function ExplorerOcean() {
  return (
    <section style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="h-screen">
      <EarthScene />
    </section>
  );
}

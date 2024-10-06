import EarthScene from '@/components/three/EarthScene';

export default function ExplorerOcean() {
  // Estado para controlar a renderização da cena 3D

  return (
    <section style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="h-screen">
      <EarthScene />
    </section>
  );
}

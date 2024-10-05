import { Water } from 'three/examples/jsm/objects/Water';
import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: ReactThreeFiber.Object3DNode<Water, typeof Water>;
    }
  }
}

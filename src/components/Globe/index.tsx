import { useCallback, useEffect, useRef } from 'react';
import ReactGlobe, { GlobeMethods } from 'react-globe.gl';

import { Color, MeshPhongMaterial, SpotLight } from 'three';

import { countries } from './countries';

interface PointsData {
  lat: number
  lng: number
  size: number
  city?: string
}

interface GlobeProps {
  width?: number
  height?: number
  autoRotate?: boolean
  enableZoom?: boolean
  opacity?: number
  showAtmosphere?: boolean
  pointsColor?: string
  pointsData?: PointsData[]
}

export function Globe({
  width = 800,
  height = 800,
  autoRotate = true,
  enableZoom = false,
  showAtmosphere = true,
  opacity = 0.7,
  pointsColor = '#FECA00',
  pointsData
}: GlobeProps) {
  const globeRef = useRef<GlobeMethods>();

  const globeMaterial = new MeshPhongMaterial();
  globeMaterial.color = new Color('#000b18');
  globeMaterial.opacity = opacity;
  globeMaterial.transparent = true;

  useEffect(() => {
    if (globeRef?.current) {
      const globe = globeRef.current;
  
      globe.controls().autoRotate = autoRotate;
      globe.controls().autoRotateSpeed = 1;
      globe.controls().enableZoom = enableZoom;
  
      const camera = globeRef.current.camera();
      const aLight = new SpotLight(0xffffff, 0);
      aLight.position.set(75, 500, 0);
      camera.add(aLight);
  
      globe.scene().add(camera);
    }
  }, []);

  return (
    <ReactGlobe
      ref={globeRef}
      width={width}
      height={height}
      animateIn={true}
      showAtmosphere={showAtmosphere}
      globeMaterial={useCallback<any>(globeMaterial, [])}
      backgroundColor="rgba(0,0,0,0)"
      hexPolygonsData={countries.features}
      hexPolygonResolution={3}
      hexPolygonMargin={0.7}
      atmosphereAltitude={0.1}
      hexPolygonColor={() => "#4f339f"}
      pointsData={[
        {
          lat: -23.520850,
          lng: -46.581423,
          size: 0.3,
          city: 'Casa do joão'
        }
      ]}
      pointRadius={0.6}
      pointLabel="city"
      pointColor={() => pointsColor}
      pointAltitude={0.01}
    />
  )
}

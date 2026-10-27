'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { VehicleModel, ColorFinishPreset, PPFProtectionTier, WindowTintTier } from '@/types';
import { CameraPreset } from './StudioHUD';
import { Rotate3d, Loader2 } from 'lucide-react';

interface SVStudioCanvasProps {
  selectedVehicle: VehicleModel;
  selectedColor: ColorFinishPreset;
  selectedPPF: PPFProtectionTier;
  selectedTint: WindowTintTier;
  isNightMode: boolean;
  cameraPreset: CameraPreset;
}

export default function SVStudioCanvas({
  selectedVehicle,
  selectedColor,
  selectedPPF,
  selectedTint,
  isNightMode,
  cameraPreset,
}: SVStudioCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // References to keep Three.js state persistent across re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const bodyMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const glassMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const rimLightsRef = useRef<{ cyan: THREE.PointLight; red: THREE.PointLight; ambient: THREE.AmbientLight } | null>(null);
  const headlightsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Camera Target Interpolation
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(5, 2.2, 5));
  const isInteractingRef = useRef<boolean>(false);
  const isIntersectingRef = useRef<boolean>(true);
  const mouseStateRef = useRef<{ isDown: boolean; startX: number; startY: number; spherical: THREE.Spherical }>({
    isDown: false,
    startX: 0,
    startY: 0,
    spherical: new THREE.Spherical(7.5, Math.PI / 3, Math.PI / 4),
  });

  // Camera Preset Positions
  const presetCoordinates: Record<CameraPreset, THREE.Vector3> = {
    threeQuarterFront: new THREE.Vector3(5, 2.2, 5),
    side: new THREE.Vector3(7, 1.8, 0),
    threeQuarterRear: new THREE.Vector3(-5, 2.2, -5),
    front: new THREE.Vector3(0, 1.8, 6.5),
    top: new THREE.Vector3(0.01, 8.5, 0.01),
  };

  // Sync Camera Preset updates
  useEffect(() => {
    if (presetCoordinates[cameraPreset]) {
      targetCamPosRef.current.copy(presetCoordinates[cameraPreset]);
      // Update spherical coordinates
      const s = new THREE.Spherical();
      s.setFromVector3(presetCoordinates[cameraPreset]);
      mouseStateRef.current.spherical.copy(s);
    }
  }, [cameraPreset]);

  // Main Three.js Scene Setup
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#07090E');
    scene.fog = new THREE.FogExp2('#07090E', 0.06);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.copy(targetCamPosRef.current);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // 3. Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // 4. Studio Cyclorama Floor
    const floorGeo = new THREE.PlaneGeometry(35, 35);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090D15,
      roughness: 0.25,
      metalness: 0.6,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid Helper for High-Tech Studio Look
    const grid = new THREE.GridHelper(25, 25, 0x00f0ff, 0x1A2234);
    grid.position.y = 0.01;
    scene.add(grid);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const overheadLight = new THREE.DirectionalLight(0xffffff, 2.2);
    overheadLight.position.set(0, 8, 3);
    overheadLight.castShadow = true;
    overheadLight.shadow.mapSize.width = 1024;
    overheadLight.shadow.mapSize.height = 1024;
    overheadLight.shadow.bias = -0.0005;
    scene.add(overheadLight);

    // Dramatic Luxury Rim Lights (Cyan & Red)
    const cyanRim = new THREE.PointLight(0x00f0ff, 4.0, 18);
    cyanRim.position.set(-6, 2.5, 4);
    scene.add(cyanRim);

    const redRim = new THREE.PointLight(0xff3823, 3.5, 18);
    redRim.position.set(6, 2.5, -4);
    scene.add(redRim);

    rimLightsRef.current = { cyan: cyanRim, red: redRim, ambient: ambientLight };

    // 6. Base Materials
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.hex),
      roughness: selectedColor.roughness,
      metalness: selectedColor.metalness,
      clearcoat: selectedColor.clearcoat,
      clearcoatRoughness: selectedColor.clearcoatRoughness,
    });
    bodyMaterialRef.current = bodyMat;

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x111111),
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.5,
      transparent: true,
      opacity: 0.85,
    });
    glassMaterialRef.current = glassMat;

    // 7. Mouse / Touch Orbit Controls Interaction
    const handlePointerDown = (e: PointerEvent) => {
      mouseStateRef.current.isDown = true;
      mouseStateRef.current.startX = e.clientX;
      mouseStateRef.current.startY = e.clientY;
      isInteractingRef.current = true;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!mouseStateRef.current.isDown) return;
      const deltaX = e.clientX - mouseStateRef.current.startX;
      const deltaY = e.clientY - mouseStateRef.current.startY;
      mouseStateRef.current.startX = e.clientX;
      mouseStateRef.current.startY = e.clientY;

      const s = mouseStateRef.current.spherical;
      s.theta -= deltaX * 0.008;
      // Clamp phi to prevent crossing under floor (15 deg to 82 deg)
      s.phi = Math.max(0.25, Math.min(Math.PI / 2 - 0.08, s.phi - deltaY * 0.008));
    };

    const handlePointerUp = () => {
      mouseStateRef.current.isDown = false;
      isInteractingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = mouseStateRef.current.spherical;
      s.radius = Math.max(4.5, Math.min(13.0, s.radius + e.deltaY * 0.005));
    };

    const domEl = canvasRef.current;
    domEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    domEl.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Performance Optimization: IntersectionObserver (GPU Freeze when not visible)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    // 9. Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 520;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // FREEZE GPU: If not in viewport, skip rendering
      if (!isIntersectingRef.current) return;

      if (cameraRef.current) {
        // Smoothly interpolate camera position towards spherical coordinate target
        const s = mouseStateRef.current.spherical;
        const targetPos = new THREE.Vector3().setFromSpherical(s);
        cameraRef.current.position.lerp(targetPos, 0.08);
        cameraRef.current.lookAt(0, 0.8, 0);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    setIsLoading(false);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      domEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      domEl.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update Vehicle Model Mesh when `selectedVehicle` changes
  useEffect(() => {
    if (!sceneRef.current || !bodyMaterialRef.current || !glassMaterialRef.current) return;

    // Remove existing vehicle group
    if (carGroupRef.current) {
      sceneRef.current.remove(carGroupRef.current);
    }

    const group = new THREE.Group();
    headlightsRef.current = [];

    const bodyMat = bodyMaterialRef.current;
    const glassMat = glassMaterialRef.current;

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.1,
    });

    const darkPlasticMat = new THREE.MeshStandardMaterial({
      color: 0x111622,
      metalness: 0.2,
      roughness: 0.8,
    });

    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.9,
      metalness: 0.1,
    });

    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x1f242d,
      roughness: 0.2,
      metalness: 0.85,
    });

    const headlightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: isNightMode ? 0x00f0ff : 0x222222,
      emissiveIntensity: isNightMode ? 2.5 : 0.5,
    });
    headlightsRef.current.push(headlightMat);

    const taillightMat = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: isNightMode ? 0xff2200 : 0x440000,
      emissiveIntensity: isNightMode ? 2.5 : 0.5,
    });
    headlightsRef.current.push(taillightMat);

    // =========================================================================
    // PARAMETRIC CAR BUILDER PER VEHICLE TYPE
    // =========================================================================
    const vId = selectedVehicle.id;

    if (vId === 'toyota-hilux-overland') {
      // -------------------------------------------------------------
      // TOYOTA HILUX OVERLAND EDITION (High clearance, Snorkel, Bullbar)
      // -------------------------------------------------------------
      // Main Lower Body & Cargo Bed
      const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.75, 4.8), bodyMat);
      lowerBody.position.set(0, 1.15, 0);
      lowerBody.castShadow = true;
      group.add(lowerBody);

      // Cabin
      const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.8, 2.5), bodyMat);
      cabin.position.set(0, 1.85, -0.2);
      cabin.castShadow = true;
      group.add(cabin);

      // Windshield & Windows
      const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.65, 2.2), glassMat);
      windshield.position.set(0, 1.87, -0.15);
      group.add(windshield);

      // Heavy Duty Steel Bumper & Winch
      const bullBar = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.45, 0.4), darkPlasticMat);
      bullBar.position.set(0, 0.9, 2.45);
      bullBar.castShadow = true;
      group.add(bullBar);

      // Winch
      const winch = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.5, 16), chromeMat);
      winch.rotation.z = Math.PI / 2;
      winch.position.set(0, 0.9, 2.65);
      group.add(winch);

      // Snorkel on A-Pillar
      const snorkelPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.2, 12), darkPlasticMat);
      snorkelPipe.position.set(1.05, 1.8, 0.8);
      group.add(snorkelPipe);

      // Roof Expedition Rack
      const rack = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 2.0), darkPlasticMat);
      rack.position.set(0, 2.32, -0.2);
      group.add(rack);

      // Heavy Duty 4x4 Wheels
      const wheelPositions = [
        [-1.05, 0.55, 1.5],
        [1.05, 0.55, 1.5],
        [-1.05, 0.55, -1.5],
        [1.05, 0.55, -1.5],
      ];
      wheelPositions.forEach(([x, y, z]) => {
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.42, 24), tireMat);
        tire.rotation.z = Math.PI / 2;
        tire.position.set(x, y, z);
        tire.castShadow = true;
        group.add(tire);

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.44, 16), rimMat);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(x, y, z);
        group.add(rim);
      });

    } else if (vId === 'porsche-911-gt3') {
      // -------------------------------------------------------------
      // PORSCHE 911 GT3 (Low track stance, Swan-neck rear wing)
      // -------------------------------------------------------------
      // Low Sleek Chassis
      const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.55, 4.4), bodyMat);
      body.position.set(0, 0.65, 0);
      body.castShadow = true;
      group.add(body);

      // Streamlined Cockpit
      const cockpit = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.55, 2.2), bodyMat);
      cockpit.position.set(0, 1.12, -0.3);
      cockpit.castShadow = true;
      group.add(cockpit);

      // Curved Glass
      const glass = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.48, 2.0), glassMat);
      glass.position.set(0, 1.14, -0.25);
      group.add(glass);

      // Front Aero Splitter
      const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.08, 0.4), darkPlasticMat);
      splitter.position.set(0, 0.38, 2.2);
      group.add(splitter);

      // GT3 Swan-Neck Rear Wing
      const wing = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.06, 0.45), darkPlasticMat);
      wing.position.set(0, 1.48, -2.1);
      group.add(wing);

      // Wing Struts
      const strutL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.38, 0.1), darkPlasticMat);
      strutL.position.set(-0.6, 1.3, -2.05);
      const strutR = strutL.clone();
      strutR.position.x = 0.6;
      group.add(strutL);
      group.add(strutR);

      // Dual Center Exhaust Tips
      const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16), chromeMat);
      exhaust.rotation.x = Math.PI / 2;
      exhaust.position.set(0, 0.48, -2.25);
      group.add(exhaust);

      // Performance Alloy Wheels
      const wheelPositions = [
        [-1.02, 0.42, 1.35],
        [1.02, 0.42, 1.35],
        [-1.04, 0.42, -1.35],
        [1.04, 0.42, -1.35],
      ];
      wheelPositions.forEach(([x, y, z]) => {
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.34, 24), tireMat);
        tire.rotation.z = Math.PI / 2;
        tire.position.set(x, y, z);
        tire.castShadow = true;
        group.add(tire);

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.36, 16), rimMat);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(x, y, z);
        group.add(rim);
      });

    } else if (vId === 'porsche-macan-turbo') {
      // -------------------------------------------------------------
      // PORSCHE MACAN TURBO (Luxury Performance SUV)
      // -------------------------------------------------------------
      const body = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.75, 4.6), bodyMat);
      body.position.set(0, 0.88, 0);
      body.castShadow = true;
      group.add(body);

      const roof = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.7, 2.6), bodyMat);
      roof.position.set(0, 1.55, -0.2);
      roof.castShadow = true;
      group.add(roof);

      const glass = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.6, 2.45), glassMat);
      glass.position.set(0, 1.56, -0.15);
      group.add(glass);

      // Quad Exhausts
      [-0.6, -0.4, 0.4, 0.6].forEach((exX) => {
        const ex = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 12), chromeMat);
        ex.rotation.x = Math.PI / 2;
        ex.position.set(exX, 0.55, -2.35);
        group.add(ex);
      });

      // Luxury SUV Wheels
      const wheelPositions = [
        [-1.06, 0.48, 1.45],
        [1.06, 0.48, 1.45],
        [-1.06, 0.48, -1.45],
        [1.06, 0.48, -1.45],
      ];
      wheelPositions.forEach(([x, y, z]) => {
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.36, 24), tireMat);
        tire.rotation.z = Math.PI / 2;
        tire.position.set(x, y, z);
        tire.castShadow = true;
        group.add(tire);

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.38, 16), rimMat);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(x, y, z);
        group.add(rim);
      });

    } else {
      // -------------------------------------------------------------
      // SUBARU WRX (Rally sport sedan, Functional Hood Scoop)
      // -------------------------------------------------------------
      const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.65, 4.5), bodyMat);
      body.position.set(0, 0.75, 0);
      body.castShadow = true;
      group.add(body);

      // Functional Hood Scoop
      const hoodScoop = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 0.4), darkPlasticMat);
      hoodScoop.position.set(0, 1.12, 1.1);
      group.add(hoodScoop);

      const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.65, 2.3), bodyMat);
      cabin.position.set(0, 1.35, -0.2);
      cabin.castShadow = true;
      group.add(cabin);

      const glass = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.55, 2.15), glassMat);
      glass.position.set(0, 1.36, -0.15);
      group.add(glass);

      // Rally Rear Wing
      const rallyWing = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.08, 0.35), darkPlasticMat);
      rallyWing.position.set(0, 1.4, -2.15);
      group.add(rallyWing);

      // Sport Wheels
      const wheelPositions = [
        [-1.03, 0.44, 1.4],
        [1.03, 0.44, 1.4],
        [-1.03, 0.44, -1.4],
        [1.03, 0.44, -1.4],
      ];
      wheelPositions.forEach(([x, y, z]) => {
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.34, 24), tireMat);
        tire.rotation.z = Math.PI / 2;
        tire.position.set(x, y, z);
        tire.castShadow = true;
        group.add(tire);

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.36, 16), rimMat);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(x, y, z);
        group.add(rim);
      });
    }

    // Headlight Meshes (Front)
    const hlLeft = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.15, 0.1), headlightMat);
    hlLeft.position.set(-0.7, 0.85, 2.2);
    const hlRight = hlLeft.clone();
    hlRight.position.x = 0.7;
    group.add(hlLeft);
    group.add(hlRight);

    // Taillight Meshes (Rear)
    const tlLeft = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.1), taillightMat);
    tlLeft.position.set(-0.7, 0.85, -2.2);
    const tlRight = tlLeft.clone();
    tlRight.position.x = 0.7;
    group.add(tlLeft);
    group.add(tlRight);

    sceneRef.current.add(group);
    carGroupRef.current = group;
  }, [selectedVehicle, isNightMode]);

  // Update Paint Material in real-time
  useEffect(() => {
    if (!bodyMaterialRef.current) return;
    bodyMaterialRef.current.color.set(selectedColor.hex);

    // Adjust roughness & clearcoat based on PPF selection
    if (selectedPPF.id === 'full_stealth_matte') {
      bodyMaterialRef.current.roughness = 0.45;
      bodyMaterialRef.current.clearcoat = 0.2;
    } else {
      bodyMaterialRef.current.roughness = selectedColor.roughness;
      bodyMaterialRef.current.clearcoat = selectedColor.clearcoat;
    }

    bodyMaterialRef.current.metalness = selectedColor.metalness;
    bodyMaterialRef.current.needsUpdate = true;
  }, [selectedColor, selectedPPF]);

  // Update Glass Material in real-time
  useEffect(() => {
    if (!glassMaterialRef.current) return;
    // Map VLT percentage to transmission
    const transmissionMap: Record<string, number> = {
      clear_70: 0.85,
      medium_35: 0.5,
      dark_20: 0.25,
      limo_05: 0.05,
    };
    glassMaterialRef.current.transmission = transmissionMap[selectedTint.id] ?? 0.5;
    glassMaterialRef.current.needsUpdate = true;
  }, [selectedTint]);

  // Update Lighting in real-time (Day / Night Neon)
  useEffect(() => {
    if (!rimLightsRef.current || !sceneRef.current) return;
    const { cyan, red, ambient } = rimLightsRef.current;

    if (isNightMode) {
      ambient.intensity = 0.25;
      cyan.intensity = 5.5;
      red.intensity = 5.0;
      sceneRef.current.fog = new THREE.FogExp2('#04060A', 0.08);
      headlightsRef.current.forEach((mat) => {
        mat.emissiveIntensity = 2.5;
      });
    } else {
      ambient.intensity = 0.9;
      cyan.intensity = 2.2;
      red.intensity = 2.0;
      sceneRef.current.fog = new THREE.FogExp2('#07090E', 0.05);
      headlightsRef.current.forEach((mat) => {
        mat.emissiveIntensity = 0.4;
      });
    }
  }, [isNightMode]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl shadow-black select-none"
    >
      {/* 3D Canvas Element */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

      {/* Floating Instructions Pill */}
      <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 text-[11px] text-[#94A3B8] backdrop-blur-md pointer-events-none">
        <Rotate3d className="w-4 h-4 text-[#00F0FF] animate-spin" style={{ animationDuration: '8s' }} />
        <span>Arrastra para rotar 360° • Rueda para zoom</span>
      </div>

      {/* Vehicle Category & Model Overlay Badge */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-0.5 pointer-events-none">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#00F0FF]">
          {selectedVehicle.categoryLabel}
        </span>
        <span className="text-lg sm:text-xl font-black text-white drop-shadow-md">
          {selectedVehicle.brand} {selectedVehicle.model}
        </span>
        <span className="text-xs font-semibold text-[#E5B869]">
          {selectedVehicle.edition}
        </span>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#07090E] flex flex-col items-center justify-center gap-3 z-30">
          <Loader2 className="w-8 h-8 text-[#00F0FF] animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
            Iniciando Motor 3D PBR WebGL...
          </span>
        </div>
      )}
    </div>
  );
}

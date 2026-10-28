'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Rotate3d, 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Flame, 
  Layers, 
  Check, 
  Play, 
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Compass,
  Info
} from 'lucide-react';
import { VehicleModel, ColorFinishPreset, PPFProtectionTier, WindowTintTier } from '@/types';
import { CameraPreset } from './StudioHUD';

interface SVStudioCanvasProps {
  selectedVehicle: VehicleModel;
  selectedColor: ColorFinishPreset;
  selectedPPF: PPFProtectionTier;
  selectedTint: WindowTintTier;
  isNightMode: boolean;
  cameraPreset: CameraPreset;
  onSetCameraPreset?: (preset: CameraPreset) => void;
}

// 4 Interactive Inspection Hotspots positioned on vehicle
interface StudioHotspot {
  id: string;
  label: string;
  service: string;
  detail: string;
  preset: CameraPreset;
}

const STUDIO_HOTSPOTS: StudioHotspot[] = [
  {
    id: 'hood',
    label: 'Capó & Zonas de Impacto',
    service: 'PPF Defender Ultra 10mil',
    detail: 'Blindaje auto-regenerativo térmico contra gravilla volcánica y ramas espinosas.',
    preset: 'threeQuarterFront',
  },
  {
    id: 'windshield',
    label: 'Parabrisas & Cristales',
    service: 'Polarizado Nanocerámico 99% UV',
    detail: 'Rechazo térmico infrarrojo de 95% contra la radiación extrema de Arequipa (14+ UV).',
    preset: 'front',
  },
  {
    id: 'wheels',
    label: 'Rines & Calipers Brembo',
    service: 'Sellado Cerámico SV 9H Graphene',
    detail: 'Capa vitrificada hidrofóbica que repele el ferodo de freno y polvo abrasivo a 1200°C.',
    preset: 'side',
  },
  {
    id: 'roof',
    label: 'Techo & Alerón Posterior',
    service: 'PPF Stealth Satin / Clearcoat',
    detail: 'Protección elastomérica contra lluvia ácida, salitre y degradación de barniz.',
    preset: 'top',
  },
];

export default function SVStudioCanvas({
  selectedVehicle,
  selectedColor,
  selectedPPF,
  selectedTint,
  isNightMode,
  cameraPreset,
  onSetCameraPreset,
}: SVStudioCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Three.js internal references
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const shadowPlaneRef = useRef<THREE.Mesh | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);

  // Studio Interactive States
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [currentAngleDegrees, setCurrentAngleDegrees] = useState(45);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [interactionMode, setInteractionMode] = useState<'turntable' | 'orbit'>('turntable');
  const [scratchProgress, setScratchProgress] = useState(0); // 0 = clean, 100 = scratched
  const [isHealing, setIsHealing] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<StudioHotspot | null>(null);

  // Dynamic PBR Material Engine
  const updateMaterials = useCallback(() => {
    if (!carGroupRef.current) return;

    const isMatte = selectedPPF.id === 'full_stealth_matte';
    const bodyColor = new THREE.Color(selectedColor.hex);
    const tintVLT = selectedTint.vltPercentage;
    const glassOpacity = Math.max(0.35, Math.min(0.95, 1 - (tintVLT / 100) * 0.70));
    const glassColor = new THREE.Color(isNightMode ? '#07090E' : '#111622');

    carGroupRef.current.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const meshName = (child.name || '').toLowerCase();
        const matName = (child.material.name || '').toLowerCase();
        const combined = `${meshName} ${matName}`;

        // 1. CAR BODY / PAINT PANELS
        if (
          combined.includes('paint') ||
          combined.includes('carpaint') ||
          combined.includes('body_color') ||
          combined.includes('carroceria') ||
          combined.includes('chasis') ||
          combined.includes('coat') ||
          combined.includes('p918_paint') ||
          combined.includes('plane.002') ||
          combined.includes('plane.003') ||
          combined.includes('plane.004') ||
          combined.includes('boot.001') ||
          combined.includes('boot.002') ||
          combined.includes('boot.005') ||
          combined.includes('boot.008')
        ) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: bodyColor,
            metalness: isMatte ? selectedColor.metalness * 0.65 : selectedColor.metalness,
            roughness: isMatte ? 0.44 : 0.05,
            clearcoat: isMatte ? 0.12 : 1.0,
            clearcoatRoughness: isMatte ? 0.45 : 0.03,
            reflectivity: isMatte ? 0.35 : 1.0,
            toneMapped: true,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }

        // 2. WINDOW GLASS & OPTICS (Nanoceramic VLT)
        else if (
          combined.includes('glass') ||
          combined.includes('window') ||
          combined.includes('cristal') ||
          combined.includes('windshield') ||
          combined.includes('optics') ||
          combined.includes('luna')
        ) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: glassColor,
            transparent: true,
            opacity: glassOpacity,
            roughness: 0.02,
            metalness: 0.1,
            transmission: (tintVLT / 100) * 0.75 + 0.08,
            ior: 1.52,
            reflectivity: 0.8,
            toneMapped: true,
          });
        }

        // 3. WHEELS, RIMS, CHROME & METALLIC DETAILS
        else if (
          combined.includes('wheel') ||
          combined.includes('rim') ||
          combined.includes('silver') ||
          combined.includes('chrome') ||
          combined.includes('metal') ||
          combined.includes('caliper') ||
          combined.includes('brake') ||
          combined.includes('cylinder.000') ||
          combined.includes('cylinder.001')
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(combined.includes('caliper') ? '#FF3823' : 0xdddddd),
            metalness: 0.92,
            roughness: 0.18,
          });
          child.castShadow = true;
        }

        // 4. TIRES (Matte rubber)
        else if (combined.includes('tire') || combined.includes('rubber') || combined.includes('ruedas')) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x1a1a1a),
            roughness: 0.85,
            metalness: 0.05,
          });
        }

        // 5. CARBON FIBER TRIM
        else if (combined.includes('carbon')) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x151515),
            roughness: 0.3,
            metalness: 0.3,
          });
        }
      }
    });
  }, [selectedColor, selectedPPF, selectedTint, isNightMode]);

  // Initialize Three.js scene, camera, RoomEnvironment, floor and lights
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isNightMode ? 0x06080c : 0xf8f9fa);
    scene.fog = new THREE.Fog(isNightMode ? 0x06080c : 0xf8f9fa, 14, 28);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(4.6, 1.8, 4.6); // 3/4 Frontal perspective
    cameraRef.current = camera;

    // 3. Renderer with hardware PBR support
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = isNightMode ? 1.15 : 1.30;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;

      // 4. Photorealistic Studio Environment (RoomEnvironment + PMREMGenerator)
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const roomEnv = new RoomEnvironment();
      scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    } catch {
      setIsLoading(false);
      return;
    }

    // 5. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.0;
    controls.maxDistance = 8.5;
    controls.minPolarAngle = Math.PI / 8;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent looking below floor
    controls.target.set(0, 0.55, 0);
    controlsRef.current = controls;

    // 6. Luxury Softbox Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, isNightMode ? 0.9 : 1.8);
    scene.add(ambientLight);

    // Overhead Key Softbox
    const overheadLight = new THREE.DirectionalLight(0xffffff, isNightMode ? 2.2 : 3.2);
    overheadLight.position.set(5, 9, 5);
    overheadLight.castShadow = true;
    overheadLight.shadow.mapSize.width = 1024;
    overheadLight.shadow.mapSize.height = 1024;
    overheadLight.shadow.camera.near = 0.5;
    overheadLight.shadow.camera.far = 25;
    overheadLight.shadow.bias = -0.0005;
    scene.add(overheadLight);

    // Rim / Backlight for crisp silhouette contours
    const rimLight = new THREE.DirectionalLight(0xffffff, isNightMode ? 1.6 : 1.2);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    // Champagne Fill Light from the side
    const fillLight = new THREE.DirectionalLight(0xe5b869, 0.85);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    // 7. Studio Cyclorama Floor
    const floorGeometry = new THREE.PlaneGeometry(36, 36);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x080b12 : 0xf3f5f7,
      roughness: 0.65,
      metalness: 0.08,
    });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // 8. Ground Contact Shadow Plane (Baked Ambient Occlusion)
    const shadowTexture = new THREE.TextureLoader().load('/models/ferrari_ao.png');
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6.6, 4.4),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        blending: THREE.MultiplyBlending,
        toneMapped: false,
        transparent: true,
        opacity: isNightMode ? 0.85 : 0.65,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.003;
    shadowPlane.renderOrder = 2;
    scene.add(shadowPlane);
    shadowPlaneRef.current = shadowPlane;

    // 9. Precision Studio Turntable Dial Ring
    const dialRingGeometry = new THREE.RingGeometry(2.35, 2.40, 96);
    const dialRingMaterial = new THREE.MeshBasicMaterial({
      color: isNightMode ? 0xc5a059 : 0xcccccc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const dialRing = new THREE.Mesh(dialRingGeometry, dialRingMaterial);
    dialRing.rotation.x = -Math.PI / 2;
    dialRing.position.y = 0.006;
    scene.add(dialRing);

    // 10. Animation Render Loop & Smooth Camera Interpolation
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Smooth Camera Preset Interpolation
      if (targetCamPosRef.current && cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.06);
        if (cameraRef.current.position.distanceTo(targetCamPosRef.current) < 0.05) {
          targetCamPosRef.current = null;
        }
      }

      controls.update();

      // Compute and update compass angle in degrees for the HUD
      const camAngleRad = Math.atan2(camera.position.x, camera.position.z);
      let degrees = Math.round((camAngleRad * 180) / Math.PI);
      if (degrees < 0) degrees += 360;
      setCurrentAngleDegrees(degrees);

      renderer.render(scene, camera);
    };
    animate();

    // 11. Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, [isNightMode]);

  // Load High-Poly 3D Model
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current) return;

    setIsLoading(true);
    setLoadingProgress(10);

    // Remove previous model
    if (carGroupRef.current) {
      sceneRef.current.remove(carGroupRef.current);
      carGroupRef.current = null;
    }

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');
    loader.setDRACOLoader(dracoLoader);

    const rawUrl = selectedVehicle.model3dPath || '/models/g_class_amg.glb';
    const modelUrl = typeof window !== 'undefined' && window.location.origin
      ? `${window.location.origin}${rawUrl}`
      : rawUrl;

    try {
      loader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;

          // Compute exact bounding box
          const box = new THREE.Box3().setFromObject(model);
          const center = new THREE.Vector3();
          box.getCenter(center);
          const size = new THREE.Vector3();
          box.getSize(size);

          // Center model and rest flush on floor (y = 0)
          model.position.x = -center.x;
          model.position.y = -box.min.y;
          model.position.z = -center.z;

          // Normalize car size to standard presentation length (~4.0 units)
          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleFactor = 4.0 / (maxDim || 1);
          model.scale.setScalar(scaleFactor);

          const group = new THREE.Group();
          group.add(model);
          sceneRef.current?.add(group);
          carGroupRef.current = group;

          // Scale shadow plane to match vehicle footprint
          if (shadowPlaneRef.current) {
            shadowPlaneRef.current.scale.set(size.x * scaleFactor * 0.45, size.z * scaleFactor * 0.45, 1);
          }

          // Apply materials
          updateMaterials();
          setLoadingProgress(100);
          setIsLoading(false);
        },
        (xhr) => {
          if (xhr.total > 0) {
            setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
          } else {
            setLoadingProgress(65);
          }
        },
        (error) => {
          console.error('Error loading 3D vehicle model:', error);
          setIsLoading(false);
        }
      );
    } catch {
      setIsLoading(false);
    }

    return () => {
      dracoLoader.dispose();
    };
  }, [selectedVehicle, updateMaterials]);

  // Re-apply materials when paint, PPF, or tint change
  useEffect(() => {
    updateMaterials();
  }, [updateMaterials]);

  // Camera Presets handler with smooth lerp
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const controls = controlsRef.current;

    switch (cameraPreset) {
      case 'threeQuarterFront':
        targetCamPosRef.current = new THREE.Vector3(4.6, 1.8, 4.6);
        break;
      case 'side':
        targetCamPosRef.current = new THREE.Vector3(5.6, 1.3, 0.0);
        break;
      case 'threeQuarterRear':
        targetCamPosRef.current = new THREE.Vector3(-4.6, 1.8, -4.6);
        break;
      case 'front':
        targetCamPosRef.current = new THREE.Vector3(0.0, 1.3, 5.6);
        break;
      case 'top':
        targetCamPosRef.current = new THREE.Vector3(0.1, 6.2, 0.1);
        break;
    }
    controls.target.set(0, 0.55, 0);
  }, [cameraPreset]);

  // Turntable vs Free Orbit Mode Toggle
  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;

    if (interactionMode === 'turntable') {
      controls.minPolarAngle = Math.PI / 2.7;
      controls.maxPolarAngle = Math.PI / 2.15; // Lock camera to eye-level horizontal turntable ring
    } else {
      controls.minPolarAngle = Math.PI / 8;
      controls.maxPolarAngle = Math.PI / 2.05; // Free 3D orbital inspection
    }
  }, [interactionMode]);

  // Handle Auto-Rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
      controlsRef.current.autoRotateSpeed = 2.2;
    }
  }, [isAutoRotating]);

  // Handle Zoom In/Out
  const toggleZoom = () => {
    if (!cameraRef.current) return;
    const newZoom = zoomLevel === 1 ? 1.45 : 1;
    setZoomLevel(newZoom);
    if (newZoom > 1) {
      targetCamPosRef.current = new THREE.Vector3(3.2, 1.3, 3.2);
    } else {
      targetCamPosRef.current = new THREE.Vector3(4.6, 1.8, 4.6);
    }
  };

  // Scratch and thermal healing simulation
  const handleApplyScratch = () => {
    setScratchProgress(100);
  };

  const handleApplyHeat = () => {
    setIsHealing(true);
    let current = 100;
    const interval = setInterval(() => {
      current -= 5;
      if (current <= 0) {
        clearInterval(interval);
        setScratchProgress(0);
        setIsHealing(false);
      } else {
        setScratchProgress(current);
      }
    }, 45);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[540px] sm:h-[620px] lg:h-[680px] rounded-3xl overflow-hidden select-none shadow-2xl transition-all duration-700 border ${
        isNightMode 
          ? 'bg-[#06080C] border-white/10 shadow-black' 
          : 'bg-gradient-to-b from-[#FFFFFF] via-[#F8F9FA] to-[#E9ECEF] border-neutral-200'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing outline-none"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md transition-opacity">
          <div className="w-14 h-14 rounded-full border-2 border-white/20 border-t-[#C5A059] animate-spin mb-4" />
          <span className="text-sm font-black text-white uppercase tracking-widest">
            Optimizando Chasis 3D CAD... {loadingProgress}%
          </span>
          <span className="text-xs text-[#94A3B8] mt-1 font-mono">
            {selectedVehicle.brand} {selectedVehicle.model} • PBR Clearcoat Shaders
          </span>
        </div>
      )}

      {/* Top Left Floating Controls */}
      <div className="absolute top-5 left-5 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
        
        {/* Interaction Badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
          isNightMode 
            ? 'bg-black/75 text-white/90 border-white/15' 
            : 'bg-white/90 text-neutral-800 border-neutral-300 shadow-sm'
        }`}>
          <Rotate3d className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: '8s' }} />
          <span>Arrastra 360° para rotar • Zoom con rueda</span>
        </div>

        {/* Compass Angle Degree Badge */}
        <div className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold backdrop-blur-md border ${
          isNightMode ? 'bg-black/60 text-[#C5A059] border-white/10' : 'bg-white/80 text-neutral-800 border-neutral-200'
        }`}>
          <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{currentAngleDegrees}°</span>
        </div>

        {/* Hotspots Info Badge */}
        <div className="pointer-events-auto">
          {activeHotspot && (
            <div className="mt-2 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-[#C5A059]/40 text-white max-w-xs shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">{activeHotspot.label}</span>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="text-white/60 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs font-bold text-white mb-0.5">{activeHotspot.service}</p>
              <p className="text-[11px] text-[#94A3B8] leading-tight">{activeHotspot.detail}</p>
            </div>
          )}
        </div>
      </div>

      {/* Top Right Toolset: Mode Toggle, Zoom, Auto-Rotate & Scratch Simulator */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        
        {/* Turntable vs Orbit Mode Toggle */}
        <button
          type="button"
          onClick={() => setInteractionMode(interactionMode === 'turntable' ? 'orbit' : 'turntable')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border transition-all cursor-pointer ${
            interactionMode === 'turntable'
              ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-md'
              : isNightMode
                ? 'bg-black/60 text-white/80 border-white/10 hover:text-white'
                : 'bg-white/80 text-neutral-700 border-neutral-200 hover:text-black shadow-sm'
          }`}
          title="Alternar entre modo Turntable y Órbita Libre"
        >
          {interactionMode === 'turntable' ? 'Modo Turntable 360°' : 'Órbita Libre 3D'}
        </button>

        {/* Zoom Toggle */}
        <button
          type="button"
          onClick={toggleZoom}
          className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
            zoomLevel > 1
              ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-md'
              : isNightMode
                ? 'bg-black/60 text-white/80 border-white/10 hover:text-white'
                : 'bg-white/80 text-neutral-700 border-neutral-200 hover:text-black shadow-sm'
          }`}
          title={zoomLevel > 1 ? 'Alejar zoom' : 'Acercar lupa de inspección (1.5x)'}
        >
          {zoomLevel > 1 ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
        </button>

        {/* Auto-Rotate Turntable Toggle */}
        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer ${
            isAutoRotating
              ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-md'
              : isNightMode
                ? 'bg-black/60 text-white/80 border-white/10 hover:text-white'
                : 'bg-white/80 text-neutral-700 border-neutral-200 hover:text-black shadow-sm'
          }`}
          title="Activar giro continuo de salón"
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span className="hidden sm:inline">{isAutoRotating ? 'Pausar' : 'Giro 360°'}</span>
        </button>

        {/* Scratch & Heal Thermal Simulator */}
        {scratchProgress === 0 ? (
          <button
            type="button"
            onClick={handleApplyScratch}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
              isNightMode 
                ? 'bg-black/60 text-white/70 border-white/10 hover:text-white' 
                : 'bg-white/80 text-neutral-600 border-neutral-200 hover:text-black shadow-sm'
            }`}
          >
            <span>Simular Raya</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApplyHeat}
            disabled={isHealing}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FF3823] hover:bg-[#ff5542] text-white shadow-lg shadow-[#FF3823]/30 transition-all cursor-pointer active:scale-95 animate-pulse"
          >
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>{isHealing ? 'Curando...' : 'Aplicar Calor'}</span>
          </button>
        )}
      </div>

      {/* Interactive Hotspot Inspection Buttons (Bottom Center) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
        {STUDIO_HOTSPOTS.map((hotspot) => (
          <button
            key={hotspot.id}
            type="button"
            onClick={() => {
              setActiveHotspot(hotspot);
              if (onSetCameraPreset) onSetCameraPreset(hotspot.preset);
            }}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              activeHotspot?.id === hotspot.id
                ? 'bg-[#C5A059] text-black font-bold shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {hotspot.label}
          </button>
        ))}
      </div>

      {/* Interactive Micro-Scratch Overlay when testing PPF Self-Healing */}
      {scratchProgress > 0 && (
        <div className="absolute inset-0 pointer-events-none z-15 flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            {/* Scratched Line on Vehicle Paint */}
            <div 
              className="w-56 sm:w-72 h-1.5 bg-white/95 rounded-full blur-[0.8px] rotate-[-22deg] transition-all duration-300"
              style={{ 
                opacity: scratchProgress / 100,
                boxShadow: isHealing 
                  ? '0 0 16px rgba(255, 56, 35, 0.9), 0 0 32px rgba(255, 120, 0, 0.8)' 
                  : '0 0 12px rgba(255, 255, 255, 0.8), 0 0 24px rgba(255, 56, 35, 0.4)'
              }}
            />
            {/* Heat Wave when Healing */}
            {isHealing && (
              <span className="mt-4 px-3 py-1 rounded-full bg-[#FF3823] text-white text-[11px] font-bold tracking-wider animate-bounce shadow-lg">
                AUTORREGENERANDO POLÍMERO ELASTOMÉRICO 10 MIL ({scratchProgress}%)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bottom Left Vehicle Identification */}
      <div className="absolute bottom-5 left-5 z-20 pointer-events-none">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block">
          {selectedVehicle.categoryLabel}
        </span>
        <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isNightMode ? 'text-white' : 'text-neutral-900'}`}>
          {selectedVehicle.brand} {selectedVehicle.model}
        </h3>
        <span className="text-xs text-[#C5A059] font-medium">
          {selectedVehicle.edition} • {selectedColor.name}
        </span>
      </div>

      {/* Bottom Right Detailing Badge */}
      <div className="absolute bottom-5 right-5 z-20 pointer-events-none hidden sm:flex items-center gap-2">
        <div className={`px-3 py-1.5 rounded-xl text-[11px] font-bold backdrop-blur-md border ${
          isNightMode 
            ? 'bg-black/75 text-white/90 border-white/10' 
            : 'bg-white/90 text-neutral-800 border-neutral-200 shadow-sm'
        }`}>
          <span className="inline-block w-2 h-2 rounded-full mr-1.5 bg-[#C5A059]" />
          {selectedPPF.name}
          <span className="block text-[10px] font-normal text-[#94A3B8]">
            Lunas: {selectedTint.name} (VLT {selectedTint.vltPercentage}%)
          </span>
        </div>
      </div>

    </div>
  );
}

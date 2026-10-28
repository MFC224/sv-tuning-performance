'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
  Maximize2,
  RefreshCw
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

  // Three.js internal references
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Studio Interactive States
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0); // 0 = clean, 100 = scratched
  const [isHealing, setIsHealing] = useState(false);

  // Apply PBR materials dynamically to car body and glass
  const updateMaterials = useCallback(() => {
    if (!carGroupRef.current) return;

    const isMatte = selectedPPF.id === 'full_stealth_matte';
    const bodyColor = new THREE.Color(selectedColor.hex);

    carGroupRef.current.traverse((child: any) => {
      if (child.isMesh) {
        const meshName = (child.name || '').toLowerCase();
        const matName = (child.material?.name || '').toLowerCase();
        const combined = `${meshName} ${matName}`;

        // Car Body / Paint parts
        if (
          combined.includes('body') ||
          combined.includes('pickup') ||
          combined.includes('sport') ||
          combined.includes('compact') ||
          combined.includes('paint') ||
          combined.includes('carroceria') ||
          combined.includes('chassis') ||
          combined.includes('hood') ||
          combined.includes('door')
        ) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: bodyColor,
            metalness: selectedColor.metalness,
            roughness: isMatte ? 0.42 : 0.08,
            clearcoat: isMatte ? 0.15 : 1.0,
            clearcoatRoughness: isMatte ? 0.4 : 0.05,
            reflectivity: 0.9,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }

        // Window / Glass parts
        else if (
          combined.includes('glass') ||
          combined.includes('optics') ||
          combined.includes('window') ||
          combined.includes('luna')
        ) {
          const tintVLT = selectedTint.vltPercentage;
          const glassOpacity = Math.max(0.40, Math.min(0.94, 1 - (tintVLT / 100) * 0.70));
          
          child.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(isNightMode ? '#0A0D14' : '#141822'),
            transparent: true,
            opacity: glassOpacity,
            roughness: 0.05,
            metalness: 0.1,
            transmission: tintVLT > 50 ? 0.5 : 0.15,
            ior: 1.52,
          });
        }
      }
    });
  }, [selectedColor, selectedPPF, selectedTint, isNightMode]);

  // Initialize Three.js scene, camera, lights, floor, and controls
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isNightMode ? 0x07090e : 0xf8f9fa);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.5, 2.0, 5.0); // 3/4 front luxury perspective
    cameraRef.current = camera;

    // 3. Renderer with graceful WebGL fallback for test/unsupported environments
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
      renderer.toneMappingExposure = isNightMode ? 1.15 : 1.35;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;
    } catch {
      // JSDOM or environments without WebGL hardware support
      setIsLoading(false);
      return;
    }

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.2;
    controls.maxDistance = 8.5;
    controls.minPolarAngle = Math.PI / 8;
    controls.maxPolarAngle = Math.PI / 2.02; // Clamp to avoid looking underneath the floor
    controls.target.set(0, 0.6, 0);
    controlsRef.current = controls;

    // 5. Lighting Setup (Softbox Studio Rig)
    const ambientLight = new THREE.AmbientLight(0xffffff, isNightMode ? 0.8 : 1.8);
    scene.add(ambientLight);

    // Overhead Key Softbox
    const keyLight = new THREE.DirectionalLight(0xffffff, isNightMode ? 2.0 : 3.0);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Rim / Backlight for crisp body contours
    const rimLight = new THREE.DirectionalLight(0xffffff, isNightMode ? 1.8 : 1.2);
    rimLight.position.set(-6, 4, -5);
    scene.add(rimLight);

    // Warm Champagne Fill Light from the side
    const fillLight = new THREE.DirectionalLight(0xe5b869, 0.8);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    // 6. Studio Floor with radial contact shadow
    const floorGeometry = new THREE.PlaneGeometry(24, 24);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x080b12 : 0xf1f3f5,
      roughness: 0.6,
      metalness: 0.1,
    });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Subtle Ground Ring / Pedestal
    const ringGeometry = new THREE.RingGeometry(2.4, 2.45, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: isNightMode ? 0xc5a059 : 0xcccccc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.005;
    scene.add(ringMesh);

    // 7. Animation Render Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
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

  // Load the 3D model whenever selectedVehicle changes
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current) return;

    setIsLoading(true);

    // Clear previous vehicle
    if (carGroupRef.current) {
      sceneRef.current.remove(carGroupRef.current);
      carGroupRef.current = null;
    }

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');
    loader.setDRACOLoader(dracoLoader);

    // Determine model path based on vehicle
    const rawUrl = selectedVehicle.model3dPath || '/models/pickup.glb';
    const modelUrl = typeof window !== 'undefined' && window.location.origin
      ? `${window.location.origin}${rawUrl}`
      : rawUrl;

    try {
      loader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;

          // Auto-compute bounding box to center & scale car on floor
          const box = new THREE.Box3().setFromObject(model);
          const center = new THREE.Vector3();
          box.getCenter(center);
          const size = new THREE.Vector3();
          box.getSize(size);

          // Normalize car position to sit on floor (y = 0)
          model.position.x = -center.x;
          model.position.y = -box.min.y;
          model.position.z = -center.z;

          // Scale model to a standard luxury presentation length (~3.8 units)
          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleFactor = 3.8 / (maxDim || 1);
          model.scale.setScalar(scaleFactor);

          const group = new THREE.Group();
          group.add(model);
          sceneRef.current?.add(group);
          carGroupRef.current = group;

          // Apply chosen paint color, PPF gloss/matte finish, and window tints
          updateMaterials();
          setIsLoading(false);
        },
        undefined,
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

  // Re-apply materials when paint/PPF/tint changes
  useEffect(() => {
    updateMaterials();
  }, [updateMaterials]);

  // Handle Camera Presets
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    switch (cameraPreset) {
      case 'threeQuarterFront':
        camera.position.set(4.5, 2.0, 4.8);
        break;
      case 'side':
        camera.position.set(5.5, 1.4, 0.0);
        break;
      case 'threeQuarterRear':
        camera.position.set(-4.5, 1.9, -4.8);
        break;
      case 'front':
        camera.position.set(0.0, 1.4, 5.5);
        break;
      case 'top':
        camera.position.set(0.0, 6.0, 0.1);
        break;
    }
    controls.target.set(0, 0.6, 0);
    controls.update();
  }, [cameraPreset]);

  // Handle Auto-Rotate toggle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
      controlsRef.current.autoRotateSpeed = 2.0;
    }
  }, [isAutoRotating]);

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
    }, 50);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[520px] sm:h-[600px] lg:h-[660px] rounded-3xl overflow-hidden select-none shadow-2xl transition-all duration-700 border ${
        isNightMode 
          ? 'bg-[#07090E] border-white/10 shadow-black' 
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
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-opacity">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-[#C5A059] animate-spin mb-3" />
          <span className="text-xs font-bold text-white uppercase tracking-widest">
            Cargando Chasis 3D...
          </span>
          <span className="text-[11px] text-[#94A3B8] mt-1">
            Optimizando PBR Shaders y Geometría
          </span>
        </div>
      )}

      {/* Floating Interactive Controls (Top Left & Top Right) */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2 pointer-events-none">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
          isNightMode 
            ? 'bg-black/75 text-white/90 border-white/15' 
            : 'bg-white/90 text-neutral-800 border-neutral-300 shadow-sm'
        }`}>
          <Rotate3d className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Arrastra para rotar 360° • Zoom con rueda</span>
        </div>
      </div>

      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
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
          title="Activar giro automático de exhibición"
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span className="hidden sm:inline">{isAutoRotating ? 'Pausar Giro' : 'Giro 360°'}</span>
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
            <span>Simular Raya en Barniz</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApplyHeat}
            disabled={isHealing}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FF3823] hover:bg-[#ff5542] text-white shadow-lg shadow-[#FF3823]/30 transition-all cursor-pointer active:scale-95 animate-pulse"
          >
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>{isHealing ? 'Curando...' : 'Aplicar Calor Térmico'}</span>
          </button>
        )}
      </div>

      {/* Interactive Micro-Scratch Overlay when testing PPF Self-Healing */}
      {scratchProgress > 0 && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div 
            className="w-48 sm:w-64 h-1.5 bg-white/90 rounded-full blur-[1px] rotate-[-25deg] shadow-lg transition-opacity duration-300"
            style={{ 
              opacity: scratchProgress / 100,
              boxShadow: '0 0 12px rgba(255, 255, 255, 0.8), 0 0 24px rgba(255, 56, 35, 0.4)'
            }}
          />
        </div>
      )}

      {/* Bottom Status Cards */}
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

      <div className="absolute bottom-5 right-5 z-20 pointer-events-none hidden sm:flex items-center gap-2">
        <div className={`px-3 py-1.5 rounded-xl text-[11px] font-bold backdrop-blur-md border ${
          isNightMode 
            ? 'bg-black/75 text-white/90 border-white/10' 
            : 'bg-white/90 text-neutral-800 border-neutral-200 shadow-sm'
        }`}>
          <span className="inline-block w-2 h-2 rounded-full mr-1.5 bg-[#C5A059]" />
          {selectedPPF.name}
          <span className="block text-[10px] font-normal text-[#94A3B8]">
            Polarizado: {selectedTint.name}
          </span>
        </div>
      </div>

    </div>
  );
}

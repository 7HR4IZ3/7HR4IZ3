"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Color, Group, MathUtils, SRGBColorSpace } from "three";
import { featuredProjectEvidence, featuredProjects } from "@/content/projects";
import type { ScrollSignal } from "@/components/scroll-signal";
import { CartographyPoster } from "@/components/cartography-poster";

const ORANGE = "#ef5b2a";
const OLIVE = "#8a8c70";
const BONE = "#d9d2c4";
const GRAPHITE = "#151512";

const nodePositions = [
  [-2.18, 0.56, -0.15],
  [-0.72, 1.02, -0.35],
  [1.15, 0.88, -0.1],
  [2.16, -0.14, -0.2],
  [0.76, -1.02, -0.34],
  [-1.3, -0.84, -0.18],
] as const;

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 5], [1, 4],
] as const;

const evidenceScreens = featuredProjectEvidence.map((media, index) => ({
  ...media,
  title: featuredProjects[index]?.title ?? media.slug,
  aspect: media.width / media.height,
  portrait: media.height > media.width,
}));

function SignalNode({
  index,
  active,
  groupRef,
}: {
  index: number;
  active: boolean;
  groupRef: (node: Group | null) => void;
}) {
  const screen = evidenceScreens[index];
  const texture = useTexture(screen.src);
  const displayTexture = useMemo(() => {
    const copy = texture.clone();
    copy.colorSpace = SRGBColorSpace;
    copy.anisotropy = 4;
    copy.needsUpdate = true;
    return copy;
  }, [texture]);
  useEffect(() => () => displayTexture.dispose(), [displayTexture]);

  const height = screen.portrait ? 1.72 : 1.18;
  const width = height * screen.aspect;
  const frameWidth = width + 0.1;
  const frameHeight = height + 0.1;

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -0.06]} castShadow>
        <boxGeometry args={[frameWidth + 0.12, frameHeight + 0.12, 0.12]} />
        <meshStandardMaterial color={GRAPHITE} metalness={0.78} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={displayTexture} toneMapped={false} />
      </mesh>
      <mesh position={[0, -frameHeight / 2 - 0.08, 0.02]}>
        <boxGeometry args={[frameWidth * 0.56, 0.025, 0.025]} />
        <meshBasicMaterial color={active ? ORANGE : OLIVE} />
      </mesh>
      <mesh position={[frameWidth / 2 + 0.08, 0, 0.02]}>
        <boxGeometry args={[0.025, frameHeight * 0.52, 0.025]} />
        <meshBasicMaterial color={active ? ORANGE : OLIVE} />
      </mesh>
    </group>
  );
}

function SignalField({ progress }: { progress: ScrollSignal }) {
  const root = useRef<Group>(null);
  const nodes = useRef<Group[]>([]);
  const activeRef = useRef(-2);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useFrame((state, delta) => {
    if (!root.current) return;
    const value = reducedMotion ? 0.2 : progress.get();
    const chapter = Math.min(8, Math.max(0, Math.floor(value * 9)));
    const active = chapter >= 2 && chapter <= 7 ? chapter - 2 : -1;
    if (activeRef.current !== active) {
      activeRef.current = active;
      setActiveIndex(active);
    }
    const spawned = chapter > 0;
    const elapsed = state.clock.getElapsedTime();

    root.current.rotation.x = MathUtils.damp(root.current.rotation.x, state.pointer.y * 0.035, 2.6, delta);
    root.current.rotation.y = MathUtils.damp(root.current.rotation.y, state.pointer.x * 0.08 + (reducedMotion ? 0 : Math.sin(elapsed * 0.16) * 0.018), 2.6, delta);
    root.current.rotation.z = MathUtils.damp(root.current.rotation.z, reducedMotion ? 0 : Math.sin(elapsed * 0.11) * 0.008, 2, delta);
    const fieldOffsetX = state.viewport.width < 5 ? 1.35 : active >= 0 ? 1.12 : 1.25;
    root.current.position.x = MathUtils.damp(root.current.position.x, fieldOffsetX, 2.2, delta);

    nodes.current.forEach((node, index) => {
      if (!node) return;
      const base = nodePositions[index];
      const isActive = active === index;
      const focusX = isActive ? 0.05 : base[0] * (spawned ? 1.02 : 0.52);
      const focusY = isActive ? 0.02 : base[1] * (spawned ? 1.02 : 0.52);
      const focusZ = isActive ? 1.03 : base[2] - (active >= 0 ? 0.15 : 0);
      const targetScale = isActive ? 1.3 : active >= 0 ? 0.75 : spawned ? 0.9 : 0.72;
      node.position.x = MathUtils.damp(node.position.x, focusX, 3.8, delta);
      node.position.y = MathUtils.damp(node.position.y, focusY, 3.8, delta);
      node.position.z = MathUtils.damp(node.position.z, focusZ, 3.8, delta);
      node.rotation.z = MathUtils.damp(node.rotation.z, isActive ? -0.025 : base[0] * 0.025, 3.4, delta);
      node.scale.setScalar(MathUtils.damp(node.scale.x, targetScale, 3.5, delta));
    });

    state.camera.position.x = MathUtils.damp(state.camera.position.x, active >= 0 ? 0.12 : 0, 2.2, delta);
    state.camera.position.y = MathUtils.damp(state.camera.position.y, active >= 0 ? 0.05 : 0.1, 2.2, delta);
    state.camera.position.z = MathUtils.damp(state.camera.position.z, active >= 0 ? 6.8 : 7.35, 2.2, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={root}>
      <mesh position={[0, 0, -0.48]} receiveShadow>
        <boxGeometry args={[5.6, 3.8, 0.05]} />
        <meshStandardMaterial color="#0d0d0b" roughness={0.88} metalness={0.12} />
      </mesh>
      {connections.map(([from, to]) => (
        <Line
          key={`${from}-${to}`}
          points={[nodePositions[from], nodePositions[to]]}
          color={activeIndex === from || activeIndex === to ? ORANGE : OLIVE}
          lineWidth={activeIndex === from || activeIndex === to ? 1.4 : 0.7}
          transparent
          opacity={activeIndex >= 0 && activeIndex !== from && activeIndex !== to ? 0.28 : 0.72}
        />
      ))}
      {nodePositions.map(([x, y, z], index) => (
        <mesh key={`anchor-${index}`} position={[x, y, z - 0.04]}>
          <sphereGeometry args={[index === activeIndex ? 0.045 : 0.028, 10, 10]} />
          <meshBasicMaterial color={index === activeIndex ? ORANGE : BONE} />
        </mesh>
      ))}
      <Suspense fallback={null}>
        {evidenceScreens.map((screen, index) => (
          <SignalNode
            key={screen.src}
            index={index}
            active={index === activeIndex}
            groupRef={(node) => { if (node) nodes.current[index] = node; }}
          />
        ))}
      </Suspense>
    </group>
  );
}

export function SignalCartography({ progress }: { progress: ScrollSignal }) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0.1, 7.35], fov: 36 }}
      dpr={[1, 1.45]}
      fallback={<CartographyPoster />}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[new Color("#10100e")]} />
      <fog attach="fog" args={["#10100e", 7, 12]} />
      <ambientLight intensity={1.35} color="#d9d2c4" />
      <directionalLight position={[3, 4, 5]} intensity={2.8} color="#f4ead8" />
      <pointLight position={[-3, 1, 3]} intensity={9} distance={7} color={ORANGE} />
      <SignalField progress={progress} />
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.16} enableDamping dampingFactor={0.08} />
    </Canvas>
  );
}

"use client";

import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Color, Group, MathUtils, Mesh, SRGBColorSpace } from "three";
import { MachinePoster } from "@/components/machine-poster";
import type { ScrollSignal } from "@/components/scroll-signal";
import { featuredProjectEvidence } from "@/content/projects";

const ORANGE = "#ef5b2a";
const BONE = "#d9d2c4";
const OLIVE = "#777963";
const METAL = "#272720";
const DARK = "#12120f";
const evidenceScreens = featuredProjectEvidence.map((media) => ({
  ...media,
  aspect: media.width / media.height,
  portrait: media.height > media.width,
}));
const slots = [
  [-1.58, 0.78], [1.58, 0.78],
  [-1.58, 0], [1.58, 0],
  [-1.58, -0.78], [1.58, -0.78],
] as const;

function Material({ active = false, olive = false }: { active?: boolean; olive?: boolean }) {
  return <meshStandardMaterial color={active ? ORANGE : olive ? OLIVE : METAL} roughness={0.46} metalness={0.72} />;
}

function KaizenModule() {
  return (
    <group>
      <mesh position={[0, 0, 0.2]}><boxGeometry args={[0.35, 0.5, 0.08]} /><Material /></mesh>
      {[0, 1, 2].map((layer) => (
        <mesh key={layer} position={[(layer - 1) * 0.2, 0, 0.3 + layer * 0.08]}>
          <boxGeometry args={[0.15, 0.42, 0.035]} /><Material active={layer === 1} />
        </mesh>
      ))}
      {[0, 1, 2, 3].map((line) => (
        <mesh key={line} position={[-0.05 + (line % 2) * 0.08, 0.14 - line * 0.08, 0.45]}>
          <boxGeometry args={[0.16 - (line % 2) * 0.05, 0.018, 0.012]} /><meshBasicMaterial color={line === 0 ? ORANGE : BONE} />
        </mesh>
      ))}
    </group>
  );
}

function SnapshotModule() {
  return (
    <group>
      {[-0.24, 0, 0.24].map((x, index) => (
        <group key={x} position={[x, 0, 0.3]}>
          <mesh><boxGeometry args={[0.14, 0.46, 0.06]} /><Material active={index === 1} /></mesh>
          {[0.14, 0, -0.14].map((y) => <mesh key={y} position={[0, y, 0.06]}><boxGeometry args={[0.2, 0.025, 0.025]} /><meshBasicMaterial color={BONE} /></mesh>)}
        </group>
      ))}
      <mesh position={[0, -0.31, 0.3]}><boxGeometry args={[0.65, 0.035, 0.035]} /><meshBasicMaterial color={ORANGE} /></mesh>
    </group>
  );
}

function VrmacModule() {
  return (
    <group>
      <mesh position={[-0.22, 0, 0.28]} rotation={[0, 0.14, 0]}><boxGeometry args={[0.34, 0.46, 0.05]} /><Material /></mesh>
      <mesh position={[0.22, 0.02, 0.42]} rotation={[0, -0.2, 0]}><boxGeometry args={[0.46, 0.3, 0.035]} /><Material active /></mesh>
      <mesh position={[0, 0, 0.35]}><boxGeometry args={[0.36, 0.018, 0.018]} /><meshBasicMaterial color={BONE} /></mesh>
      <mesh position={[0.22, -0.22, 0.38]}><boxGeometry args={[0.5, 0.025, 0.025]} /><meshBasicMaterial color={OLIVE} /></mesh>
    </group>
  );
}

function MotionModule() {
  return (
    <group>
      <mesh position={[0, 0, 0.22]}><boxGeometry args={[0.38, 0.55, 0.06]} /><Material /></mesh>
      {[-1, 1].flatMap((side) => [0.16, 0.05, -0.06, -0.17].map((y, index) => (
        <mesh key={`${side}-${y}`} position={[side * (0.12 + (index % 2) * 0.03), y, 0.28]}>
          <sphereGeometry args={[0.025 + index * 0.004, 10, 10]} /><meshBasicMaterial color={index < 2 ? ORANGE : BONE} />
        </mesh>
      )))}
    </group>
  );
}

function AnnotateModule() {
  return (
    <group>
      <mesh position={[0, 0, 0.22]}><boxGeometry args={[0.68, 0.43, 0.05]} /><Material /></mesh>
      <mesh position={[-0.08, 0.02, 0.28]}><boxGeometry args={[0.3, 0.18, 0.025]} /><meshBasicMaterial color={OLIVE} wireframe /></mesh>
      <mesh position={[0.19, 0.13, 0.32]} rotation={[0, 0, -0.5]}><coneGeometry args={[0.07, 0.22, 3]} /><meshBasicMaterial color={ORANGE} /></mesh>
      <mesh position={[0.23, -0.13, 0.34]}><boxGeometry args={[0.18, 0.07, 0.04]} /><meshBasicMaterial color={BONE} /></mesh>
    </group>
  );
}

function StackjetModule() {
  return (
    <group>
      <mesh position={[-0.25, 0, 0.24]}><boxGeometry args={[0.24, 0.38, 0.08]} /><Material /></mesh>
      <mesh position={[0.28, 0, 0.24]}><boxGeometry args={[0.28, 0.45, 0.12]} /><Material olive /></mesh>
      <mesh position={[0.02, 0, 0.34]}><boxGeometry args={[0.25, 0.04, 0.04]} /><meshBasicMaterial color={ORANGE} /></mesh>
      <mesh position={[0.02, 0, 0.39]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.07, 0.15, 3]} /><meshBasicMaterial color={ORANGE} /></mesh>
    </group>
  );
}

const modules = [KaizenModule, SnapshotModule, VrmacModule, MotionModule, AnnotateModule, StackjetModule];

function MechanicalGrip({ frameWidth, frameHeight }: { frameWidth: number; frameHeight: number }) {
  const baseY = -frameHeight / 2 - 0.34;
  return (
    <group position={[0, 0, -0.09]}>
      <mesh position={[0, baseY - 0.15, 0]} castShadow>
        <boxGeometry args={[frameWidth + 0.9, 0.16, 0.24]} />
        <meshStandardMaterial color="#1b1b17" metalness={0.82} roughness={0.34} />
      </mesh>
      <mesh position={[0, baseY - 0.02, 0.06]} castShadow>
        <boxGeometry args={[0.76, 0.3, 0.34]} />
        <Material active />
      </mesh>
      <mesh position={[0, baseY + 0.02, 0.25]}>
        <boxGeometry args={[0.42, 0.08, 0.06]} />
        <meshBasicMaterial color={DARK} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * (frameWidth / 2 + 0.34), baseY + 0.14, 0.03]} rotation={[0, 0, side * 0.34]} castShadow>
            <boxGeometry args={[0.14, 0.7, 0.18]} />
            <Material olive />
          </mesh>
          <mesh position={[side * (frameWidth / 2 + 0.34), baseY - 0.12, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.12, 14]} />
            <Material active />
          </mesh>
          <mesh position={[side * (frameWidth / 2 + 0.16), baseY + 0.58, 0.05]} rotation={[0, 0, side * 0.48]} castShadow>
            <boxGeometry args={[0.12, 0.48, 0.16]} />
            <Material />
          </mesh>
          <mesh position={[side * (frameWidth / 2 + 0.08), -frameHeight / 2 + 0.3, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.1, 14]} />
            <meshStandardMaterial color="#bd7046" metalness={0.9} roughness={0.22} />
          </mesh>
          <mesh position={[side * (frameWidth / 2 + 0.055), -frameHeight / 2 + 0.48, 0.13]}>
            <boxGeometry args={[0.13, 0.34, 0.2]} />
            <meshStandardMaterial color="#313129" metalness={0.8} roughness={0.36} />
          </mesh>
          <mesh position={[side * (frameWidth / 2 - 0.01), -frameHeight / 2 + 0.62, 0.17]} rotation={[0, 0, side * 0.18]}>
            <boxGeometry args={[0.09, 0.22, 0.12]} />
            <Material active />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function EvidenceScreen({ index, groupRef }: { index: number; groupRef: (node: Group | null) => void }) {
  const spec = evidenceScreens[index];
  const texture = useTexture(spec.src);
  const displayTexture = useMemo(() => {
    const copy = texture.clone();
    copy.colorSpace = SRGBColorSpace;
    copy.anisotropy = 4;
    copy.needsUpdate = true;
    return copy;
  }, [texture]);
  useEffect(() => () => displayTexture.dispose(), [displayTexture]);

  const height = spec.portrait ? 2.15 : 1.64;
  const width = height * spec.aspect;
  const frameWidth = width + 0.2;
  const frameHeight = height + 0.2;

  return (
    <group ref={groupRef} visible={false}>
      <MechanicalGrip frameWidth={frameWidth} frameHeight={frameHeight} />
      <mesh castShadow receiveShadow>
        <boxGeometry args={[frameWidth + 0.16, frameHeight + 0.16, 0.14]} />
        <meshStandardMaterial color="#22221d" metalness={0.78} roughness={0.38} />
      </mesh>
      <mesh position={[0, 0, 0.079]}>
        <planeGeometry args={[frameWidth, frameHeight]} />
        <meshBasicMaterial color={BONE} />
      </mesh>
      <mesh position={[0, 0, 0.088]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={displayTexture} toneMapped={false} />
      </mesh>
      {[-1, 1].flatMap((x) => [-1, 1].map((y) => (
        <mesh key={`${x}-${y}`} position={[x * (frameWidth / 2 + 0.035), y * (frameHeight / 2 + 0.035), 0.11]}>
          <boxGeometry args={[0.09, 0.09, 0.035]} />
          <meshStandardMaterial color="#bd7046" metalness={0.9} roughness={0.22} />
        </mesh>
      )))}
      <mesh position={[frameWidth / 2 + 0.11, 0, -0.025]}>
        <boxGeometry args={[0.055, frameHeight * 0.76, 0.055]} />
        <Material active />
      </mesh>
      {[-0.2, 0, 0.2].map((y, marker) => (
        <mesh key={y} position={[-frameWidth / 2 - 0.11, y, 0.02]}>
          <boxGeometry args={[0.12 + marker * 0.035, 0.025, 0.04]} />
          <meshBasicMaterial color={marker === index % 3 ? ORANGE : OLIVE} />
        </mesh>
      ))}
    </group>
  );
}

function EvidenceSkeleton() {
  return (
    <group>
      <mesh><boxGeometry args={[2.92, 1.86, 0.14]} /><Material /></mesh>
      <mesh position={[0, 0, 0.08]}><planeGeometry args={[2.7, 1.64]} /><meshBasicMaterial color="#191914" /></mesh>
      {[-0.48, -0.18, 0.12, 0.42].map((y, index) => (
        <mesh key={y} position={[-0.38 + (index % 2) * 0.12, y, 0.1]}>
          <boxGeometry args={[1.34 - index * 0.16, 0.035, 0.02]} /><meshBasicMaterial color={index === 0 ? ORANGE : OLIVE} />
        </mesh>
      ))}
    </group>
  );
}

function Cartridge({ index, groupRef }: { index: number; groupRef: (node: Group | null) => void }) {
  const Module = modules[index];
  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow><boxGeometry args={[1.25, 0.62, 0.14]} /><Material /></mesh>
      <mesh position={[0, 0, 0.08]}><boxGeometry args={[1.08, 0.49, 0.025]} /><meshStandardMaterial color={DARK} roughness={0.7} metalness={0.18} /></mesh>
      <mesh position={[-0.56, 0, 0.16]}><boxGeometry args={[0.045, 0.46, 0.05]} /><meshBasicMaterial color={index === 0 ? ORANGE : OLIVE} /></mesh>
      <Module />
      {[0, 1, 2, 3].map((pin) => <mesh key={pin} position={[0.46 + pin * 0.06, -0.25, 0.13]}><boxGeometry args={[0.025, 0.09, 0.025]} /><meshStandardMaterial color="#bd7046" metalness={0.9} roughness={0.25} /></mesh>)}
    </group>
  );
}

function Workbench({ progress }: { progress: ScrollSignal }) {
  const root = useRef<Group>(null);
  const repo = useRef<Mesh>(null);
  const evidence = useRef<Group>(null);
  const evidencePanels = useRef<Group[]>([]);
  const cartridges = useRef<Group[]>([]);
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useFrame((state, delta) => {
    if (!root.current) return;
    const value = reducedMotion ? 0.17 : progress.get();
    const chapter = Math.min(8, Math.floor(value * 9));
    const active = chapter >= 2 && chapter <= 7 ? chapter - 2 : -1;
    const spawned = chapter > 0 && chapter < 8;
    const elapsed = state.clock.getElapsedTime();

    root.current.rotation.x = MathUtils.damp(root.current.rotation.x, -0.16 + state.pointer.y * 0.04, 3, delta);
    root.current.rotation.y = MathUtils.damp(root.current.rotation.y, -0.26 + state.pointer.x * 0.09 + (reducedMotion ? 0 : Math.sin(elapsed * 0.18) * 0.025), 3, delta);
    root.current.position.y = MathUtils.damp(root.current.position.y, chapter >= 2 && chapter <= 7 ? 0.12 : 0, 3, delta);
    if (repo.current) repo.current.rotation.z += reducedMotion ? 0 : delta * 0.035;

    if (evidence.current) {
      evidence.current.visible = active >= 0;
      if (active >= 0) {
        const openSide = active % 2 === 0 ? 1 : -1;
        const sideOffset = evidenceScreens[active].portrait ? 1.32 : 0.78;
        evidence.current.position.x = MathUtils.damp(evidence.current.position.x, openSide * sideOffset, 4.2, delta);
        evidence.current.position.y = MathUtils.damp(evidence.current.position.y, 0.15, 4.2, delta);
        evidence.current.position.z = MathUtils.damp(evidence.current.position.z, 1.72, 4.2, delta);
        evidence.current.rotation.y = MathUtils.damp(evidence.current.rotation.y, openSide * -0.055, 4, delta);
        evidence.current.rotation.z = MathUtils.damp(evidence.current.rotation.z, openSide * -0.025, 4, delta);
        const baseScale = evidenceScreens[active].portrait ? 0.9 : 0.84;
        const evidenceScale = reducedMotion ? baseScale : baseScale + Math.sin(elapsed * 0.48) * 0.008;
        evidence.current.scale.setScalar(MathUtils.damp(evidence.current.scale.x, evidenceScale, 4, delta));
      }
    }

    evidencePanels.current.forEach((panel, index) => {
      if (panel) panel.visible = index === active;
    });

    cartridges.current.forEach((cartridge, index) => {
      if (!cartridge) return;
      const slot = slots[index];
      const isActive = active === index;
      const openSide = index % 2 === 0 ? 1 : -1;
      const dockOffset = evidenceScreens[index].portrait ? 1.32 : 0.78;
      const targetX = isActive ? openSide * dockOffset : spawned ? slot[0] : (index % 2 ? 0.08 : -0.08);
      const targetY = isActive ? -1.14 : spawned ? slot[1] : (index - 2.5) * 0.035;
      const targetZ = isActive ? 1.48 : spawned ? 0.24 : index * 0.045;
      cartridge.position.x = MathUtils.damp(cartridge.position.x, targetX, 4.5, delta);
      cartridge.position.y = MathUtils.damp(cartridge.position.y, targetY, 4.5, delta);
      cartridge.position.z = MathUtils.damp(cartridge.position.z, targetZ, 4.5, delta);
      const scale = isActive ? 0.68 : spawned ? 0.92 : 0.84;
      cartridge.scale.setScalar(MathUtils.damp(cartridge.scale.x, scale, 4, delta));
      cartridge.rotation.z = MathUtils.damp(cartridge.rotation.z, isActive ? openSide * -0.03 : 0, 4, delta);
    });

    state.camera.position.x = MathUtils.damp(state.camera.position.x, chapter >= 2 && chapter <= 7 ? 0.15 : 0, 2.5, delta);
    state.camera.position.y = MathUtils.damp(state.camera.position.y, 0.15, 2.5, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={root}>
      <mesh position={[0, 0, -0.32]} castShadow receiveShadow><boxGeometry args={[4.8, 2.75, 0.22]} /><meshStandardMaterial color="#191914" roughness={0.55} metalness={0.68} /></mesh>
      <mesh position={[0, 0, -0.19]}><boxGeometry args={[4.45, 2.42, 0.035]} /><meshStandardMaterial color="#0e0e0c" roughness={0.78} metalness={0.22} /></mesh>
      {[-0.82, 0, 0.82].map((y) => <mesh key={y} position={[0, y, -0.12]}><boxGeometry args={[4.05, 0.055, 0.055]} /><Material olive /></mesh>)}
      <mesh ref={repo} position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 4]} castShadow><boxGeometry args={[0.86, 0.86, 0.24]} /><Material active /></mesh>
      <mesh position={[0, 0, 0.12]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.48, 0.48, 0.05]} /><meshBasicMaterial color={DARK} /></mesh>
      <mesh position={[0, 0, 0.17]}><boxGeometry args={[0.28, 0.045, 0.025]} /><meshBasicMaterial color={BONE} /></mesh>
      {slots.map((_, index) => <Cartridge key={index} index={index} groupRef={(node) => { if (node) cartridges.current[index] = node; }} />)}
      <group ref={evidence} visible={false} position={[0, 0, 1.72]}>
        <Suspense fallback={<EvidenceSkeleton />}>
          {evidenceScreens.map((screen, index) => (
            <EvidenceScreen
              key={screen.src}
              index={index}
              groupRef={(node) => { if (node) evidencePanels.current[index] = node; }}
            />
          ))}
        </Suspense>
      </group>
      {[-2.25, 2.25].flatMap((x) => [-1.22, 1.22].map((y) => <mesh key={`${x}-${y}`} position={[x, y, -0.12]}><cylinderGeometry args={[0.07, 0.07, 0.08, 12]} /><meshStandardMaterial color="#777365" metalness={0.9} roughness={0.2} /></mesh>))}
    </group>
  );
}

export function AgentWorkbench({ progress }: { progress: ScrollSignal }) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0.15, 7.5], fov: 38 }}
      dpr={[1, 1.5]}
      fallback={<MachinePoster />}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows="basic"
    >
      <color attach="background" args={[new Color("#10100e")]} />
      <fog attach="fog" args={["#10100e", 8, 13]} />
      <ambientLight intensity={1.05} color="#d9d2c4" />
      <directionalLight position={[4, 6, 6]} intensity={3.5} color="#f4ead8" castShadow />
      <pointLight position={[-4, -2, 4]} intensity={30} distance={8} color={ORANGE} />
      <pointLight position={[4, 3, 2]} intensity={14} distance={7} color={OLIVE} />
      <Workbench progress={progress} />
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.22} enableDamping dampingFactor={0.09} />
    </Canvas>
  );
}

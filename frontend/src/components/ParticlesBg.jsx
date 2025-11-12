import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBg() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 z-0 pointer-events-none"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 180 },
          color: { value: ["#dc2626", "#f97316"] },
          size: { value: { min: 1, max: 4 } },
          move: { enable: true, speed: 1 },
          opacity: { value: 0.5 },
        },
      }}
    />
  );
}

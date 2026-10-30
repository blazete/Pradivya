# Rerun hero reproduction

Source: https://rerun.io/ (captured 2026-10-29).

The interactive scene in src/components/rerunScene.js was extracted from the public homepage module `_app/immutable/nodes/6.C_iuLafj.js`. Its geometry, materials, shaders, inverse kinematics, pointer following, drag orbit, idle poses, lighting, and camera framing are retained. Svelte lifecycle bindings were replaced with a React mount/cleanup wrapper. Three.js, RoomEnvironment and RoundedBoxGeometry use local package imports. Optional remote streaming is omitted.

Hero layout/type rules are reproduced from the source HTML and styles; Pradivya text, logo and navigation remain. JetBrains Mono is bundled locally. The page below the hero remains the previous draft. This is a local reference reproduction; public launch remains outside this change.

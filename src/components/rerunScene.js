/* Scene captured from public rerun.io for local visual reproduction. */
import * as o from "three";
import {RoomEnvironment as Xe} from "three/addons/environments/RoomEnvironment.js";
import {RoundedBoxGeometry as ue} from "three/addons/geometries/RoundedBoxGeometry.js";
export function mountRerunScene(b) { let Y=false, Ee=null; const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const me=.2;if(Y||!b)return;const u=new o.Scene,s=new o.PerspectiveCamera(30,1,.1,200);s.position.set(12,7.5,12),s.lookAt(0,4.45,0),u.add(s);const i=new o.WebGLRenderer({alpha:!0,antialias:!0,powerPreference:"high-performance"});i.setClearColor(0,0),i.setPixelRatio(Math.min(window.devicePixelRatio,window.innerWidth<761?1.25:1.5)),i.outputColorSpace=o.SRGBColorSpace,i.toneMapping=o.ACESFilmicToneMapping,i.toneMappingExposure=1.05,i.shadowMap.enabled=!0,i.shadowMap.type=o.PCFSoftShadowMap,b.appendChild(i.domElement),Object.assign(i.domElement.style,{width:"100%",height:"100%",display:"block"});const ve=new o.PMREMGenerator(i),Ae=ve.fromScene(new Xe,.04).texture;u.environment=Ae;const ge=new o.HemisphereLight(16777215,8227481,.08);u.add(ge);const P=new o.DirectionalLight(16775406,.6);P.position.set(6,10,5),P.castShadow=!0,P.shadow.mapSize.set(1024,1024),P.shadow.camera.near=.5,P.shadow.camera.far=30,P.shadow.camera.left=-3.5,P.shadow.camera.right=3.5,P.shadow.camera.top=6,P.shadow.camera.bottom=-1,P.shadow.bias=-2e-4,P.shadow.normalBias=.02,P.shadow.radius=4,u.add(P);const Ce=new o.DirectionalLight(10404095,.55);Ce.position.set(-6,4,-7),u.add(Ce);const Qe=new o.DirectionalLight(16777215,.18);Qe.position.set(2,3,8),u.add(Qe);const Ie={uTime:{value:0},uPulseIntensity:{value:0}},Fe=new o.ShaderMaterial({uniforms:Ie,side:o.DoubleSide,transparent:!0,depthWrite:!1,vertexShader:`
          attribute float aBladeIdx;
          varying vec3 vWorldNormal;
          varying vec3 vLocalPos;
          varying vec2 vUv;
          varying float vBladeIdx;
          void main() {
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            vLocalPos = position;
            vUv = uv;
            vBladeIdx = aBladeIdx;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          precision highp float;
          uniform float uTime;
          uniform float uPulseIntensity;
          varying vec3 vWorldNormal;
          varying vec3 vLocalPos;
          varying vec2 vUv;
          varying float vBladeIdx;

          // Warm to cool rainbow palette — sky-blue, teal, soft yellow,
          // peach, warm red. No purple/magenta zone, matching the brand
          // video. t in [0, 1].
          vec3 rainbow(float t) {
            t = clamp(t, 0.0, 1.0);
            vec3 c0 = vec3(0.40, 0.62, 0.94);
            vec3 c1 = vec3(0.50, 0.85, 0.78);
            vec3 c2 = vec3(0.97, 0.93, 0.55);
            vec3 c3 = vec3(0.99, 0.65, 0.36);
            vec3 c4 = vec3(0.97, 0.36, 0.42);
            float s = t * 4.0;
            if (s < 1.0) return mix(c0, c1, s);
            if (s < 2.0) return mix(c1, c2, s - 1.0);
            if (s < 3.0) return mix(c2, c3, s - 2.0);
            return mix(c3, c4, s - 3.0);
          }

          void main() {
            // Rotating "rainbow light" — a unit vector that spins around
            // the fan over time. Every surface point of every blade is
            // sampled relative to this direction. The base 0.30 rad/sec
            // sweep is modulated by a low-amplitude sine so the rotation
            // breathes — speeding up and slowing down slightly — and the
            // color shifts read as wave-like pulses rather than a
            // perfectly steady spin.
            float lightAngle =
              uTime * 0.30 +
              sin(uTime * 1.3) * 0.10 +
              sin(uTime * 0.55 + 1.7) * 0.06;
            vec3 lightDir = normalize(vec3(
              cos(lightAngle),
              sin(lightAngle * 0.7) * 0.55,
              sin(lightAngle)
            ));

            // The blade's curved surface gives every pixel its own normal.
            // dot(normal, lightDir) projects that normal onto the rotating
            // light: the brightest part of the gradient travels across
            // each blade as the light spins.
            vec3 n = normalize(vWorldNormal);
            float align = dot(n, lightDir);

            // Per-blade phase — adjacent ribbons are kicked along the
            // palette by 0.55 radians, so even when they hold similar
            // normals the colors they carry are different.
            float bladePhase = vBladeIdx * 0.55;

            // Sampling parameter through the palette. sin keeps us
            // strictly inside the warm→cool palette (no purple wrap-
            // around). The 1.6 multiplier on align makes the per-blade
            // gradient cycle through several palette stops as the surface
            // normal sweeps from one edge of the blade to the other.
            float t = 0.5 + 0.5 * sin(align * 1.6 + bladePhase + uTime * 0.55);

            vec3 col = rainbow(t);

            // Lightness dome across each blade — brighter middle, darker
            // edges. Reinforces the curved-ribbon feel beyond hue alone.
            float u = (vUv.y - 0.5) * 2.0;
            float dome = 1.0 - 0.18 * (u * u);
            col *= dome;

            // (Film grain is added in the post-blur pass so the blur
            // doesn't smear it. See the blur shader below.)

            // Forward fade — small ramp at the focal end and a softening
            // at the tips so the cables don't end on a hard edge.
            float tipFadeProgress = smoothstep(0.75, 1.0, vUv.x);
            float lengthFade =
              smoothstep(0.0, 0.06, vUv.x) *
              (1.0 - tipFadeProgress);

            // Saturation compensation. As the tip fades to alpha 0, the
            // rendered color mixes with the white card background and
            // looks washed out. Boost saturation along the same fade
            // ramp so the cable tips read as strongly colored even
            // while losing opacity. Non-faded portions keep their
            // original saturation (boost = 1).
            float satBoost = 1.0 + tipFadeProgress * 10.4;
            float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
            col = clamp(lum + (col - lum) * satBoost, 0.0, 1.0);

            // Energy flowing through each cable. Rather than rendering
            // discrete particles on top of the cable, we modulate the
            // cable's own brightness with a smooth wave that travels
            // from the robot end (vUv.x = 0) outward along its length.
            // Each cable becomes the energy carrier itself — there is
            // no separate "pulse element" being layered over the
            // surface, so nothing fights with the cable's 3D shape or
            // the screen-space DoF blur. A continuous sine is naturally
            // soft, and raising (1+sin)/2 to a power sharpens the
            // peaks into something that reads as "pulses" without
            // ever being a hard-edged particle.
            //
            // Per-blade phase keeps the cables flowing in parallel
            // without locking together. uPulseIntensity (driven by
            // robot motion) scales the wave amplitude so a still arm
            // shows just a faint shimmer and a moving arm pushes
            // bright peaks of light along every cable.
            float flowFreq = 7.0;
            float flowSpeed = 0.55;
            // Golden-angle stride between blade phases. Multiplying
            // an integer by an irrational number gives a sequence
            // that's maximally spread around the unit circle, so no
            // two cables ever share a phase — that's what stops the
            // visible "synchronized flash" moment that happens when
            // several cables peak at the same time.
            float flowPhase = vBladeIdx * 2.39996;
            float flowWave = sin(
              vUv.x * flowFreq - uTime * flowSpeed * flowFreq + flowPhase
            );
            float pulse = pow(0.5 + 0.5 * flowWave, 3.0);

            // Falloff toward the tip — the energy is densest where
            // it leaves the robot and gradually settles along the
            // cable's length.
            float flowFalloff = pow(1.0 - vUv.x, 0.6);

            // Motion-driven amplitude. A small floor keeps a faint
            // baseline shimmer visible even when the arm is still.
            float flowAmp = 0.12 + 0.88 * uPulseIntensity;
            float energy = pulse * flowFalloff * flowAmp;

            // Brighten the cable's existing rainbow color where the
            // wave is at a peak, and push toward white at the
            // brightest crests so the peaks read as energy rather
            // than just color shifts. Nothing is drawn on top —
            // the cable itself glows.
            col *= 1.0 + energy * 0.7;
            col = mix(col, vec3(1.0), clamp(energy * 0.45, 0.0, 1.0));

            gl_FragColor = vec4(col, lengthFade);
          }
        `}),Le=7,oe=8.5,De=1.5,fe=5.5,F=.32,U=.96,Gt=.55,we=new o.Group,Be=100,je=14,mt=e=>{const t=e<=F?0:e>=U?1:(e-F)/(U-F),a=t*t*(3-2*t);return De+(fe-De)*a},zt=e=>{if(e<=F||e>=U)return 0;const t=U-F,a=(e-F)/t;return(fe-De)*6*a*(1-a)/t},Ve=1,po=e=>{if(e<=F)return 0;const t=U-F,a=Math.min(1,(e-F)/t),r=a*a*a-.5*a*a*a*a;let n=oe*Ve*t*r;return e>U&&(n+=(e-U)*oe*Ve),n},Ot=e=>{if(e<=F)return 0;if(e>=U)return oe*Ve;const t=U-F,a=(e-F)/t,r=3*a*a-2*a*a*a;return oe*Ve*r},Ze=[],vt=[],Nt=[],gt=[],Ut=[],Ge=2/Le,Wt=2.5,ze=e=>1+(1-e)*.5*(Wt-1),qt=e=>-1.5*.5;for(let e=0;e<Le;e++){const t=Ze.length/3,a=-1+e*Ge,r=a+Ge,n=a+Ge*.5,_=ze(a),h=ze(r),C=ze(n),T=Math.max(_,h)-C;for(let S=0;S<=Be;S++){const f=S/Be,x=mt(f)/2,N=zt(f)/2,de=po(f),St=Ot(f),qe=x/(fe/2),B=Gt*qe+T*de,Ca=Gt*(N/(fe/2))+T*St;for(let Pt=0;Pt<=je;Pt++){const st=Pt/je,Pe=(st-.5)*2,nt=a+st*Ge,it=ze(nt),Tt=qt(),lt=f*oe*it,Ro=nt*x,Eo=B*(1-Pe*Pe),Ao=de*it+Eo;Ze.push(lt,Ro,Ao);const ct=Ge,kt=oe*it,dt=nt*N,Jt=St*it+Ca*(1-Pe*Pe),ro=f*oe*Tt*ct,so=x*ct,He=de*Tt*ct-4*B*Pe;let I=dt*He-Jt*so,Ke=Jt*ro-kt*He,ee=kt*so-dt*ro;const Rt=Math.sqrt(I*I+Ke*Ke+ee*ee)||1;I/=Rt,Ke/=Rt,ee/=Rt,vt.push(I,Ke,ee),Nt.push(f,st),gt.push(e-(Le-1)/2)}}for(let S=0;S<Be;S++)for(let f=0;f<je;f++){const x=t+S*(je+1)+f,N=x+1,de=x+(je+1),St=de+1;Ut.push(x,N,de,N,St,de)}}const se=new o.BufferGeometry;se.setAttribute("position",new o.Float32BufferAttribute(Ze,3)),se.setAttribute("normal",new o.Float32BufferAttribute(vt,3)),se.setAttribute("uv",new o.Float32BufferAttribute(Nt,2)),se.setAttribute("aBladeIdx",new o.Float32BufferAttribute(gt,1)),se.setIndex(Ut);const ft=new o.Mesh(se,Fe);ft.renderOrder=-1;const Ht=1;ft.layers.set(Ht),we.add(ft),u.add(we);const c=.5,v=()=>{s.updateMatrixWorld(!0);const e=new o.Vector3;s.matrixWorld.extractBasis(e,new o.Vector3,new o.Vector3),e.y=0,e.lengthSq()<1e-6&&e.set(1,0,0),e.normalize();const t=new o.Vector3;s.getWorldDirection(t),t.y=0,t.lengthSq()<1e-6&&t.set(0,0,-1),t.normalize();const a=e.clone().lerp(t,c).normalize(),r=new o.Vector3(0,1,0),n=new o.Vector3().crossVectors(r,a).normalize(),_=new o.Matrix4().makeBasis(a,n,r);we.quaternion.setFromRotationMatrix(_)};we.position.set(0,.2,0),v();const w=new o.WebGLRenderTarget(1,1,{format:o.RGBAFormat,type:o.UnsignedByteType,minFilter:o.LinearFilter,magFilter:o.LinearFilter,depthBuffer:!1,stencilBuffer:!1}),R={uColor:{value:w.texture},uTexSize:{value:new o.Vector2(1,1)},uFocalUV:{value:new o.Vector2(.3,.5)},uMinRadius:{value:0},uMaxRadius:{value:1}},X=new o.ShaderMaterial({uniforms:R,transparent:!0,depthTest:!1,depthWrite:!1,vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,fragmentShader:`
          precision highp float;
          uniform sampler2D uColor;
          uniform vec2 uTexSize;
          uniform vec2 uFocalUV;
          uniform float uMinRadius;
          uniform float uMaxRadius;
          varying vec2 vUv;

          void main() {
            // Blur radius scales with distance from the focal point in
            // screen space — the fan ramps from sharp (at the robot) to
            // soft (at the far end of the streak).
            float d = distance(vUv, uFocalUV);
            float radius = mix(
              uMinRadius,
              uMaxRadius,
              smoothstep(0.05, 0.65, d)
            );

            vec2 texel = 1.0 / uTexSize;
            vec4 sum = vec4(0.0);
            float total = 0.0;
            // 7×7 Gaussian — wide enough at full radius to read as blur,
            // small enough to stay within a single quad pass.
            const int K = 3;
            for (int x = -K; x <= K; x++) {
              for (int y = -K; y <= K; y++) {
                float fx = float(x);
                float fy = float(y);
                float w = exp(-(fx * fx + fy * fy) / 6.0);
                vec2 sUv =
                  vUv + vec2(fx, fy) * texel * radius;
                sum += texture2D(uColor, sUv) * w;
                total += w;
              }
            }
            vec4 colOut = sum / total;

            // Film grain added AFTER the blur so each grain stays a
            // crisp single framebuffer pixel (small) instead of being
            // smeared. Higher amplitude than before for noticeable
            // texture without overwhelming the color.
            float grain = fract(
              sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453
            );
            colOut.rgb += (grain - 0.5) * 0.10 * colOut.a;

            gl_FragColor = colOut;
          }
        `}),W=new o.Scene,Q=new o.Mesh(new o.PlaneGeometry(2,2),X);W.add(Q);const Oe=new o.OrthographicCamera(-1,1,1,-1,0,1),wt=(e,t)=>{const a=i.getPixelRatio(),r=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(t*a));w.setSize(r,n),R.uTexSize.value.set(r,n)},ye=new o.Vector3,Ne=new o.Vector3,be=()=>{ye.setFromMatrixPosition(we.matrixWorld),Ne.copy(ye).project(s),R.uFocalUV.value.set(Ne.x*.5+.5,Ne.y*.5+.5)},L=new o.MeshPhysicalMaterial({color:16777215,roughness:0,metalness:0,clearcoat:31,clearcoatRoughness:0,sheen:0,sheenRoughness:0}),q=new o.MeshPhysicalMaterial({color:1118481,roughness:.145,metalness:0,clearcoat:31,clearcoatRoughness:0,sheen:0}),H=(e,t,a,r,n=48,_=6)=>{const h=[],C=a/2,T=Math.min(r,Math.min(e,t),C);if(h.push(new o.Vector2(0,-C)),T>1e-4){for(let S=0;S<=_;S++){const f=S/_,x=-Math.PI/2+Math.PI/2*f;h.push(new o.Vector2(t-T+T*Math.cos(x),-C+T+T*Math.sin(x)))}for(let S=0;S<=_;S++){const f=S/_,x=Math.PI/2*f;h.push(new o.Vector2(e-T+T*Math.cos(x),C-T+T*Math.sin(x)))}}else h.push(new o.Vector2(t,-C)),h.push(new o.Vector2(e,C));return h.push(new o.Vector2(0,C)),new o.LatheGeometry(h,n)},K=(e,t)=>Math.min(e*.45,t*.45)*me*2,Kt=H(.55,.55,.7,K(.55,.7)),ne=new o.Group,Ha=new o.MeshPhysicalMaterial({color:1118481,roughness:.85,metalness:0,clearcoat:0,envMapIntensity:.25}),Yo=new o.Mesh(H(.95,1.05,.35,K(.95,.35)),Ha);Yo.position.y=.175,ne.add(Yo);const Xo=new o.Mesh(H(.7,.78,.55,K(.7,.55)),L);Xo.position.y=.625,ne.add(Xo);const et=new o.Group;et.position.y=.95,ne.add(et);const uo=new o.Mesh(Kt,L);uo.rotation.x=Math.PI/2,uo.position.y=.05,et.add(uo);const ie=new o.Group;ie.position.y=.45,et.add(ie);const Qo=new o.Mesh(Kt,L);Qo.rotation.z=Math.PI/2,ie.add(Qo);const Zo=new o.Mesh(new o.CapsuleGeometry(.42,1.9,8,16),L);Zo.position.y=1.15,ie.add(Zo);const Ue=new o.Group;Ue.position.y=2.1,ie.add(Ue);const ea=new o.Mesh(H(.45,.45,.6,K(.45,.6)),L);ea.rotation.z=Math.PI/2,Ue.add(ea);const ta=new o.Mesh(new o.CapsuleGeometry(.34,1.55,8,16),L);ta.position.y=.95,Ue.add(ta);const tt=new o.Group;tt.position.y=1.8,Ue.add(tt);const Ka=new o.Mesh(H(.34,.34,.5,K(.34,.5)),q);tt.add(Ka);const ot=new o.Group;ot.position.y=.4,tt.add(ot);const oa=new o.Mesh(H(.3,.3,.42,K(.3,.42)),L);oa.rotation.z=Math.PI/2,ot.add(oa);const z=new o.Group;z.position.y=.32,ot.add(z);const $a=new o.Mesh(H(.28,.32,.18,K(.28,.18)),q);z.add($a);const Ya=Math.min(.34,.42)*.45*me*2,aa=new o.Mesh(new ue(.62,.34,.42,4,Ya),L);aa.position.y=.26,z.add(aa);const Xa=.1*.45*me*2,ra=new ue(.1,.55,.32,3,Xa),sa=.43,na=.275,$t=new o.Group;$t.position.set(-.2,sa,0);const ia=new o.Mesh(ra,q);ia.position.y=na,$t.add(ia),z.add($t);const jt=new o.Group;jt.position.set(.2,sa,0);const la=new o.Mesh(ra,q);la.position.y=na,jt.add(la),z.add(jt),ne.scale.setScalar(.9),u.add(ne);const g=(e,t,a)=>e+(t-e)*a,Qa=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,M=[{j1:.85,hoverJ2:-.4,hoverJ3:-2.05,hoverJ5:.05,graspJ2:-.5,graspJ3:-2.2,graspJ5:.2},{j1:.4,hoverJ2:-.42,hoverJ3:-2.05,hoverJ5:.08,graspJ2:-.52,graspJ3:-2.2,graspJ5:.18},{j1:0,hoverJ2:-.45,hoverJ3:-2,hoverJ5:.05,graspJ2:-.55,graspJ3:-2.15,graspJ5:.15},{j1:-.4,hoverJ2:-.42,hoverJ3:-2.05,hoverJ5:.08,graspJ2:-.52,graspJ3:-2.2,graspJ5:.18},{j1:-.85,hoverJ2:-.4,hoverJ3:-2.05,hoverJ5:.05,graspJ2:-.5,graspJ3:-2.2,graspJ5:.2}],mo=-2,vo=0,Za=()=>{let e=M[Math.floor(Math.random()*M.length)],t=M[Math.floor(Math.random()*M.length)];for(;t===e;)t=M[Math.floor(Math.random()*M.length)];const a=(Math.random()-.5)*1.6,r=-.35+(Math.random()-.5)*.15,n=.85+Math.random()*.4,_=Math.random()<.35,h=T=>T*n,C=[{j1:e.j1,j2:e.hoverJ2,j3:e.hoverJ3,j4:0,j5:e.hoverJ5,j6:0,grip:1,dwell:h(.18),ease:h(.55)},{j1:e.j1,j2:e.graspJ2,j3:e.graspJ3,j4:0,j5:e.graspJ5,j6:0,grip:1,dwell:h(.08),ease:h(.35)},{j1:e.j1,j2:e.graspJ2,j3:e.graspJ3,j4:0,j5:e.graspJ5,j6:0,grip:0,dwell:h(.18),ease:h(.18)},{j1:e.j1,j2:r,j3:mo,j4:0,j5:vo,j6:a*.3,grip:0,dwell:h(.05),ease:h(.45)},{j1:t.j1,j2:r,j3:mo,j4:0,j5:vo,j6:a,grip:0,dwell:h(.1),ease:h(.7)}];return _&&C.push({j1:t.j1,j2:r-.05,j3:mo+.6,j4:0,j5:vo-.3,j6:a+.6,grip:0,dwell:h(.6),ease:h(.6)}),C.push({j1:t.j1,j2:t.graspJ2,j3:t.graspJ3,j4:0,j5:t.graspJ5,j6:a,grip:0,dwell:h(.1),ease:h(.4)},{j1:t.j1,j2:t.graspJ2,j3:t.graspJ3,j4:0,j5:t.graspJ5,j6:a,grip:1,dwell:h(.18),ease:h(.18)},{j1:t.j1,j2:t.hoverJ2,j3:t.hoverJ3,j4:0,j5:t.hoverJ5,j6:a*.3,grip:1,dwell:h(.2),ease:h(.45)}),C},er=()=>{const e=()=>M[Math.floor(Math.random()*M.length)];return[e(),e(),e()].map(a=>({j1:a.j1,j2:a.hoverJ2,j3:a.hoverJ3,j4:0,j5:a.hoverJ5,j6:(Math.random()-.5)*.6,grip:1,dwell:.45,ease:.7}))},tr=()=>{let e=M[Math.floor(Math.random()*M.length)],t=M[Math.floor(Math.random()*M.length)];for(;t===e;)t=M[Math.floor(Math.random()*M.length)];const a=.85+Math.random()*.4,r=n=>n*a;return[{j1:e.j1,j2:e.hoverJ2,j3:e.hoverJ3,j4:0,j5:e.hoverJ5,j6:0,grip:1,dwell:r(.18),ease:r(.55)},{j1:e.j1,j2:e.graspJ2,j3:e.graspJ3,j4:0,j5:e.graspJ5,j6:0,grip:1,dwell:r(.08),ease:r(.35)},{j1:e.j1,j2:e.graspJ2,j3:e.graspJ3,j4:0,j5:e.graspJ5,j6:0,grip:0,dwell:r(.18),ease:r(.18)},{j1:t.j1,j2:t.graspJ2,j3:t.graspJ3,j4:0,j5:t.graspJ5,j6:0,grip:0,dwell:r(.15),ease:r(.85)},{j1:t.j1,j2:t.graspJ2,j3:t.graspJ3,j4:0,j5:t.graspJ5,j6:0,grip:1,dwell:r(.18),ease:r(.18)},{j1:t.j1,j2:t.hoverJ2,j3:t.hoverJ3,j4:0,j5:t.hoverJ5,j6:0,grip:1,dwell:r(.2),ease:r(.45)}]},or=()=>{const e=M[Math.floor(Math.random()*M.length)],t=.85+Math.random()*.4,a=(Math.random()<.5?-1:1)*(.7+Math.random()*.5),r=-a*(.7+Math.random()*.4),n=_=>_*t;return[{j1:e.j1,j2:e.hoverJ2,j3:e.hoverJ3,j4:0,j5:e.hoverJ5,j6:0,grip:1,dwell:n(.15),ease:n(.5)},{j1:e.j1,j2:e.graspJ2,j3:e.graspJ3,j4:0,j5:e.graspJ5,j6:0,grip:1,dwell:n(.08),ease:n(.3)},{j1:e.j1,j2:e.graspJ2,j3:e.graspJ3,j4:0,j5:e.graspJ5,j6:0,grip:0,dwell:n(.15),ease:n(.18)},{j1:e.j1*.35,j2:-.35,j3:-1.7,j4:0,j5:.55,j6:0,grip:0,dwell:n(.3),ease:n(.65)},{j1:e.j1*.35,j2:-.35,j3:-1.7,j4:0,j5:.5,j6:a,grip:0,dwell:n(.4),ease:n(.55)},{j1:e.j1*.35,j2:-.35,j3:-1.65,j4:.25,j5:.35,j6:r,grip:0,dwell:n(.4),ease:n(.55)},{j1:e.j1,j2:e.graspJ2,j3:e.graspJ3,j4:0,j5:e.graspJ5,j6:0,grip:0,dwell:n(.1),ease:n(.5)},{j1:e.j1,j2:e.graspJ2,j3:e.graspJ3,j4:0,j5:e.graspJ5,j6:0,grip:1,dwell:n(.18),ease:n(.18)},{j1:e.j1,j2:e.hoverJ2,j3:e.hoverJ3,j4:0,j5:e.hoverJ5,j6:0,grip:1,dwell:n(.2),ease:n(.4)}]},ar=()=>{const e=M[Math.floor(Math.random()*M.length)],t=.85+Math.random()*.4,a=r=>r*t;return[{j1:e.j1,j2:e.hoverJ2,j3:e.hoverJ3,j4:0,j5:e.hoverJ5,j6:0,grip:.5,dwell:a(.1),ease:a(.5)},{j1:e.j1,j2:e.graspJ2,j3:e.graspJ3,j4:0,j5:e.graspJ5+.1,j6:0,grip:.3,dwell:a(.18),ease:a(.35)},{j1:e.j1,j2:e.graspJ2-.05,j3:e.graspJ3-.08,j4:0,j5:e.graspJ5+.05,j6:0,grip:.3,dwell:a(.08),ease:a(.15)},{j1:e.j1,j2:e.hoverJ2,j3:e.hoverJ3,j4:0,j5:e.hoverJ5,j6:0,grip:.5,dwell:a(.18),ease:a(.4)}]};let at=null;const ca=()=>{const e=Math.random();return e<.4?(at="pick_place",Za()):e<.65?(at="drag",tr()):e<.85?(at="examine",or()):e<.95?(at="poke",ar()):(at="survey",er())};let yt=ca(),rt=0,le=yt.shift(),j=yt.shift()??le;const rr=-.35,sr=.55;let da=.5;const ha=e=>{et.rotation.y=e.j1,ie.rotation.x=e.j2,Ue.rotation.x=e.j3,tt.rotation.y=e.j4,ot.rotation.x=e.j5,z.rotation.y=e.j6;const t=g(rr,sr,e.grip);jt.rotation.z=-t,$t.rotation.z=t,da=e.grip},xe={j1:0,j2:-.3,j3:-1,j4:0,j5:.15,j6:0,grip:.5};ha(xe);const nr=120,pa=new ResizeObserver(e=>{for(const t of e){const{width:a,height:r}=t.contentRect;if(a<=0||r<=0)continue;i.setSize(a,r,!1);const n=Math.max(1,r-nr);s.setViewOffset(a,n,0,0,a,r),wt(a,r)}});pa.observe(b);let ua=!0;const ma=new IntersectionObserver(e=>{for(const t of e)ua=t.isIntersecting},{threshold:0});ma.observe(b);let go=0,fo=0,We=0,Me=0,va=0,ga=0,wo=0,jo=0;performance.now();let Yt=1,fa=0;const yo=1;let ce=0,bt=1.2+Math.random()*2.5,Xt=!1,_e=typeof document<"u"&&document.hasFocus()&&document.visibilityState!=="hidden";const wa=()=>{_e=document.visibilityState!=="hidden"},ja=()=>{_e=!1},ya=()=>{_e=document.visibilityState!=="hidden"&&document.hasFocus()};window.addEventListener("focus",wa),window.addEventListener("blur",ja),document.addEventListener("visibilitychange",ya);const ir=1e4;let ba=-1/0,Z=_e?0:1,xa=0,$="free";const xt=new o.Vector3;let Ma=0,bo=null;const lr=performance.now()/1e3,cr=()=>({type:"obs",v:1,t:performance.now()/1e3-lr,joints:{j1:et.rotation.y,j2:ie.rotation.x,j3:Ue.rotation.x,j4:tt.rotation.y,j5:ot.rotation.x,j6:z.rotation.y},gripper:{grip:da,jaw_angle:-jt.rotation.z},cursor:{x:We,y:Me,vx:wo,vy:jo,seen:Xt},controller:{task:at,phase:rt,fake_cursor:$,alert:1-Yt,rest_blend:Z,page_active:_e}}),Qt=document.createElement("canvas");Qt.width=64,Qt.height=64;const E=Qt.getContext("2d");E.fillStyle="black",E.strokeStyle="white",E.lineWidth=4,E.lineJoin="round",E.beginPath(),E.moveTo(10,6),E.lineTo(10,50),E.lineTo(22,40),E.lineTo(32,56),E.lineTo(38,53),E.lineTo(28,37),E.lineTo(42,36),E.closePath(),E.stroke(),E.fill();const Mt=new o.CanvasTexture(Qt);Mt.colorSpace=o.SRGBColorSpace,Mt.minFilter=o.LinearFilter,Mt.magFilter=o.LinearFilter;const _a=new o.PlaneGeometry(.22,.32),Sa=new o.MeshBasicMaterial({map:Mt,transparent:!0,side:o.DoubleSide}),D=new o.Mesh(_a,Sa);D.visible=!1,u.add(D);const Pa=new o.Vector3(0,.95,0),O=new o.Vector3,Ta=e=>{const t=b.getBoundingClientRect();if(t.width<=0||t.height<=0)return;const a=(e.clientX-t.left)/t.width*2-1,r=(e.clientY-t.top)/t.height*2-1,n=Math.max(-1.5,Math.min(1.5,a)),_=Math.max(-1.5,Math.min(1.5,r));(Math.abs(n-go)>.005||Math.abs(_-fo)>.005)&&performance.now(),go=n,fo=_,Xt=!0};window.addEventListener("pointermove",Ta);const _t=new o.Vector3(0,4.7,0),Zt=s.position.clone().sub(_t),eo=Zt.length();let xo=Math.atan2(Zt.x,Zt.z),to=Math.asin(Zt.y/eo);const dr=-1,hr=1.35,ka=.0055,pr=()=>{const e=Math.cos(to);s.position.set(_t.x+eo*e*Math.sin(xo),_t.y+eo*Math.sin(to),_t.z+eo*e*Math.cos(xo)),s.lookAt(_t)};let Mo=!1,_o=0,So=0,oo=null;const A=i.domElement;A.style.cursor="grab",A.style.touchAction="none",A.style.userSelect="none";const Ja=e=>{e.pointerType==="mouse"&&e.button!==0||(Mo=!0,oo=e.pointerId,_o=e.clientX,So=e.clientY,A.setPointerCapture(e.pointerId),A.style.cursor="grabbing")},Ra=e=>{if(!Mo||e.pointerId!==oo)return;const t=e.clientX-_o,a=e.clientY-So;_o=e.clientX,So=e.clientY,xo-=t*ka,to=Math.max(dr,Math.min(hr,to+a*ka)),pr()},ao=e=>{if(e.pointerId===oo){Mo=!1,oo=null;try{A.releasePointerCapture(e.pointerId)}catch{}A.style.cursor="grab"}};A.addEventListener("pointerdown",Ja),A.addEventListener("pointermove",Ra),A.addEventListener("pointerup",ao),A.addEventListener("pointercancel",ao);let Po=0,Ea=performance.now(),Se=null,To=0,ko=0;const Aa=()=>{const e=performance.now(),t=Math.min(.05,(e-Ea)/1e3);if(Ea=e,ua){let a=go,r=fo;$!=="free"&&(O.copy(D.position).project(s),a=Math.max(-1.5,Math.min(1.5,O.x)),r=Math.max(-1.5,Math.min(1.5,-O.y)));const n=1-Math.exp(-t*10);We+=(a-We)*n,Me+=(r-Me)*n;const _=Math.max(t,1/240),h=(We-va)/_,C=(Me-ga)/_;va=We,ga=Me;const T=1-Math.exp(-t*6);wo+=(h-wo)*T,jo+=(C-jo)*T;const S=.9,f=2.1*S,x=(1.8+.4+.32+.7)*S,N=f+x-.1,de=2,qe=new o.Vector3(We,-Me,1).unproject(s).clone().sub(s.position).normalize();ne.updateMatrixWorld(!0);const B=new o.Vector3;ie.getWorldPosition(B);const Pt=-s.position.clone().sub(B).dot(qe),st=s.position.clone().addScaledVector(qe,Pt),Pe=st.distanceTo(B),nt=Pe<=N;O.set(0,0,0).project(s);const it=-O.y,Tt=Me<it,lt=b.getBoundingClientRect(),Ro=Math.max(0,lt.top),Eo=Math.min(window.innerHeight,lt.bottom),Ao=Math.max(0,Eo-Ro),ct=lt.height>0&&Ao/lt.height>.5;let kt=Math.max(0,Math.min(1,(Pe-N)/de));(!Tt||!ct||!Xt||!_e)&&(kt=1),Yt+=(kt-Yt)*(1-Math.exp(-t*1.8));const dt=Yt,Jt=1-dt,ro=e-ba>=ir,so=nt&&Tt&&ct&&Xt&&_e&&ro;ce>0?ce=Math.max(0,ce-t):Jt>.3&&so?(bt-=t*Jt,bt<=0&&(ce=yo,bt=1.2+Math.random()*2.5,ba=e)):bt=Math.min(bt,.6+Math.random()*.8);const He=.22;let I=0;if(ce>0){const J=1-ce/yo;J<He?I=Math.sin(J/He*(Math.PI/2)):I=Math.cos((J-He)/(1-He)*(Math.PI/2))}$==="free"&&xa<.92&&I>=.92&&nt&&(z.updateMatrixWorld(!0),O.copy(Pa).applyMatrix4(z.matrixWorld),D.position.copy(O),O.copy(D.position).multiplyScalar(2).sub(s.position),D.up.set(0,1,0),D.lookAt(O),D.visible=!0,document.body.style.cursor="none",$="carrying"),xa=I,$==="carrying"?(z.updateMatrixWorld(!0),O.copy(Pa).applyMatrix4(z.matrixWorld),D.position.copy(O),ce<=0&&($="falling",xt.set(0,-.5,0))):$==="falling"?(xt.y-=9.8*t,D.position.x+=xt.x*t,D.position.y+=xt.y*t,D.position.z+=xt.z*t,O.copy(D.position).project(s),O.y<-1.25&&(D.visible=!1,$="waitingToRestore",Ma=e+1e3)):$==="waitingToRestore"&&e>=Ma&&(document.body.style.cursor="",$="free"),fa+=t;const Ke=Math.sin(fa*2.5)*dt,ee=e/1e3,Rt=Math.sin(ee*.21+1.3),ur=Math.sin(ee*.55+2.7),mr=Math.sin(ee*.32),Co=1-I*.7,Ia=Rt*.14*Co,Fa=ur*.21*Co,vr=mr*.55*Co,no=We*.85,La=-.3+Ia,Da=-1+Fa,Ba=0-Me*1.2-Ia-Fa+Ke*.05;let Io=no,Va=La,Ga=Da,za=Ba;if(I>.01){const J=s.position.clone().sub(B),V=2*J.dot(qe),Oo=J.lengthSq()-N*N,Et=V*V-4*Oo,G=new o.Vector3;if(Et>0){const Te=(-V-Math.sqrt(Et))/2;if(Te>.5)G.copy(s.position).addScaledVector(qe,Te);else{const lo=(-V+Math.sqrt(Et))/2;G.copy(s.position).addScaledVector(qe,lo)}}else{const Te=st.clone().sub(B).normalize();G.copy(B).addScaledVector(Te,N)}const No=2.5;if(G.y<No){G.y=No;const Te=G.clone().sub(B),lo=Te.length();lo>N&&(Te.multiplyScalar(N/lo),G.copy(B).add(Te),G.y=Math.max(G.y,No))}const _r=G.x-B.x,Sr=G.z-B.z;let Ye=Math.atan2(_r,Sr)-ne.rotation.y;for(;Ye>Math.PI;)Ye-=2*Math.PI;for(;Ye<-Math.PI;)Ye+=2*Math.PI;let ht=Ye+Math.PI;for(;ht>Math.PI;)ht-=2*Math.PI;for(;ht<-Math.PI;)ht+=2*Math.PI;Io=Math.abs(Ye-no)<=Math.abs(ht-no)?Ye:ht;const Oa=ne.rotation.y+Io,Uo=G.sub(B),Pr=Math.cos(Oa),Tr=Math.sin(Oa),Wo=Uo.y,qo=Uo.x*Tr+Uo.z*Pr,At=Math.max(.1,Math.min(f+x-.05,Math.sqrt(Wo*Wo+qo*qo))),kr=(f*f+At*At-x*x)/(2*f*At),Jr=Math.acos(Math.max(-1,Math.min(1,kr))),Rr=(f*f+x*x-At*At)/(2*f*x),Er=Math.acos(Math.max(-1,Math.min(1,Rr)));Va=Math.atan2(qo,Wo)+Jr,Ga=Er-Math.PI,za=Ke*.05}const gr=g(no,Io,I),fr=g(La,Va,I),wr=g(Da,Ga,I),jr=0,yr=g(Ba,za,I),br=vr;let io=0;if(ce>0){const J=1-ce/yo;J<.22?io=Math.sin(J/.22*(Math.PI/2)):J<.92?io=1:io=1-(J-.92)/.08}const xr=.55-io*.55;for(rt+=t;rt>=j.ease+j.dwell;)rt-=j.ease+j.dwell,le=j,yt.length===0&&(yt=ca()),j=yt.shift();let Fo,Lo,Do,Bo,Vo,Go,zo;if(rt<j.ease){const J=rt/j.ease,V=Qa(J);Fo=g(le.j1,j.j1,V),Lo=g(le.j2,j.j2,V),Do=g(le.j3,j.j3,V),Bo=g(le.j4,j.j4,V),Vo=g(le.j5,j.j5,V),Go=g(le.j6,j.j6,V),zo=g(le.grip,j.grip,V)}else Fo=j.j1,Lo=j.j2,Do=j.j3,Bo=j.j4,Vo=j.j5,Go=j.j6,zo=j.grip;const $e=dt,y={j1:g(gr,Fo,$e),j2:g(fr,Lo,$e),j3:g(wr,Do,$e),j4:g(jr,Bo,$e),j5:g(yr,Vo,$e),j6:g(br,Go,$e),grip:g(xr,zo,$e),dwell:0,ease:0};if(Z+=((_e?0:1)-Z)*(1-Math.exp(-t*4)),Z>.001&&(y.j1=g(y.j1,xe.j1,Z),y.j2=g(y.j2,xe.j2,Z),y.j3=g(y.j3,xe.j3,Z),y.j4=g(y.j4,xe.j4,Z),y.j5=g(y.j5,xe.j5,Z),y.j6=g(y.j6,xe.j6,Z),y.grip=g(y.grip,xe.grip,Z)),ha(y),Se){const J=Math.max(t,.004166666666666667),V=(Math.abs(y.j1-Se.j1)+Math.abs(y.j2-Se.j2)+Math.abs(y.j3-Se.j3)+Math.abs(y.j4-Se.j4)+Math.abs(y.j5-Se.j5)+Math.abs(y.j6-Se.j6))/J,Oo=1-Math.exp(-t*4);To+=(V-To)*Oo;const Et=1-Math.exp(-To/4),G=1-Math.exp(-t*3);ko+=(Et-ko)*G}Se=y,ie.rotation.x+=Math.sin(ee*.7)*.01,z.rotation.y+=Math.sin(ee*.9+.4)*.012,ne.rotation.y=Math.atan2(-s.position.x,-s.position.z),Ie.uTime.value=ee,Ie.uPulseIntensity.value=ko,be(),s.layers.set(Ht),i.setRenderTarget(w),i.setClearColor(0,0),i.clear(),i.render(u,s),i.setRenderTarget(null),i.setClearColor(0,0),i.clear(),i.render(W,Oe),s.layers.set(0);const Mr=i.autoClear;i.autoClear=!1,i.render(u,s),i.autoClear=Mr,bo?.tickSend()}if(!reducedMotion)Po=requestAnimationFrame(Aa)};Po=requestAnimationFrame(Aa);Ee=()=>{cancelAnimationFrame(Po),bo?.stop(),pa.disconnect(),ma.disconnect(),A.removeEventListener("pointerdown",Ja),A.removeEventListener("pointermove",Ra),A.removeEventListener("pointerup",ao),A.removeEventListener("pointercancel",ao),window.removeEventListener("pointermove",Ta),window.removeEventListener("focus",wa),window.removeEventListener("blur",ja),document.removeEventListener("visibilitychange",ya),$!=="free"&&(document.body.style.cursor="",$="free"),Mt.dispose(),Sa.dispose(),_a.dispose(),u.traverse(e=>{const t=e;if(t.isMesh){t.geometry?.dispose();const a=t.material;Array.isArray(a)?a.forEach(r=>r.dispose()):a?.dispose()}}),Ae.dispose(),ve.dispose(),w.dispose(),X.dispose(),Q.geometry.dispose(),i.dispose(),i.domElement.parentNode===b&&b.removeChild(i.domElement)}
return () => {Y=true;Ee?.();};
}

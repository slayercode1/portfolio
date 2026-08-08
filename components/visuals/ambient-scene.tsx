'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AmbientSceneProps {
  className?: string
  variant: 'hero' | 'footer'
}

function getCssColor(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  if (!value) return fallback

  const [hue, saturation, lightness] = value.split(/\s+/)
  return `hsl(${hue}, ${saturation}, ${lightness})`
}

export function AmbientScene({ className, variant }: AmbientSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current

    let cancelled = false
    let disposeScene: (() => void) | undefined

    void import('three').then((THREE) => {
      if (cancelled) return

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas,
        powerPreference: 'low-power',
      })
      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
      camera.position.z = variant === 'hero' ? 6.4 : 5.2

      const group = new THREE.Group()
      scene.add(group)

      const mainGeometry = variant === 'hero'
        ? new THREE.TorusKnotGeometry(1.42, 0.34, 112, 14, 2, 3)
        : new THREE.IcosahedronGeometry(1.25, 1)
      const mainMaterial = new THREE.MeshBasicMaterial({
        color: getCssColor('--highlight', '#4f9f75'),
        opacity: variant === 'hero' ? 0.18 : 0.22,
        transparent: true,
        wireframe: true,
      })
      const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial)
      mainMesh.rotation.set(0.42, -0.3, 0.12)
      group.add(mainMesh)

      const shellGeometry = variant === 'hero'
        ? new THREE.IcosahedronGeometry(2.08, 1)
        : new THREE.TorusGeometry(1.72, 0.018, 8, 96)
      const shellMaterial = new THREE.MeshBasicMaterial({
        color: getCssColor('--foreground', '#171717'),
        opacity: variant === 'hero' ? 0.04 : 0.07,
        transparent: true,
        wireframe: true,
      })
      const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial)
      shellMesh.rotation.set(-0.18, 0.22, -0.24)
      group.add(shellMesh)

      const pointCount = variant === 'hero' ? 54 : 24
      const pointPositions = new Float32Array(pointCount * 3)
      for (let index = 0; index < pointCount; index += 1) {
        const angle = index * 2.39996
        const radius = variant === 'hero' ? 2.35 + (index % 5) * 0.13 : 1.85 + (index % 3) * 0.12
        pointPositions[index * 3] = Math.cos(angle) * radius
        pointPositions[index * 3 + 1] = Math.sin(angle) * radius * 0.72
        pointPositions[index * 3 + 2] = Math.sin(index * 1.7) * 0.85
      }

      const pointGeometry = new THREE.BufferGeometry()
      pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3))
      const pointMaterial = new THREE.PointsMaterial({
        color: getCssColor('--highlight', '#4f9f75'),
        opacity: variant === 'hero' ? 0.3 : 0.36,
        size: variant === 'hero' ? 0.035 : 0.04,
        sizeAttenuation: true,
        transparent: true,
      })
      const points = new THREE.Points(pointGeometry, pointMaterial)
      group.add(points)

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
      let isVisible = false

      function resize() {
        const width = Math.max(container.clientWidth, 1)
        const height = Math.max(container.clientHeight, 1)
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.render(scene, camera)
      }

      function render(time: number) {
        const seconds = time * 0.001
        mainMesh.rotation.y = seconds * (variant === 'hero' ? 0.16 : 0.12)
        mainMesh.rotation.x = 0.42 + Math.sin(seconds * 0.35) * 0.08
        shellMesh.rotation.z = -seconds * 0.035
        points.rotation.y = seconds * 0.045
        renderer.render(scene, camera)
      }

      function updateAnimation() {
        const shouldAnimate = isVisible && !document.hidden && !reducedMotion.matches
        renderer.setAnimationLoop(shouldAnimate ? render : null)
        if (!shouldAnimate) renderer.render(scene, camera)
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting
          updateAnimation()
        },
        { rootMargin: '120px' }
      )
      visibilityObserver.observe(container)

      const themeObserver = new MutationObserver(() => {
        mainMaterial.color.set(getCssColor('--highlight', '#4f9f75'))
        shellMaterial.color.set(getCssColor('--foreground', '#171717'))
        pointMaterial.color.set(getCssColor('--highlight', '#4f9f75'))
        renderer.render(scene, camera)
      })
      themeObserver.observe(document.documentElement, { attributeFilter: ['class'], attributes: true })

      document.addEventListener('visibilitychange', updateAnimation)
      reducedMotion.addEventListener('change', updateAnimation)
      resize()

      disposeScene = () => {
        renderer.setAnimationLoop(null)
        document.removeEventListener('visibilitychange', updateAnimation)
        reducedMotion.removeEventListener('change', updateAnimation)
        resizeObserver.disconnect()
        visibilityObserver.disconnect()
        themeObserver.disconnect()
        mainGeometry.dispose()
        mainMaterial.dispose()
        shellGeometry.dispose()
        shellMaterial.dispose()
        pointGeometry.dispose()
        pointMaterial.dispose()
        renderer.dispose()
        renderer.forceContextLoss()
      }
    }).catch(() => undefined)

    return () => {
      cancelled = true
      disposeScene?.()
    }
  }, [variant])

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none select-none', className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

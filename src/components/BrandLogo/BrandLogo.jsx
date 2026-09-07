import './BrandLogo.css'

function BrandLogo({
  name,
  size = 30,
  className = '',
}) {
  const logoDevKey = import.meta.env.VITE_LOGO_DEV_KEY

  if (!name || !logoDevKey) return null

  const logoUrl = new URL(
    `https://img.logo.dev/name/${encodeURIComponent(name)}`
  )

  logoUrl.searchParams.set('token', logoDevKey)
  logoUrl.searchParams.set('size', size * 2)
  logoUrl.searchParams.set('format', 'png')
  logoUrl.searchParams.set('retina', 'true')
  logoUrl.searchParams.set('fallback', 'monogram')

  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={logoUrl.toString()}
      alt={`Logo ${name}`}
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="origin"
    />
  )
}

export default BrandLogo
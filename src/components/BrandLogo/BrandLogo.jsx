import './BrandLogo.css'

function BrandLogo({
  name,
  size = 30,
  className = '',
}) {
  const logoDevKey = import.meta.env.VITE_LOGO_DEV_KEY

  if (!name || !logoDevKey) {
    return null
  }

  const encodedName = encodeURIComponent(name)

  const logoUrl =
    `https://img.logo.dev/name/${encodedName}` +
    `?token=${logoDevKey}` +
    `&size=${size * 2}` +
    `&format=png` +
    `&retina=true` +
    `&fallback=monogram`

  return (
    <img
      className={`brand-logo ${className}`}
      src={logoUrl}
      alt={`Logo ${name}`}
      width={size}
      height={size}
      loading="lazy"
      referrerPolicy="origin"
    />
  )
}

export default BrandLogo
export function BackgroundPattern() {
  return (
    <div className='pointer-events-none absolute inset-x-0 top-20' aria-hidden='true'>
      {Array.from({ length: 2 }).map((_, i) => (
        <img
          key={i}
          src='/assets/bg-artwork.png'
          alt=''
          className='w-full'
          style={{
            transform: i % 2 === 1 ? 'rotate(180deg)' : undefined
          }}
        />
      ))}
    </div>
  )
}

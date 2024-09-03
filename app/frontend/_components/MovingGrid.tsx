export default function MovingGrid({
  angle = 20,
  className,
}: {
  angle?: number;
  className?: string;
}) {
  return (
    <div
      className={`
          pointer-events-none absolute size-full overflow-hidden opacity-50 [perspective:200px]
          className,
        `}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      <div className="absolute inset-0 -top-40 [transform:rotateY(var(--grid-angle))]">
        <div
          className={`
              grid1
  
              [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
  
             
              [background-image:linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_0)]
  
              dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]
            `}
        />
      </div>
    </div>
  );
}

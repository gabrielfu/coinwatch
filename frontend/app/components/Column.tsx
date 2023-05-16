const Column = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return ( 
    <div className="flex flex-col" style={{justifyContent: "flex-start"}}>
      {children}
    </div>
   );
}

export const AutoColumn = ({
  children,
  gap,
  justify,
  margin,
}: {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg' | string;
  justify?: 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'space-between';
  margin?: '0' | string;
}) => {
  return ( 
    <div
      className="grid"
      style={{
        gridAutoRows: 'auto',
        gridRowGap: (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap,
        justifyItems: justify && justify,
        margin: margin,
      }}
    >
      {children}
    </div>
   );
}
 
export default Column;
import React, { MouseEventHandler, SetStateAction } from 'react';


export const PageArrow = ({ disabled, left, onClick }: {disabled?: boolean, left: boolean, onClick?: (() => void) | null}) => {
  return (
    <div 
      className={"pt-0 pb-0 pl-5 pr-5 select-none " + (onClick ? "hover:cursor-pointer " : "") + (disabled ? "opacity-40" : "opacity-100")} 
      onClick={onClick as MouseEventHandler}>
      {left ? "◀" : "▶"}
    </div>
  )
}

export const LastRow = (props: React.PropsWithChildren) => {
  return (
    <div className="text-text w-full flex justify-center items-center content-center mt-1 mb-2">
      {props.children}
    </div>
  )
}

export const PageButtons = ({ page, setPage, maxPage }: { page: number, setPage: (value: SetStateAction<number>) => void, maxPage: number }) => {
  return (
    <LastRow>
      <PageArrow left={true} disabled={page == 1} onClick={page == 1 ? null : (() => setPage((p: number) => p - 1))} />
      {`Page ${page} / ${maxPage}`}
      <PageArrow left={false} disabled={page == maxPage} onClick={page == maxPage ? null : (() => setPage((p: number) => p + 1))} />
    </LastRow>
  )
}

export const Break = () => {
  return ( 
    <div className="h-px w-full bg-shadow" />
   );
}

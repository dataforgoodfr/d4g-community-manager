import React from 'react'

type MainProps = {
  title: string
}

export default function Main({ title, children }: React.PropsWithChildren<MainProps>) {
  return (
    <main className="p-6 m-2 md:mx-20 md:my-4">
      <h1 className="text-5xl text-color-(--primary) font-bold mb-4">{title}</h1>
      {children}
    </main>
  )
}

export default async function Layout({title="", children, className=""}) {
  return <>
    <div className={`relative h-screen max-w-3xl m-auto pt-24 px-4 ${className}`}>
      <div className="w-full h-full">
        <div className="text-xl font-semibold absolute py-5 top-0 w-full border-b">{title}</div>
        {children}
      </div>
    </div>
  </>
}
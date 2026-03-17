export default function InputField({
  title="", action=undefined, actionTitle="", children
}) {
  return <>
    <div className="pt-3 relative w-full flex items-center gap-2">
      <div className="ml-3 px-1 absolute top-0 bg-white">{title}</div>
      {children}
      {
        !!action &&
        <div 
          className="btn" 
          onClick={action}
        >
          {actionTitle}
        </div>
      }
    </div>
  </>
}
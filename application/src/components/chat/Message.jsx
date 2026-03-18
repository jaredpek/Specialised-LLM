import Markdown from "react-markdown"

export default function Message({role, message}) {
  const a = ({href, children}) => {
    return <a href={href} target="_blank" className="text-blue-500 underline">{children}</a>;
  }

  return <div className={`w-full flex ${(role == "human") ? "justify-end" : "justify-start"}`}>
    <div className="w-[70%]">
      <div>{(role == "human") ? "user" : "assistant"}:</div>
      <div className={`border rounded-lg py-3 px-4 w-full`}>
        {
          String(typeof message) == 'string' ?
          <Markdown components={{a}} className="prose markdown-body -mb-3">{message}</Markdown> :
          <div>{message}</div>
        }
      </div>
    </div>
  </div>
}
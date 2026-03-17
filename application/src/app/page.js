import ChatBox from "@/components/chat/ChatBox";

export default async function Page() {
  return <>
    <div className={`relative h-screen max-w-5xl m-auto py-6 px-4`}>
      <div className="w-full h-full flex flex-col gap-4">
        <div className="text-xl font-semibold">Chat Assistant</div>
        <hr />
        <ChatBox />
      </div>
    </div>
  </>
}

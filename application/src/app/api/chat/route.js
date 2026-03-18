import { 
  genAIModel, genInstruction, vectorStore,
  // localGenAIModel, localVectorStore,
} from "@/lib/genAI";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { history, message } = await req.json();

    // initialise vector search index retriever
    // const retriever = localVectorStore.asRetriever(4);
    const retriever = vectorStore.asRetriever(5);

    let query = "";
    for (let message of history.slice(-5)) {
      query += message[1]
      query += "\n\n"
    }
    query += message;

    const context = await retriever.invoke(query, {});

    // generate system prompt with instructions and embedded context
    console.log(context);
    const instruction = `
      ${genInstruction}
      Here are the provided contexts:
      ${context.map((chunk, i) => `Context ${i + 1}: ${chunk.pageContent}\n`)}
      `;

    // generate response based on provided messages and chat context
    // const chat = localGenAIModel.invoke([
    const chat = genAIModel.invoke([
      ["system", instruction],
      ...history,
      ["human", message],
    ]);

    const response = (await chat).content;
    console.info(`[${new Date()}] Response generated successfully`);
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error(`[${new Date()}] Error generating response due to: ${error}`);
    return NextResponse.json({
      error: "Error generating response",
      trace: String(error),
    }, { status: 401 },
    );
  }
};

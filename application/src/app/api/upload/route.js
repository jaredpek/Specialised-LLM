import { 
  database, splitter, vectorIndexConfig, vectorStore,
  // localVectorStore, 
} from "@/lib/genAI";
import { NextResponse } from "next/server";
import { TextLoader } from "langchain/document_loaders/fs/text";

export const POST = async (req) => {
  try {
    // initialise profile and split loaded text into chunks
    const data = await req.formData().catch(() => new FormData());
    const file = data.get("file");

    const loader = new TextLoader(file);
    const profile = await loader.load();
    const chunks = await splitter.splitDocuments(profile);
    
    // remove or delete all data from the collection
    (mode == "delete") ?
      await database.dropCollection(process.env.MONGODB_COLLECTION) :
      await database.collection(process.env.MONGODB_COLLECTION).deleteMany();

    // generate vector embeddings on provided documents and save to the collection
    // const result = localVectorStore.addDocuments(await chunks);
    const result = await vectorStore.addDocuments(chunks);

    // update or create vector search index with new chunks
    const { name, definition } = vectorIndexConfig;
    await database.collection(process.env.MONGODB_COLLECTION).updateSearchIndex(name, definition);

    const response = {
      chunks: { data: chunks, count: chunks.length },
      documents: { count: result.length },
    };
    console.info(`[${new Date()}] Vector embedding generated successfully`);
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error(`[${new Date()}] Error generating vector embeddings from profile due to: ${error}`);
    return NextResponse.json({ 
        error: "Error generating vector embeddings from profile",
        trace: String(error),
      }, { status: 401 },
    );
  }
};

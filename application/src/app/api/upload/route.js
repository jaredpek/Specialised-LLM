import {
  database, embedInstruction, fileManager, genAIModel, splitter, uploadGenAIModel, vectorIndexConfig, vectorStore,
  // localVectorStore, 
} from "@/lib/genAI";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // initialise data and split loaded files into chunks
    const data = await req.formData().catch(() => new FormData());
    const files = data.getAll("files") || [];

    const results = files.map(() => ([]));
    for (let index = 0; index < files.length; index ++) {
      const file = files[index];
      const buffer = await file.arrayBuffer();
      const chunks = await splitter.split(buffer, file.name);
      results[index] = chunks.map(() => ({
        pageContent: "", metadata: {},
      }));
      await Promise.all(
        chunks.map(async (chunk, i) => {
          const response = await uploadGenAIModel.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
              { role: "system", text: embedInstruction },
              {
                role: "user",
                inlineData: {
                  mimeType: "application/pdf",
                  data: chunk.pageContent,
                },
              }
            ],
          })
          results[index][i] = {
            pageContent: response.text,
            metadata: chunk.metadata,
          };
          console.info(`[UPLOADED] Chunk [${i}] for ${chunk.metadata.source} generated successfully`);
        })
      )
    }

    const chunks = results.flat()

    // generate vector embeddings on provided documents and save to the collection
    // const result = localVectorStore.addDocuments(await chunks);
    const result = await vectorStore.addDocuments(chunks);
    console.info(`[UPLOADED] Chunks uploaded successfully`);

    // update or create vector search index with new chunks
    const { name, definition } = vectorIndexConfig;
    try {
      await database.collection(process.env.MONGODB_COLLECTION).updateSearchIndex(name, definition);
      console.info(`[VECTOR SEARCH] Index updated successfully`);
    } catch (e) {
      console.info(`[VECTOR SEARCH] Index update failed due to ${e}`);
      await database.collection(process.env.MONGODB_COLLECTION).createSearchIndex(vectorIndexConfig);
      console.info(`[VECTOR SEARCH] Index created successfully`);
    }

    const response = {
      documents: { count: result.length },
    };
    console.info(`[${new Date()}] Vector embedding generated successfully`);
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error(`[${new Date()}] Error generating vector embeddings from files due to: ${error}`);
    return NextResponse.json({ 
        error: "Error generating vector embeddings from files",
        trace: String(error),
      }, { status: 401 },
    );
  }
};

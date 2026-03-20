## Building a Specialised LLM

### Objectives
- Compare fine-tuning a pre-trained model VS RAG
- Since RAG performed better, we build a web application that
    - Allows users to upload custom documents
    - Automate the entire RAG pipeline, from chunking documents, converting them to vector embeddings, building a vector search index, and the subsequent retrieval of semantically relevant chunks

### Directory Structure
- ```data_collection``` stores the data that was collected for our specialised dataset, namely topics from SC3010 Computer Security module
- ```data_preparation``` stores the chunks of data derived from the collected data, with each chunk having an overlap of 2 pages with the previous chunk to preserve context between chunks
- ```data_generation```
    - Stores the synthetic data that was generated for each chunk that would be used for model fine-tuning, and to be ingested to our vector store
    - Stores the notebook that is used to generate the data
- ```model_training``` stores the notebook for fine-tuning the model, and the subsequent results of the training phase to determine the most effective step
- ```model_evaluation``` stores the notebooks and the respective results for fine-tuning VS RAG, with RAG having up to 6x stronger performance
- ```application``` stores the final RAG application that was built following the evaluation and comparison of both methods

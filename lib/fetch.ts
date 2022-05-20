import fetch from "node-fetch";
import { ReturnCollectionType } from "../types/BookCollection";

export const getAllCollections = async () => {
  const response = await fetch(new URL("http://localhost:3001/db"));
  const collectionListData = response.json();
  return collectionListData;
};

export const getAllCollectionIds = async () => {
  const response = await fetch(
    new URL("http://localhost:3001/db")
  )
  const collectionList = await response.json();
  return collectionList.map((collection) => {
    return {
      params: {
        id: String(collection.connectId)
      }
    }
  })
}

export const getCollectionData = async (id: string) => {
  const response = await fetch(
    new URL(`http://localhost:3001/db/${id}`)
  )
  const collection = await response.json()
  return collection
}

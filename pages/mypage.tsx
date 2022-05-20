import axios from "axios";
import useSWR from "swr";

import { ReturnCollectionType } from "../types/BookCollection";

const axiosFetcher = async () => {
  const response = await axios.get<ReturnCollectionType>(`http://localhost:3001/db/1`)
  return response.data
}

const MyPage: React.FC = () => {

  const { data: collection, error } = useSWR("myPageData", axiosFetcher)

  if(error){
    return <span>エラー発生!</span>
  }

  return (
    <>{ collection && collection.author.username}</>
  )
}
export default MyPage;

import { useState } from "react";
import "./styles.css";
import { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card'

const INIT_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'

export default function App() {
  const [nextUrl, setNextUrl] = useState('')
  const [items, setItems] = useState([])
  const [hashMore, setHasMore] = useState(true)

  const nextFetch = async () => {
    try {
      // no next url, end of cards
      if (nextUrl === null) {
        setHasMore(false)
        return {
          results: null, next: null
        }
      }

      const url = nextUrl === '' ? INIT_URL : nextUrl
      const response = await fetch(url)
      const { results, next, count, previous } = await response.json()
      const newItems = items.concat(results.map(data => <Card data={data} key={data.url} />))
      setItems(newItems)
      setNextUrl(next)
      return {
        results, next, count, previous
      }
    } catch (e) {
      return {
        "count": 0,
        "next": INIT_URL,
        "previous": null,
        "results": []
      }
    }
  }

  useEffect(() => {
    (async () => {
      const { results, next } = await nextFetch()
      const newItems = items.concat(results.map(data => <Card data={data} key={data.url} />))
      setItems(newItems)
      setNextUrl(next)
    })()
  }, [])

  const refresh = () => {
    setNextUrl('')
    nextFetch()
  }

  return (
    <div className="App pt-4 pb-4">
      <InfiniteScroll
        dataLength={items.length}
        next={nextFetch}
        hasMore={hashMore}
        loader={<div className="w-full mt-4 mb-4"><div className="flex items-center justify-center">
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div></div>}
        endMessage={
          <div className="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-300  before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">End</div>
        }
        refreshFunction={refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        <div className="flex flex-wrap gap-4 justify-center" >
          {items}
        </div>
      </InfiniteScroll>
    </div>
  );
}

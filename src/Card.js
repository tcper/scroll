import { useState } from "react"
import { useEffect } from "react"

const color = (text, bg) => `inline-flex items-center gap-1 rounded-full ${bg} px-2 py-1 text-xs font-semibold ${text}`

const FEATURE_TYPE = {
  'bug': color('text-fuchsia-600', 'bg-fuchsia-50'),
  'water': color('text-blue-600', 'bg-blue-50'),
  'grass': color('text-green-600', 'bg-green-50'),
  'poison': color('text-yellow-600', 'bg-yellow-50'),
  'fire': color('text-red-600', 'bg-red-50'),
  'flying': color('text-indigo-600', 'bg-indigo-50'),
  'normal': color('text-gray-600', 'bg-gray-50'),
  'electric': color('text-blue-600', 'bg-blue-50'),
  'electric': color('text-blue-600', 'bg-blue-50'),
  'psychic': color('text-blue-600', 'bg-blue-50'),
  'rock': color('text-blue-600', 'bg-blue-50'),
}

const getFeature = type => {
  return FEATURE_TYPE[type] ?? color('text-gray-600', 'bg-gray-50')
}

const NO_DATA = -1

const Card = ({ data }) => {
  const [image, setImage] = useState('')
  const [no, setNo] = useState('')
  const [feature, setFeature] = useState([])
  const [exp, setExp] = useState('')

  useEffect(() => {
    (async () => {
      const { url } = data
      try {
        const response = await fetch(url)
        const info = await response.json()
        // setImage(info?.sprites?.front_default)
        setImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${info?.order}.png`)
        setNo(info?.order)
        setFeature(info?.types)
        setExp(info?.base_experience)
      } catch (e) {
        setNo(NO_DATA)
      }
    })()
  }, [])

  return <div className="w-64">
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
      <div className="bg-slate-100">
        {no === NO_DATA ? <div className="flex items-center justify-center w-full h-64 bg-gray-300 rounded dark:bg-gray-700">
          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div> : <img src={image} className="w-full object-contain" alt="" />}
      </div>

      <div className="p-4">
        <p className="mb-1 text-sm text-gray-500">#{no} • Exp: {exp}</p>
        <h3 className="text-xl font-medium text-gray-900">{data.name}</h3>
        <div className="mt-4 flex gap-2">
          {feature.map((item, index) => {
            return <span key={index} className={getFeature(item.type.name)}> {item?.type?.name} </span>
          })}
        </div>
      </div>
    </div>
  </div>
}

export default Card
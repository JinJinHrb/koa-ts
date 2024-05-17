import fs from 'fs'
import path from 'path'

const GEOJSON_PATH = path.join(__dirname, './files/san-francisco-ca_.geojson.json')

// 读取GeoJSON文件
const geoJsonString = fs.readFileSync(GEOJSON_PATH, 'utf8')
const geoJsonObject = JSON.parse(geoJsonString)

function isPointInMultiPolygon(
  point: number[],
  multiPolygon: { coordinates: number[][][] },
) {
  for (const polygon of multiPolygon.coordinates) {
    if (isPointInPolygon(point, polygon)) {
      return true
    }
  }
  return false
}

function isPointInPolygon(point: number[], polygon: number[][]) {
  let inside = false
  let j = polygon.length - 1
  for (let i = 0; i < polygon.length; j = i++) {
    const xi = polygon[i][0],
      yi = polygon[i][1]
    const xj = polygon[j][0],
      yj = polygon[j][1]
    const intersect =
      yi > point[1] !== yj > point[1] &&
      point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

export const isCoordinatesInPolygon = () => {
  for (const feature of geoJsonObject.features) {
    const name = feature.properties.name
    // 示例点
    // const point = [-122.504089, 37.784909999999996]
    const point = [-122.466457, 37.778805]
    // 假设你的GeoJSON中的MultiPolygon是这样的结构：{ "type": "MultiPolygon", "coordinates": [...] }
    const multiPolygon = feature.geometry
    if (isPointInMultiPolygon(point, multiPolygon)) {
      console.log('getCoordinates #44 点在多边形内 name:', name)
    } else {
      console.log('getCoordinates #46 点在多边形外 name:', name)
    }
  }
}

export const isCoordinatesInPolygon2 = () => {
  const polygon = [
    [-122.446457, 37.775805],
    [-122.454635, 37.774767],
    [-122.454691, 37.774696],
    [-122.454706, 37.774766],
    [-122.465068, 37.773423],
    [-122.46991, 37.77323],
    [-122.477816, 37.77287],
    [-122.478735, 37.786898],
    [-122.478282, 37.786864],
    [-122.475543, 37.78691],
    [-122.465782, 37.787129],
    [-122.465955, 37.788353],
    [-122.4626, 37.789041],
    [-122.462539, 37.786737],
    [-122.45924, 37.786848],
    [-122.45888, 37.781221],
    [-122.455721, 37.781329],
    [-122.452852, 37.781767],
    [-122.450611, 37.782028],
    [-122.448931, 37.782278],
    [-122.447378, 37.782383],
    [-122.447519, 37.782023],
    [-122.447642, 37.781352],
    [-122.447164, 37.779185],
    [-122.446457, 37.775805],
  ] // Inner Richmond
  console.log('isPointInPolygon:', isPointInPolygon([-122.466457, 37.778805], polygon))
}

export const modifyCoordinates = () => {
  for (const feature of geoJsonObject.features) {
    const coordinates = feature.geometry.coordinates
    const name = feature.properties.name
    if (coordinates.length !== 1) {
      console.log('#51 name:', name)
    }
    // 示例点
    // const point = [37.75169104, -122.3943742]
    // 假设你的GeoJSON中的MultiPolygon是这样的结构：{ "type": "MultiPolygon", "coordinates": [...] }
    // const multiPolygon = feature.geometry
    // if (isPointInMultiPolygon(point, multiPolygon)) {
    //   console.log('点在多边形内')
    //   console.log('getCoordinates #54 点在多边形内 name:', name)
    // } else {
    //   console.log('点在多边形外 name:', name)
    // }
    const data = coordinates[0][0][0]
    data[0] -= 0.01
    data[1] -= 0.003
    console.log('getCoordinates #54 name:', name, 'coordinates:', coordinates[0][0][0])
  }
}

function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function distributeElements(numElements: number, numPeople: number) {
  // 创建一个数组，其中包含从1到numElements的数字
  const elements = Array.from({ length: numElements }, (_, i) => i + 1)

  // 使用Fisher-Yates洗牌算法随机化元素数组
  shuffleArray(elements)

  // 创建一个数组来保存每个人的元素
  const people = Array.from({ length: numPeople }, () => []) as unknown as number[][]

  // 将元素依次分配给每个人，直到所有元素都被分配完毕
  let currentIndex = 0
  for (const element of elements) {
    people[currentIndex % numPeople].push(element)
    currentIndex++
  }

  return people
}

function getRandomElementsForPeople(totalElements: number, numPeople: number) {
  // 创建一个数组，包含从1到totalElements的数字，代表所有可分配的元素
  const allElements = Array.from({ length: totalElements }, (_, i) => i + 1)

  // 初始化分配结果数组
  const people = Array.from({ length: numPeople }, () => []) as unknown as number[][]

  // 剩余需要分配的元素数量
  let remainingElements = totalElements

  // 为每个人随机分配元素数量
  for (let i = 0; i < numPeople; i++) {
    // 最后一个人将获取剩余的所有元素
    if (i === numPeople - 1) {
      people[i] = allElements.slice()
      break
    }

    // 为当前人随机分配至少一个元素，但不超过剩余元素的一半（以避免后续人员没有元素可分）
    const numElementsForPerson =
      Math.floor(
        Math.random() *
          Math.min(remainingElements / 2, remainingElements - (numPeople - i - 1)),
      ) + 1

    // 从元素数组中随机选择numElementsForPerson个元素给当前人
    for (let j = 0; j < numElementsForPerson; j++) {
      const randomIndex = Math.floor(Math.random() * allElements.length)
      people[i].push(allElements[randomIndex])
      allElements.splice(randomIndex, 1) // 从数组中移除已分配的元素
    }

    remainingElements -= numElementsForPerson
  }

  return people
}

export const testPointInPolygon1 = () => {
  const areas = [
    'Seacliff',
    'Marina',
    'Pacific Heights',
    'Nob Hill',
    'Presidio Heights',
    'Downtown/Civic Center',
    'Excelsior',
    'Bernal Heights',
    'Western Addition',
    'Chinatown',
    'North Beach',
    'Haight Ashbury',
    'Outer Mission',
    'Crocker Amazon',
    'West of Twin Peaks',
    'South of Market',
    'Potrero Hill',
    'Inner Richmond',
    'Bayview',
    'Noe Valley',
    'Inner Sunset',
    'Diamond Heights',
    'Lakeshore',
    'Russian Hill',
    'Treasure Island/YBI',
    'Twin Peaks',
    'Outer Richmond',
    'Visitacion Valley',
    'Golden Gate Park',
    'Parkside',
    'Financial District',
    'Ocean View',
    'Mission',
    'Presidio',
    'Castro/Upper Market',
    'Outer Sunset',
    'Glen Park',
  ]
  // 使用示例：将630个元素随机分配给37个人
  // const distribution = distributeElements(630, 37)
  // 使用示例：37个人从630个元素中随机且不平均地取元素
  const distribution = getRandomElementsForPeople(630, 37)
  if (distribution.length !== areas.length) {
    console.log('distribution.length !== areas.length')
    return
  }
  const stats: { name: string; value: number }[] = []
  for (let i = 0; i < areas.length; i++) {
    const area = areas[i]
    const dist = distribution[i]
    // stats[area] = dist.length
    stats.push({ name: area, value: dist.length })
  }
  console.log('stats:', stats)
  return stats
}

export function getPolygonCentroid(polygon: number[][]) {
  // 验证输入是否是一个有效的多边形
  if (!Array.isArray(polygon) || polygon.length < 3) {
    throw new Error('Invalid polygon')
  }

  let centroidX = 0
  let centroidY = 0
  let signedArea = 0
  let j = polygon.length - 1 // 最后一个顶点的索引

  for (let i = 0; i < polygon.length; i++) {
    const xi = polygon[i][0]
    const yi = polygon[i][1]
    const xj = polygon[j][0]
    const yj = polygon[j][1]
    const cross = xj * yi - xi * yj
    centroidX += (xi + xj) * cross
    centroidY += (yi + yj) * cross
    signedArea += cross
    j = i // 将j设置为当前顶点，为下一个迭代准备
  }

  // 确保多边形面积不为0，避免除以0的情况
  if (signedArea === 0) {
    throw new Error('Polygon has no area')
  }

  // 计算质心
  centroidX /= 6 * signedArea
  centroidY /= 6 * signedArea

  return [centroidX, centroidY]
}

export const testPointInPolygon = () => {
  isCoordinatesInPolygon2()
}

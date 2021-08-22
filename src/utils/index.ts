import { diffText, textToLink } from "./article"
import { parseTime } from './time'
import { ElMessage } from "element-plus"
import { convert } from './check/index'
import storage from './storage'
import { copyContent, isChracterDraw } from './check'

export function message(
  message: string,
  type: "info" | "success" | "warning"| "error" = "success"
) {
  ElMessage({ message, type, showClose: true })
}

export interface reply {
  rpid: string,
  type_id: 1 | 11 | 12 | 17,
  ctime: number,
  oid: string,
  dynamic_id: string,
  origin_rpid: string,
  similar_count: number,
  similar_like_sum: number,
  like_num: number,
  content: string,
  mid: number,
  m_name: string
}

export interface Article {
  id: string,
  type: 1 | 11 | 12 | 17,
  createTime: string,
  author: {
    id: number,
    name: string
  },
  content: string,
  like: number,
  allLike: number,
  qoute: number,
  originId: string,
  url: string,
  rate? :number
}


/**
 * rename response reply array
 * @param {Object} reply reply Array in check and ranking 
 * @returns {Object} renamed reply Array
 */
function handleRelated(s: reply) :Article {
  return {
    id: s.rpid,
    type: s.type_id,
    createTime: parseTime(s.ctime),
    author: {
      id: s.mid,
      name: s.m_name
    },
    content: s.content,
    like: s.like_num,
    allLike: s.similar_like_sum,
    qoute: s.similar_count,
    originId: s.origin_rpid,
    url: parseURL(s.oid, s.dynamic_id, s.rpid, s.type_id)
  }
}


/**
 * get comment link from oid, rpid, type
 * @param {Number|String} oid 
 * @param {Number|String} rpid 
 * @param {Number} type comment type aviliable: 1, 11, 17, 12
 * @returns {String} a bili comment link
 */
function parseURL(oid:string, dynamic_id:string, rpid:string, type:number) {
  const VIDEO_URL = 'www.bilibili.com/video/av'
  const CV_URL = 'www.bilibili.com/read/cv'
  const DYNAMIC_URL = 't.bilibili.com/'  
  let baseURL = VIDEO_URL + oid
  if (type == 11 || type == 17) {
    baseURL = DYNAMIC_URL + dynamic_id
  }
  if (type == 12) {
    baseURL = CV_URL + oid
  }
  return `https://${baseURL}/#reply${rpid}`
}

export {
  diffText,
  textToLink,
  parseTime,
  parseURL,
  convert,
  handleRelated,
  copyContent,
  isChracterDraw,
  storage
}
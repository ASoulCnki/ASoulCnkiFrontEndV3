// Manaeg some localStorage

const HISTORY_KEY = 'history'
const AGREE_KEY = 'agree'
const NOT_ACTIVE_KEY = 'active'

/**
 * get History storage
 * @returns {Array}
 */
function getHistory() {
  const array = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  // if not exist return []
  return Array.isArray(array) ? array : []
}

/**
 * append new Val to History Array
 * Uesd by check
 * @param {Object} appendVal
 */
function addHistory(appendVal: any) {
  let array = getHistory()
  array.push(appendVal)

  array = [...new Set(array)]
  localStorage.setItem(HISTORY_KEY, JSON.stringify(array))
}

/**
 * Clear old History Storage
 */
function clearHistoty() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify([]))
}

// export history module
const history = {
  get: getHistory,
  add: addHistory,
  clear: clearHistoty,
}

function getAgree() {
  const agree = localStorage.getItem(AGREE_KEY)
  if (!agree) {
    setAgree()
  }
  return !!agree
}

function setAgree(newVal = false) {
  localStorage.setItem(AGREE_KEY, JSON.stringify(newVal))
}

const agree = {
  get: getAgree,
  set: setAgree,
}

function getActive() {
  const active = localStorage.getItem(NOT_ACTIVE_KEY)
  if (!active) {
    setActive()
    return true
  }
  return !active
}

function setActive(newVal = true) {
  localStorage.setItem(NOT_ACTIVE_KEY, JSON.stringify(newVal))
}

const active = {
  get: getActive,
  set: setActive,
}

export default {
  history,
  agree,
  active,
}

import axios from 'axios'

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN

const github = axios.create({
  baseURL: GITHUB_API_URL,
  headers: { Authorization: `token ${GITHUB_API_TOKEN}` }
})

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`)
  ])

  return { user: user.data, repos: repos.data }
}

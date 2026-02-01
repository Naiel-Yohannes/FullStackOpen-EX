const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  const sum = blogPosts.reduce((acc, val) => {return acc + val.likes}, 0)
  return sum
}

module.exports = {
  dummy,
  totalLikes
}
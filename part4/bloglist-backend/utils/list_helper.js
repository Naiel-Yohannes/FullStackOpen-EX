const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  const sum = blogPosts.reduce((acc, val) => {return acc + val.likes}, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  let largest = 0;
  blogs.map(b => {
    if(b.likes > largest){
      largest = b.likes
    }
  })
  const largestObj = blogs.filter(b => b.likes === largest)
  return largestObj
}

console.log(favoriteBlog([{na: "n", likes: 2}, {na: "g", likes: 4}]));


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}